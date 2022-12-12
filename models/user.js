import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        cart: [{ _id: String, name: String, price: String, photos: [String] }],
        role: { type: String, default: "user" },
    },
    {
        timestamps: true
    }
)

export default mongoose.models.User || mongoose.model('User', userSchema)