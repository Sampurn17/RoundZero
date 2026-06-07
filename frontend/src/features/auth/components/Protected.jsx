import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React, { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { Loader } from '../../../components/Loader/Loader'
import TopNav from "../../../components/TopNav/TopNav";

const Protected = ({children}) => {
    const {user, loading} = useContext(AuthContext)


    if(loading){
        return <Loader message="Authenticating..." />
    }
    // if user is null, not logged in
    if(!user){
        return <Navigate to={"/login"}/>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <TopNav />
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                {children}
            </div>
        </div>
    );
}

export default Protected