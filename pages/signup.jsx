import styles from '../styles/signup.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import Navbar from '../components/navbar'

export default function Signup() {

    const router = useRouter()

    const [user, setUser] = useState({ name: '', email: '', password: '' })

    const handleSignup = (e) => {
        e.preventDefault()

        axios.post(process.env.NEXTAUTH_URL + "/signup", user)
            .then(result => {
                if (result.data._id) {
                    return router.push('/login')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.signup}>

            <Navbar />

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
                    <span>Mobile number or email</span>
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
            },
        };
    }

    return {
        props: {},
    };
}