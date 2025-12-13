"use client"
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [ok , setok] = useState(false)


    return (
        <AppContext.Provider value={{ ok }} >
            {children}
        </AppContext.Provider>
    )
}