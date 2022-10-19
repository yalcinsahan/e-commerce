import Product from "../../../models/product";
import connectMongo from "../../../utils/connect-mongo";

export default async function handler(req, res) {

    if (req.method === 'GET') {

        await connectMongo()
            .then(async () => {

                const productId = req.query.id

                try {
                    const product = await Product.findById(productId)
                    if (product?._id) return res.status(200).send(product)

                } catch (error) {
                    return res.status(500).send(error)
                }

            })
            .catch(error => res.json(error))

    }

}