import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Must Be Required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email Must Be Required"],
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password Must Be Required"],
        minlength: [6, "Password Must Be 6 Digit"],
        select: false,
    },

    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"],
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.password);
};


const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
