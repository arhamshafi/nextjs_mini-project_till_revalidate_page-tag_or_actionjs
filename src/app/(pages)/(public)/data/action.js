"use server"

import { AuthOption } from "@/app/api/auth/[...nextauth]/route"
import ConnectDB from "@/lib/mongo"
import Student from "@/model/student"
import mongoose from "mongoose"
import { getServerSession } from "next-auth"


export const del = async (id) => {
    try {
        const session = await getServerSession(AuthOption)
        
        
        if (session?.user?.role !== "admin") throw new Error("Only Admin Actions")
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

export const add = async (data) => {
    try {
        const session = await getServerSession(AuthOption)
        if (session?.user?.role !== "admin") throw new Error("Only Admin Actions")
        await ConnectDB()

        const res = await Student.create({
            name: data.name,
            class: data.clas,
            age: data.age,
            gender: data.gender,
            city: data.city
        })
        return JSON.stringify({ success: true, message: "Successfully Created" })

    } catch (err) {
        return JSON.stringify({ success: false, message: err.message || "Server Error" })
    }
}