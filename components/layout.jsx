import Navbar from './navbar'
import Footer from './footer'
import styles from '../styles/layout.module.css'

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}