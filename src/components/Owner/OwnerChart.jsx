import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ownerGraph } from "../../config/Service/OwnerRequest";

function OwnerChart() {


  const [monthSalery,setMonthSalery]=useState([])

  useEffect(()=>{
    async function invoke(){
      const data=await ownerGraph()
      setMonthSalery(data.monthSalery);
    }invoke()
  },[])

  console.log(monthSalery);

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug","Sep","Oct","Nov","Dec"],
    },
  };
  const series = [
    {
      name: "series-1",
      data: monthSalery,
    },
  ];

  return (
    <>
        <div className="row pt-10 flex justify-center" style={{ width: '310%' , display: 'flex' , justifyContent: 'center' }}>
          <div className="mixed-chart">
            <Chart options={options} series={series} type="bar" width="500" />
          </div>
        </div>
    </>
  );
}

export default OwnerChart;
