import User from "../../../models/user";
import connectMongo from "../../../utils/connect-mongo";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connectMongo()

        const { name, email, password } = req.body

        User.create({ name, email, password })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    }
}