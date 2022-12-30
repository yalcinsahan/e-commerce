import styles from '../styles/signup.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { useSession } from 'next-auth/react'

export default function Signup(props) {

    const [user, setUser] = useState({ name: '', email: '', password: '' })
    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated") Router.push("/")
    }, [status])


    const handleSignup = (e) => {
        e.preventDefault()

        axios.post(process.env.NEXTAUTH_URL + "/signup", user)
            .then(result => {
                if (result.data._id) {
                    return Router.push('/login')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        status === "unauthenticated" ?
            (<div className={styles.signup}>

                <form className={styles.form} onSubmit={(e) => handleSignup(e)}>

                    <h1>Create account</h1>

                    <div className={styles.input}>
                        <span>Your name</span>
                        <input
                            type="text"
                            placeholder='First and last name'
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>

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
                        Create Account
                    </button>

                </form>
            </div>) : <div></div>
    )
}

export async function getServerSideProps() {

    return {
        props: {},
    };
}