import formidable from "formidable";
import fs from "fs";
import { unstable_getServerSession } from "next-auth/next";
import Product from "../../../models/product";
import connectMongo from "../../../utils/connect-mongo";
import { authOptions } from '../auth/[...nextauth]'

export const config = {
    api: {
        bodyParser: false
    }
};


export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    await connectMongo()
        .then(async () => {

            if (req.method === 'POST') {

                if (session.role === 'admin') {
                    try {

                        const form = new formidable.IncomingForm({ multiples: true });
                        form.parse(req, async function (err, fields, files) {

                            const response = await Product.create(fields)

                            if (!Array.isArray(files.media)) files.media = [files.media]

                            if (response._id) {

                                try {
                                    for (let i = 0; i < files.media.length; i++) {
                                        const data = fs.readFileSync(files.media[i].filepath);

                                        fs.mkdirSync(`./public/product-images/${response._id}`, { recursive: true });
                                        fs.writeFileSync(`./public/product-images/${response._id}/${files.media[i].originalFilename}`, data);
                                        fs.unlinkSync(files.media[i].filepath);
                                    }

                                    await Product.findOneAndUpdate({ _id: response._id }, { photos: files.media.map(e => `http://localhost:3000/product-images/${response._id}/${e.originalFilename}`) })

                                } catch (error) {
                                    console.log(error)
                                    return res.json(error)
                                }


                                return res.json(response)
                            }

                        });

                    } catch (error) {
                        return res.json(error)
                    }


                }
                else if (session.role == "user") {
                    res.json({ message: "Not authorized." });
                }
                else {
                    res.status(401).json({ message: "You must be logged in." });
                }

            }

        })
        .catch(() => res.json({ message: "An error occurred while connecting to the database" }))

}