import User from "../../../models/user";
import connectMongo from "../../../utils/connect-mongo";

export default async function handler(req, res) {

    if (req.method === 'POST') {

        await connectMongo()
            .then(async () => {

                await User.findById(req.body.id).select('cart -_id')
                    .then(cart => res.json(cart))
                    .catch(error => res.json(error))

            })
            .catch(error => res.json(error))

    }

}