import styles from '../styles/home.module.css'
import { categories } from '../data/categories'
import { useSession } from "next-auth/react"
import { getAllProducts } from '../services/product-service'
import Image from 'next/image'
import Router from 'next/router'

export default function Home(props) {

  return (
    <div className={styles.main}>

      <div className={styles["categories"]}>
        {categories.map(category => <div key={category} className={styles["category"]}>{category}</div>)}
      </div>

      <div className={styles["products"]}>
        {props.products.map(product => (

          <div key={product.name} className={styles["product"]}>
            <div onClick={() => Router.push(`/product/${product._id}`)} className={styles["image-container"]}>
              <Image fill style={{ objectFit: "cover" }} src={product.photos[0]} />
            </div>
            <div className={styles["name"]}>{product.name}</div>
            <h3>$ {product.price}</h3>
          </div>

        ))}
      </div>

    </div>
  )
}


export async function getServerSideProps() {

  const products = await getAllProducts()

  return {
    props: { products: products.data },
  };
}