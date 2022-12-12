import { Add, Login, Logout, PersonAddAlt, PersonOutline, Search, ShoppingCartOutlined } from '@mui/icons-material'
import styles from '../styles/navbar.module.css'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux'
import { changeDisplay } from '../redux/cart-slice'
import Cart from './cart'

export default function Navbar() {

    const { data: session } = useSession()

    const items = useSelector(state => state.cart.items)

    const dispatch = useDispatch()

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/">
                    E-Commerce
                </Link>
            </div>

            <div className={styles.mid}>
                <input type="text" placeholder='Search' />
                <Search className={styles.search} />
            </div>

            <div className={styles.right}>
                {!session ?
                    <>
                        <Link href="/login">
                            <div>
                                <Login />
                                <span>Login</span>
                            </div>
                        </Link>

                        <Link href="/signup">
                            <div>
                                <PersonAddAlt />
                                <span>Signup</span>
                            </div>
                        </Link>
                    </>
                    :
                    <>
                        <Link href="/profile">
                            <div>
                                <PersonOutline />
                                <span>Profile</span>
                            </div>
                        </Link>

                        {session.role == "admin" ? (
                            <Link href="/add">
                                <div>
                                    <Add />
                                    <span>Add</span>
                                </div>
                            </Link>
                        ) : (

                            <div className={styles['cart-container']} onClick={() => dispatch(changeDisplay())}>
                                <p>{items?.length}</p>
                                <ShoppingCartOutlined />
                                <span>Cart</span>
                            </div>

                        )}

                        <div onClick={() => signOut()}>
                            <Logout />
                            <span>Logout</span>
                        </div>

                    </>}
            </div>

            <Cart />
        </div>
    )
}
