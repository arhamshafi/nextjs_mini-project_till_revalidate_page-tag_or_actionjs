"use client"
import React from 'react'
import { SessionProvider } from "next-auth/react"

import { AppProvider } from './context';

export default function MainWrapper({ children, session }) {
    return (
        <SessionProvider session={session}>
            <AppProvider>
               
                {children}
            </AppProvider>
        </SessionProvider>
    )
}
