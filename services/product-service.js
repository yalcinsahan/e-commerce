import axios from "axios"

export const addProduct = async (product) => {

    return await axios.post(`${process.env.NEXT_URL}/products`, product)

  }