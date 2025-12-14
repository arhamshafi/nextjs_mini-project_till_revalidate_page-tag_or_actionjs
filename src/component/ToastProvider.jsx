"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
    return (
        <ToastContainer
            position="top-center"
            autoClose={1200}
            closeOnClick
            pauseOnHover={false}
            draggable={true}
            theme="light"
            style={{ position: "fixed" }}
        />
    );
}
