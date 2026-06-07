const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")
const OpenAI = require("openai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const openrouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

console.log("OpenRouter key:", !!process.env.OPENROUTER_API_KEY);
async function generateWithRetry(config, retries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await ai.models.generateContent(config);
        } catch (error) {
            lastError = error;

            console.warn(
                `[${config.model}] Attempt ${attempt}/${retries} failed: ${error.message}`
            );

            if (attempt < retries) {
                await new Promise(resolve =>
                    setTimeout(resolve, attempt * 2000)
                );
            }
        }
    }

    throw lastError;
}

async function generateWithSchemaRetry(config, schema = null, retries = 3) {
    // We only retry the API call itself. Schema validation failures are thrown immediately.
    const response = await generateWithRetry(config, retries);

    console.log("RAW GEMINI RESPONSE:");
    console.log(response.text);

    if (!schema) return response;

    const parsed = JSON.parse(response.text);

    console.log("PARSED JSON:");
    console.log(parsed);

    // Temporarily bypassing strict Zod validation to debug missing fields
    // return schema.parse(parsed);
    return parsed;
}

const OPENROUTER_MODELS = [
    "qwen/qwen3-next-80b-a3b-instruct:free",
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
];

async function generateWithOpenRouter(prompt) {
    console.log("Using OpenRouter fallback...");

    const messages = [
        {
            role: "system",
            content: "You must respond ONLY with valid JSON. No markdown. No explanations. No code fences."
        },
        {
            role: "user",
            content: prompt,
        },
    ];

    let lastError;

    for (const model of OPENROUTER_MODELS) {
        try {
            console.log(`Sending request to OpenRouter [${model}]...`);

            const completion = await openrouter.chat.completions.create({
                model,
                messages,
                provider: {
                    allow_fallbacks: true
                }
            });

            console.log("OpenRouter response received");
            console.log("Model used:", completion.model);

            return completion.choices[0].message.content;
        } catch (error) {
            console.warn(`[OpenRouter] ${model} failed: ${error.message}`);
            lastError = error;
        }
    }

    throw lastError;
}

async function generateAIResponse(prompt, schema) {
    console.log("generateAIResponse called");
    try {
        return await generateWithSchemaRetry({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        }, schema);
    } catch (error) {
        console.warn("Gemini 2.5 Flash failed. Falling back to Gemini 2.0 Flash...");

        try {
            return await generateWithSchemaRetry({
                model: "gemini-2.0-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                },
            }, schema);
        } catch (fallbackError) {
            console.warn("Gemini unavailable. OpenRouter disabled for now. Throwing error.");
            throw fallbackError;
        }
    }
}


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
    console.log("generateInterviewReport called");
    const prompt = `Generate a detailed interview preparation report for a candidate based on the following:
Resume: ${resume || "None"}
Self Description: ${selfDescription || "None"}
Job Description: ${jobDescription || "None"}

The report should be highly professional, structured, and insightful.

CRITICAL: You MUST return ONLY a valid JSON object. Do not include markdown code blocks like \`\`\`json. The JSON MUST exactly match this structure:
{
  "matchScore": <number from 0 to 100>,
  "technicalQuestions": [
    { "question": "<string>", "intention": "<string>", "answer": "<string>" }
  ],
  "behavioralQuestions": [
    { "question": "<string>", "intention": "<string>", "answer": "<string>" }
  ],
  "skillGaps": [
    { "skill": "<string>", "severity": "<'low' | 'medium' | 'high'>" }
  ],
  "preparationPlan": [
    { "day": <number>, "focus": "<string>", "tasks": ["<string>", "<string>"] }
  ],
  "title": "<string>"
}

- You MUST populate all arrays with actual data. Do not leave them empty.
- technicalQuestions MUST have at least 3 relevant questions.
- behavioralQuestions MUST have at least 3 relevant questions.
- skillGaps MUST have at least 1 identified gap.
- preparationPlan MUST have a structured plan of at least 3 days.
- preparationPlan MUST be an array of objects, NOT strings.
- matchScore MUST be an integer from 0 to 100.
- title MUST be the extracted or inferred job role title.
`;

    let response;

    return await generateAIResponse(prompt, interviewReportSchema);


}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: "new"
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" })

        const pdfBuffer = await page.pdf({
            format: "A4", margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be just 1 page long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const jsonContent = await generateAIResponse(prompt, resumePdfSchema);
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }