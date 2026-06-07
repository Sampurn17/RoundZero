const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")

const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")
const interviewRouter = express.Router()
console.log("INTERVIEW ROUTES FILE LOADED");

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description, resume pdf and job description
 * @access private
 */

interviewRouter.post("/", (req, res, next) => {
    console.log("POST /api/interview received");
    next();
}, authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get a single interview report by id
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description generate resume PDF for an interview report
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)

/**
 * @route DELETE /api/interview/report/:interviewId
 * @description delete a single interview report by id
 * @access private
 */
interviewRouter.delete("/report/:interviewId", authMiddleware.authUser, interviewController.deleteInterviewReportController)

module.exports = interviewRouter
