import Axiosinstance from "../Axiosinstance";

export const getUser=async(token)=>{
    try {
        const response=await Axiosinstance.get('/getUser',{
            headers: {
                usertoken: token
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const gethotel=async (destination)=>{
    try {
        const response=await Axiosinstance.get(`/getAllhotel?destination=${destination}`)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const hoteView=async (hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/hotelView?hotelId=${hotelId}`)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const coupenApply=async (obj)=>{
    try {
        const response=await Axiosinstance.post(`/coupenApply`,obj,{
            headers: {
                usertoken: obj.userToken
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}


export const bookingFlow=async (obj)=>{
    try {
        const response =await Axiosinstance.post(`/bookingFlow`,obj,{
            headers: {
                usertoken: obj.userToken

            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getBookings=async (token)=>{
    try {
        const response=await Axiosinstance.get('/getBookings',{
            headers: {
                usertoken: token
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}


export const bookingcancel=async (token,bookingId)=>{
    try {
        const response=await Axiosinstance.get(`/bookingCancel/${bookingId}`,{
            headers: {
                usertoken: token
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}


export const addfeedback=async (obj)=>{
    try {
        const response=await Axiosinstance.post('/addFeedback',obj,{
            headers: {
                usertoken: obj.userToken
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const editUserprofile=async(obj)=>{
    try {
        const response=await Axiosinstance.post('/editUserprofile',obj,{
            headers: {
                usertoken: obj.userToken
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const keralaHotels=async ()=>{
    try {
        const response=await Axiosinstance.get('/exploreKerala')
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const topRated=async ()=>{
    try {
        const response=await Axiosinstance.get('/topRated')
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}
