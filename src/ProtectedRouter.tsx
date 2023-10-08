import axiosInstance from "@axiosInstance";
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

type Props = {
    children: React.ReactNode;
}
const ProtectedRouter: React.FC<Props> = ({ children }) => {
    const navi = useNavigate();

    // const checkToken = (token:String) => {
    //     let isToken = false;
 
    //     if(token != null){
    //         axiosInstance.post("/checkToken",{
    //         }).then(data => {
    //             console.log(data);
    //             isToken = true;
    //         }).catch(error => {
    //             console.log(error);
    //             isToken = false;
    //         });
    //     }
    //     return isToken;
    // }

    useEffect(() => {
        const token = localStorage.getItem('token') || null;
        
        // checkToken(token);
        if (!token) {
            navi('/login');
        }
    }, [navi]);

    return <>{children}</>
}

export default ProtectedRouter

