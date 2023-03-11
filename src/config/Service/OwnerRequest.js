import Axiosinstance from "../Axiosinstance";

export const getOwner=async()=>{
    try {
        const response = await Axiosinstance.get('/owner/getOwner',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const addHotel=async(obj)=>{
    try {
        const response = await Axiosinstance.post('/owner/addHotel',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const addLocation=async(obj)=>{
    try {
        const response=await Axiosinstance.post('/owner/addLocation',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getOwnerHotel=async()=>{
    try {
        const response=await Axiosinstance.get('/owner/getOwnerHotel',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getEdithotel=async(hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/owner/getEdithotel/${hotelId}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const editHotel=async(obj)=>{
    try {
        const response=await Axiosinstance.post('/owner/editHotel',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const deletehotel=async(id)=>{
    try {
        const response=await Axiosinstance.get(`/owner/deleteHotel/${id}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const hotelbann=async(id)=>{
    try {
        const response=await Axiosinstance.get(`/owner/hotelBann/${id}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const fullDetails=async()=>{
    try {
        const response=await Axiosinstance.get('/owner/fullDetails',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const editProfile=async (obj)=>{
    try {
        const response =await Axiosinstance.post('/owner/editProfile',obj,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getBookings=async (hotelId)=>{
    try {
        const response=await Axiosinstance.get(`/owner/getBookings/${hotelId}`,{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getAllAdmin=async()=>{
    try {
        const response=await Axiosinstance.get('/owner/getAdminChat')
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const createChat=async (obj)=>{
    try {
        const response=await Axiosinstance.post('/chat/',obj)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getChatbox=async (ownerId)=>{
    try {
        const response =await Axiosinstance.get(`/chat/${ownerId}`)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getAdmin =async (adminId)=>{
    try {
        const response=await Axiosinstance.get(`/owner/getAdmin/${adminId}`)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const getAllmessages=async(chatId)=>{
    try {
        const response=await Axiosinstance.get(`/message/${chatId}`)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const myPic=async(ownerId)=>{
    try {
        const response=await Axiosinstance.get(`/owner/myPhoto/${ownerId}`)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const postMessage=async(obj)=>{
    try {
        const response=await Axiosinstance.post('/message/',obj)
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const ownerDashBoard=async()=>{
    try {
        const response=await Axiosinstance.get('/owner/getdashItems',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}

export const ownerGraph=async ()=>{
    try {
        const response=await Axiosinstance.get('/owner/getGraph',{
            headers: {
                ownertoken: localStorage.getItem('ownertoken'),
            },
        })
        const data=response.data
        if(data)return data
    } catch (error) {
        return error.response.data.error;
    }
}