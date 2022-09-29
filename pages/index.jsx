import styles from '../styles/home.module.css'
import Navbar from "../components/navbar.jsx";
import axios from 'axios';

export default function Home() {

  const add = () => {
    axios.post("http://localhost:3000/api/products", { name: "sad", details: "sad", category: "das", photos: ["d", "w"] })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.main}>
      <Navbar />
      <button onClick={add}>ekle</button>
    </div>
  )
}
