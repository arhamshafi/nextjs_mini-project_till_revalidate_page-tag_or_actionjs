"use server"

import ConnectDB from "@/lib/mongo"
import Student from "@/model/student"
import mongoose from "mongoose"


export const del = async (id) => {
    try {
        await ConnectDB()
        const objId = new mongoose.Types.ObjectId(id)
        const res = await Student.deleteOne({ _id: objId })
        if (res.deletedCount === 0) {
            return JSON.stringify({ success: false, message: "Student not found" })
        }
        return JSON.stringify({ success: true, message: "Successfully Delete" })
    } catch (err) {
        return JSON.stringify({ success: false, message: err.message || "Invalid Error" })
    }
}