import { unstable_getServerSession } from "next-auth/next";
import Product from "../../../models/product";
import connectMongo from "../../../utils/connect-mongo";
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    console.log(session)

    if (session.role == "admin") {
        if (req.method === 'POST') {
            await connectMongo()

            const { name, details, category, photos } = req.body

            Product.create({ name, details, category, photos })
                .then(result => res.json(result))
                .catch(err => res.json(err))
        }
    }

    else if (session.role == "user") {
        res.json({ message: "Not authorized." });
    }

    else {
        res.status(401).json({ message: "You must be logged in." });
    }
}