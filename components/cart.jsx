import { HighlightOff } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, removeItem } from '../redux/cart-slice'
import { updateUserCart } from '../services/user-service'
import styles from '../styles/cart.module.css'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'

export default function Cart() {

    const { data: session } = useSession()

    const { items, display } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        if (session?._id) {
            dispatch(getCart(session._id))
        }
    }, [session, dispatch])

    const removeCartItem = (id) => {
        if (session?._id) {
            updateUserCart(session._id, items.filter(item => item._id !== id))
                .then(res => res.data.isUpdated ? dispatch(removeItem(id)) : console.log(res.data))
                .catch(err => console.log(err))
        }
    }

    return (
        display ?
            (<div className={styles['cart']}>

                <h1>Shopping Cart</h1>

                {items.map(item =>
                    <div className={styles['cart-item']} key={uuidv4()}>

                        <HighlightOff className={styles['remove-icon']} onClick={() => removeCartItem(item._id)} />

                        <div className={styles['item-image']}>< Image fill src={item.photos[0]} style={{ objectFit: "contain" }} alt={item.name} /></div>
                        <div className={styles['item-info']}>
                            <p>{item.name}</p>
                            <b>$ {item.price}</b>
                        </div>
                    </div>
                )}

                <button>Buy</button>
            </div>) : null
    )
}
