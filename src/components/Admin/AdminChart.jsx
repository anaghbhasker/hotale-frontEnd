import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { adminChart } from "../../config/Service/AdminRequest";

function AdminChart() {

    const [monthSalery,setMonthSalery]=useState([])

    useEffect(()=>{
        async function invoke(){
            const data=await adminChart()
            setMonthSalery(data.getChart);
        }invoke()
    },[])


    const options= {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug","Sep","Oct","Nov","Dec"]
        }
      }
      const series= [
        {
            name: "series-1",
            data: monthSalery
        }
      ]
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="500"
      />
    </div>
  );
}

export default AdminChart;
