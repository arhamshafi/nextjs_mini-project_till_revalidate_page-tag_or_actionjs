import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Must Be Required"]
    },
    age: {
        type: Number,
        required: [true, "Age Must Be Required"],
        min: 10,
        max: 60
    },
    class: {
        type: String,
        required: [true, "Define your class"]
    },
    city: {
        type: String,
        required: [true, "Define your city"]
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema)
export default Student