"use server"

import ConnectDB from "@/lib/mongo"
import Student from "@/model/student"
import mongoose from "mongoose"

export const fetchDetails = async (id) => {
    try {
        await ConnectDB()
        const obj = new mongoose.Types.ObjectId(id)
        const res = await Student.findById(obj)
        if (!res) throw new Error("Details Not Found")
        return JSON.stringify({ success: true, message: "Successfully Added" , details : res  })

    } catch (err) {
        return JSON.stringify({ success: false, message: err.message || "server issue" })
    }
}