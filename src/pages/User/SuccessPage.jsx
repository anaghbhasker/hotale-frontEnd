import React from 'react'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useLocation, useNavigate } from 'react-router-dom'
import Axiosinstance from '../../config/Axiosinstance';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


function SuccessPage() {
    const navigate=useNavigate()
    const location=useLocation()
    const bookingId=location.state.bookingId

            const handleDownload = async () => {
            const response = await Axiosinstance.get(`/download-pdf/${bookingId}`);
            const data=response.data.bookingHotel
            const doc=new jsPDF()
            // Add a title to the PDF document
                doc.setFontSize(24);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor('#008080');
                doc.text('Booking Details', 20, 20);

                // Add a subtitle to the PDF document
                doc.setFontSize(14);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor('#000000');
                doc.text('Generated on ' + new Date().toLocaleDateString(), 20, 40);

                // Add some text with links to the PDF document
                doc.setFontSize(12);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor('#000000');
                doc.textWithLink('Visit our website', 20, 60, { url: 'https://example.com' });
                doc.textWithLink('Contact us for more information', 20, 70, { url: 'mailto:info@example.com' });
                const tableColumn=['BookingId','Check-in','Check-Out','Booking Date','Total Guests','Total Rooms','Total Price'];
                const tableRows=[];
                data.forEach(item=>{
                    const rowData=[
                        item._id.substring(0, 8),
                        item.check_in,
                        item.check_out,
                        item.bookingdate,
                        item.adult+item.children,
                        item.totalrooms,
                        item.totalprice
                    ];
                    tableRows.push(rowData)
                })
                    doc.autoTable(tableColumn,tableRows,{startY:20})
                    doc.save('booking.pdf')
            };  
            


    
    return (
            <div>
               <div className="bg-gray-700 dark:bg-gray-900 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-8 md:px-16 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400">
                            <div className="w-full flex justify-center text-green-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-check" width={56} height={56} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={12} r={9} />
                                    <path d="M9 12l2 2l4 -4" />
                                </svg>
                            </div>
                            <h1 className="text-center text-gray-800 dark:text-gray-100 font-lg font-bold tracking-normal leading-tight mb-4">Payment Processing Successful</h1>
                            <p className="mb-5 text-sm text-gray-600 dark:text-gray-400 text-center font-normal">Thank you for your payment. An automated payment receipt will be here. Check the action below for more details.</p>
                            <div className="flex items-center justify-center w-full space-x-4">
                                <button onClick={()=>{
                                    navigate('/')
                                }} className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm">Go to Home</button>
                            <button onClick={handleDownload} className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm justify-center">Download Pdf <DownloadForOfflineIcon/> </button>

                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default SuccessPage