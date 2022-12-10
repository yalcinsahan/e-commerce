import styles from '../../styles/product.module.css'
import Navbar from "../../components/navbar.jsx";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProduct } from '../../services/product-service'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';


export default function Product() {

  const productId = useRouter().query.id

  const [product, setProduct] = useState({})
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {

    if (productId) {
      getProduct(productId)
        .then(result => {
          setProduct(result.data)
        })
    }


  }, [productId])

  return (
    product.name
      ? (<div className={styles.product}>

        <div className={styles.wrapper} >

          <div className={styles.image}>
            <img src={product.photos[photoIndex]} alt="" />

            <div className={styles["arrow-wrapper"]}>
              <ArrowBackIosOutlined onClick={() => photoIndex === 0 ? setPhotoIndex(product.photos.length - 1) : setPhotoIndex(photoIndex - 1)} />
              <ArrowForwardIosOutlined onClick={() => photoIndex === (product.photos.length - 1) ? setPhotoIndex(0) : setPhotoIndex(photoIndex + 1)} />
            </div>
          </div>

          <div className={styles.informations} >
            <h3>{product.name}</h3>
            <h5>$ {product.price}</h5>

            <p>
              <b>Details:</b>
              {product.details}
            </p>
          </div>

        </div>
      </div>
      ) :
      <>
        <h1>product not found</h1>
      </>
  )
}
