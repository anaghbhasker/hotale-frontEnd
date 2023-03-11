import Axios from 'axios'

const Axiosinstance=Axios.create({
    baseURL:"https://api.bigmarts.shop/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

export default Axiosinstance;