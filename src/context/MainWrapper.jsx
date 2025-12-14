"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from './context';

export default function MainWrapper({ children, session }) {
    return (
        <SessionProvider session={session}>
            <AppProvider>
                <ToastContainer
                    position="top-center"
                    autoClose={1200}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="light"
                />
                {children}
            </AppProvider>
        </SessionProvider>
    )
}
