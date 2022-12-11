import Product from "../../../models/product";
import connectMongo from "../../../utils/connect-mongo";

export default async function handler(req, res) {

    if (req.method === 'GET') {

        await connectMongo()
            .then(async () => {

                await Product.find()
                    .then(products => res.json(products))
                    .catch(error => res.json(error))

            })
            .catch(error => res.json(error))

    }

}