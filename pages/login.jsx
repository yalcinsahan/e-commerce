import { signIn, useSession } from 'next-auth/react'
import Router from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from '../styles/login.module.css'

export default function Login(props) {

    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated") Router.push("/")
    }, [status])


    const handleLogin = (e) => {
        e.preventDefault()

        signIn("credentials", { email: user.email, password: user.password })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    return (
        status === "unauthenticated" ? (
            <div className={styles.login}>

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
        ) : <div></div>
    )
}

export async function getServerSideProps() {

    return {
        props: {},
    };
}