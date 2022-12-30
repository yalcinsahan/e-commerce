import { ArrowDropDown, Check, Clear, Photo } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { useState } from "react";
import ScrollContainer from 'react-indiana-drag-scroll'
import { addProduct } from "../services/product-service";
import styles from '../styles/add.module.css'
import { categories } from "../data/categories";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";

export default function AddProduct() {

    const [product, setProduct] = useState({ name: "", details: "", category: "", price: "" });
    const [categoryDisplay, setCategoryDisplay] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [files, setFiles] = useState([])


    const handleForm = async (e) => {
        e.preventDefault()

        var formData = new FormData();

        [...files].forEach((file) => {
            formData.append("media", file)
        });

        formData.append('name', product.name)
        formData.append('details', product.details)
        formData.append('category', product.category)
        formData.append('price', product.price)

        const response = await addProduct(formData)

        if (response.data._id) {
            setProduct({ name: "", details: "", category: "", photos: [] })
            setFiles([])
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

                                    {categories.map(e => {
                                        return (
                                            <span onClick={() => setProduct({ ...product, category: e }) & setCategoryDisplay(false)} key={uuidv4()}>
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
                                        multiple
                                        onChange={(e) => setFiles(e.target.files)}
                                    />
                                </div>

                                {[...files].map(e => {
                                    return <div className={styles["product-image"]} key={uuidv4()} ><Image fill src={URL.createObjectURL(e)} alt="" style={{ objectFit: "contain" }} /></div>
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

    console.log(session);

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