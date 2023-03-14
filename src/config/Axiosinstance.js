import Axios from 'axios'

const Axiosinstance=Axios.create({
    baseURL:"http://localhost:4000/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

export default Axiosinstance;