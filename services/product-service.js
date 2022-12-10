import axios from "axios"

export const addProduct = async (formData) => {
  return await axios.post(`${process.env.NEXT_URL}/products/add`, formData)
}

export const getProduct = async (productId) => {
  return await axios.get(`${process.env.NEXT_URL}/products/${productId}`)
}

export const getAllProducts = async () => {
  return await axios.get(`${process.env.NEXT_URL}/products`)
}
