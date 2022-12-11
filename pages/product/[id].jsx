import styles from '../../styles/product.module.css'
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProduct } from '../../services/product-service'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';


export default function Product(props) {

  const [photoIndex, setPhotoIndex] = useState(0)

  return (
    props.product.name
      ? (<div className={styles.product}>

        <div className={styles.wrapper} >

          <div className={styles.image}>
            <Image fill style={{ objectFit: "contain" }} src={props.product.photos[photoIndex]} alt="" priority />

            <div className={styles["arrow-wrapper"]}>
              <ArrowBackIosOutlined onClick={() => photoIndex === 0 ? setPhotoIndex(product.photos.length - 1) : setPhotoIndex(photoIndex - 1)} />
              <ArrowForwardIosOutlined onClick={() => photoIndex === (props.product.photos.length - 1) ? setPhotoIndex(0) : setPhotoIndex(photoIndex + 1)} />
            </div>
          </div>

          <div className={styles.informations} >
            <h3>{props.product.name}</h3>
            <h5>$ {props.product.price}</h5>

            <p>
              <b>Details:</b>
              {props.product.details}
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

export async function getServerSideProps(context) {

  const { id } = context.query;

  const product = await getProduct(id)

  return {
    props: { product: product.data },
  };
}