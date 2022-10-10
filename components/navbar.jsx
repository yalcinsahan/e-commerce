import { Add, Login, Logout, PersonAddAlt, PersonOutline, Search, ShoppingCartOutlined } from '@mui/icons-material'
import styles from '../styles/navbar.module.css'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {

    const { data: session } = useSession()

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                E-Commerce
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

                        {session.role=="admin" ?(
                            <Link href="/add">
                            <div>
                                <Add />
                                <span>Add</span>
                            </div>
                        </Link>
                        ):(
                            <Link href="/cart">
                            <div>
                                <ShoppingCartOutlined />
                                <span>Cart</span>
                            </div>
                        </Link>
                        )}

                        <div onClick={() => signOut()}>
                            <Logout />
                            <span>Logout</span>
                        </div>

                    </>}
            </div>
        </div>
    )
}
