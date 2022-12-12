import User from "../../../models/user";
import connectMongo from "../../../utils/connect-mongo";

export default async function handler(req, res) {

    await connectMongo()

    switch (req.method) {
        case 'PUT':

            await User.findByIdAndUpdate(req.query.id, { cart: req.body.cart })
                .then((response) => res.json({ isUpdated: true, response }))
                .catch((err) => res.json({ isUpdated: false, err: err }))

            break;

        default:
            break;
    }

}