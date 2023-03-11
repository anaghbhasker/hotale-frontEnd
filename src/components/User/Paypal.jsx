import { PayPalButtons } from "@paypal/react-paypal-js";
import React, {  } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { bookingFlow } from "../../config/Service/UserRequest";
import { useNavigate } from "react-router-dom";

function Paypal({personal,userMore}) {
    const navigate=useNavigate()
    const userDetails = personal*0.014


  const handleApprove = async (orderId) => {
    try {
        const data= await bookingFlow(userMore)
        if(data.status==="success"){
            const books=data.bookedId
            navigate('/success',{state:{bookingId:books}})
        }else{
            toast.error(`OOPS! something error`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    } catch (error) {
      toast.error(`OOPS! something error`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>

    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENTID }}
    >
      <PayPalButtons
        style={{
          color: "gold",
          layout: "horizontal",
          height: 48,
          tagline: false,
          shape: "pill",
        }}
        onClick={(data, actions) => {
          const hasAlreadyBoughtCource = false;
          if (hasAlreadyBoughtCource) {
            swal(
              "You already bought this booking!",
              "Go to your account view your list of booking",
              "info"
            );
            return actions.reject();
          } else {
            return actions.resolve();
          }
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "hotel booking successfully",
                amount: {
                  value: userDetails,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          return actions.order.capture().then((details) => {
            console.log("order", details);
            handleApprove(details.orderID);
          });
        }}
        onError={(err) => {
          console.log("Paypal Checkout onError", err);
          swal("OOPS!!", "Something error!!", "error");
        }}
        onCancel={() => {
          swal("Payment is canceled!", "You clicked the button!", "info");
        }}
      />
    </PayPalScriptProvider>
    </>
  );
}

export default Paypal;
