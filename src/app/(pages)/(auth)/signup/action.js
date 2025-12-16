"use server"

import ConnectDB from "@/lib/mongo"
import user from "@/model/user"

export const signup = async (userdata) => {
    try {
        await ConnectDB()

        const existinguser = await user.findOne({ email: userdata.email })
        if (existinguser) throw new Error("This E-Mail is Already Used")
        const newUser = await user.create({ name: userdata.name, email: userdata.email, password: userdata.password })
        return JSON.stringify({ success: true, message: "successfully Registerd" })

    } catch (err) {
        return JSON.stringify({ success: false, message: err.message || "Authentication Error" })
    }
}