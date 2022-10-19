import { unstable_getServerSession } from "next-auth/next";
import Product from "../../../models/product";
import connectMongo from "../../../utils/connect-mongo";
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    if (session.role == "admin") {

        if (req.method === 'POST') {
            await connectMongo()
                .then(async () => {

                    try {
                        const response = await Product.create(req.body)
                        if (response._id) return res.json(response)
                    } catch (error) {
                        return res.json(error)
                    }

                })
                .catch(error => res.json(error))
        }

    }

    else if (session.role == "user") {
        res.json({ message: "Not authorized." });
    }

    else {
        res.status(401).json({ message: "You must be logged in." });
    }
}