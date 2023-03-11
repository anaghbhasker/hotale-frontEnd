import React from 'react'

function Plan() {
  return (
    <div className=' flex max-w-[1400px] m-auto px-4 py-16 gird lg:grid-col-2  gap-4 '>
        <div className='grid grid-cols-2 grid-rows-6 h-[80vh]  '>
            <img className='row-span-3 object-cover w-full  h-full p-2' src='https://media.istockphoto.com/id/1066999762/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=kh1SoNvZYDdAFOadeKxPVssVKVzbMTIuOHQu-RBDoX0=' alt=''></img>
            <img className='row-span-2 object-cover w-full h-full p-2' src='https://media.istockphoto.com/id/843823656/photo/hotel-room.jpg?s=612x612&w=0&k=20&c=8-ZNA52e5GlPuuQPXqZRgsTO9WRZwZgFtDotyC6CGHY=' alt=''></img>
            <img className='row-span-2 object-cover w-full h-full p-2' src='https://media.istockphoto.com/id/1066999762/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=kh1SoNvZYDdAFOadeKxPVssVKVzbMTIuOHQu-RBDoX0=' alt=''></img>
            <img className='row-span-3 object-cover w-full h-full p-2' src='https://media.istockphoto.com/id/1066999762/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=kh1SoNvZYDdAFOadeKxPVssVKVzbMTIuOHQu-RBDoX0=' alt=''></img>
            <img className='row-span-2 object-cover w-full h-full p-2' src='https://media.istockphoto.com/id/1066999762/photo/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=0&k=20&c=kh1SoNvZYDdAFOadeKxPVssVKVzbMTIuOHQu-RBDoX0=' alt=''></img>
        </div>
        {/* rigt side */}
        <div className='flex flex-col h-full justify-center'>
            <h3 className='text-3xl md:text-3xl font-bold'>Plane your next trip</h3>
            <p className='text-2xl py-6'>As one of the most iconic luxury hotels in the world,</p>
            <p className='pb-6'>As one of the most iconic luxury hotels in the world, Search low prices on hotels, homes and much more...</p>
        </div>
    </div>
  )
}

export default Plan