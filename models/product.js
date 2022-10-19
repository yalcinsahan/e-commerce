import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        details: { type: String, required: true },
        category: { type: String, required: true },
        photos: [String],
        ratings: [{ name: String, star: Number }],
        price: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Product || mongoose.model('Product', productSchema)