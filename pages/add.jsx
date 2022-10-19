import { ArrowDropDown, Check, Clear, Photo } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Navbar from "../components/navbar";
import ScrollContainer from 'react-indiana-drag-scroll'
import { addProduct } from "../services/product-service";
import styles from '../styles/add.module.css'

const categoryList = ["Electronics", "Fashion", "Health", "Kitchen", "Books"]

export default function AddProduct() {

    const [product, setProduct] = useState({ name: "", details: "", category: "", photos: [], price: "" });
    const [categoryDisplay, setCategoryDisplay] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const convertBase64 = (files) => {

        for (let i = 0; i < files.length; i++) {

            let reader = new FileReader();

            reader.readAsDataURL(files[i]);
            reader.onload = function () {
                product.photos.push(reader.result)
                setProduct({ ...product })
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };

        }
    }

    const handleForm = async (e) => {
        e.preventDefault()

        const response = await addProduct(product)

        console.log(response);

        if (response.data._id) {
            setProduct({ name: "", details: "", category: "", photos: [] })
            setIsAdded(true)
            setDialog(true)

            setTimeout(() => {
                setDialog(false)
            }, 3000);
        }
        else {
            setIsAdded(false)
            setDialog(true)

            setTimeout(() => {
                setDialog(false)
            }, 3000);
        }

    }

    return (
        <div className={styles.add}>
            <Navbar />

            {dialog ? (
                <div className={styles["dialog-wrapper"]}>
                    <div className={isAdded ? styles.success : styles.error}>
                        {isAdded
                            ? <Check className={styles["dialog-icon"]} />
                            : <Clear className={styles["dialog-icon"]} />}
                        <span>{isAdded ? "Successfully added" : "Something went wrong"}</span>
                    </div>
                </div>
            ) :
                (
                    <form onSubmit={(e) => handleForm(e)}>

                        <input
                            type="name"
                            placeholder="title"
                            className={styles.title}
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })} />

                        <textarea
                            placeholder="details"
                            cols="30"
                            rows="10"
                            className={styles.details}
                            value={product.details}
                            onChange={(e) => setProduct({ ...product, details: e.target.value })}></textarea>

                        <div className={styles["category-price"]}>
                            <div
                                className={styles.category}>
                                <div className={styles.text}
                                    onMouseOver={() => setCategoryDisplay(true)}
                                    onMouseLeave={() => setCategoryDisplay(false)}>
                                    {product.category ? product.category : "choose a category"}
                                    <ArrowDropDown />
                                </div>

                                <div
                                    className={styles.categories}
                                    style={{ display: categoryDisplay ? "flex" : "none" }}
                                    onMouseOver={() => setCategoryDisplay(true)}
                                    onMouseLeave={() => setCategoryDisplay(false)}>

                                    {categoryList.map(e => {
                                        return (
                                            <span onClick={() => setProduct({ ...product, category: e }) & setCategoryDisplay(false)} key={e}>
                                                {e}
                                            </span>
                                        )
                                    })}

                                </div>
                            </div>

                            <input
                                type="number"
                                className={styles.price}
                                placeholder="price"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                        </div>

                        <ScrollContainer className="scroll-container">

                            <div className={styles["photo-area"]}>
                                <div className={styles["photos-wrapper"]}>
                                    <div className={styles.photos}>
                                        <Photo />
                                        <span>Add photos</span>
                                    </div>

                                    <input
                                        type="file"
                                        multiple onChange={(e) => convertBase64(e.target.files)} />
                                </div>

                                {product.photos.map(e => {
                                    return <img src={e} alt="" className={styles["product-image"]} />
                                })}
                            </div>
                        </ScrollContainer>

                        <button
                            type="submit"
                            className={styles.submit}>
                            ADD PRODUCT
                        </button>
                    </form>
                )}




        </div>
    )
}

export async function getServerSideProps(ctx) {

    const session = await getSession(ctx)

    if (session?.role !== "admin") {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            }
        };
    }

    return {
        props: {},
    };
}