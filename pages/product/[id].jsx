import styles from '../../styles/product.module.css'
import Image from 'next/image';
import { useState } from 'react'
import { getProduct } from '../../services/product-service'
import { AddShoppingCartOutlined, ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cart-slice'
import { updateUserCart } from '../../services/user-service';
import { useSession } from 'next-auth/react';


export default function Product(props) {

  const { data: session } = useSession()

  const [photoIndex, setPhotoIndex] = useState(0)

  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (session?._id) {
      updateUserCart(session._id, [...items, props.product])
        .then(res => res.data.isUpdated ? dispatch(addItem(props.product)) : console.log(res.data))
        .catch(err => console.log(err))
    }
  }

  return (

    props.product.name
      ? (<div className={styles.product}>

        <div className={styles.wrapper} >

          <div className={styles.image}>
            <Image fill style={{ objectFit: "contain" }} src={props.product.photos[photoIndex]} alt="" priority />

            <div className={styles["arrow-wrapper"]}>
              <ArrowBackIosOutlined onClick={() => photoIndex === 0 ? setPhotoIndex(props.product.photos.length - 1) : setPhotoIndex(photoIndex - 1)} />
              <ArrowForwardIosOutlined onClick={() => photoIndex === (props.product.photos.length - 1) ? setPhotoIndex(0) : setPhotoIndex(photoIndex + 1)} />
            </div>
          </div>

          <div className={styles.informations} >
            <h3>{props.product.name}</h3>
            <div className={styles["price-and-add"]}>
              <div className={styles["add-button"]} onClick={() => handleAdd()}>
                <AddShoppingCartOutlined />
                Add to Cart
              </div>
              <h5>$ {props.product.price}</h5>
            </div>

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