import axios from "axios"

export const getUserCart = async (id) => {
    return await axios.post(`${process.env.NEXT_URL}/user/get-cart`, { id })
}

export const updateUserCart = async (id, cart) => {
    return await axios.put(`${process.env.NEXT_URL}/user/${id}`, { cart })
}