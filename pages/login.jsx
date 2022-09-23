import { getSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/login.module.css'

export default function Login() {

    const [user, setUser] = useState({ name: '', email: '', password: '' })

    const handleLogin = (e) => {
        e.preventDefault()

        signIn("credentials", { email: user.email, password: user.password })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.login}>

            <Navbar />

            <form className={styles.form} onSubmit={(e) => handleLogin(e)}>

                <h1>Login</h1>

                <div className={styles.input}>
                    <span>e-mail</span>
                    <input
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>

                <div className={styles.input}>
                    <span>Password</span>
                    <input
                        type="text"
                        placeholder='At least 6 character'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>

                <button type='submit'>
                    Log In
                </button>

            </form>
        </div>
    )
}

export async function getServerSideProps(ctx) {

    const session = await getSession(ctx)

    if (session) {
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