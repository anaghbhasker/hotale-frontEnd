import React, { useState ,useEffect } from 'react'
import success from '../../../Assets/success-green-check-mark-icon.webp'
import { Link,useParams } from 'react-router-dom';
import Axiosinstance from '../../../config/Axiosinstance';
import './Emailverify.css'

function EmailVerify() {
    const [validUrl, setValidUrl] = useState(false)
    const param=useParams()
    useEffect(()=>{
        const verifyEmail=async()=>{
            try{
                Axiosinstance.get(`/${param.id}/verify/${param.token}`).then((response)=>{
                    console.log(response.data)
                    setValidUrl(true)
                })
            }catch(error){
                console.log(error)
                setValidUrl(false)
            }
        }
        verifyEmail()
    },[param])
    return (
        <div>
            {validUrl ? (
				<div className={"container"}>
					<img src={success} alt="success_img" className={"success_img"} />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={"green_btn"}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>  
			)}
        </div>
    )
}

export default EmailVerify