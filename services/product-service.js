import axios from "axios"

export const addProduct = async (product) => {

  return await axios.post(`${process.env.NEXT_URL}/products`, product)

}

export const getProduct = async (productId) => {
  return await axios.get(`${process.env.NEXT_URL}/products/${productId}`)
}