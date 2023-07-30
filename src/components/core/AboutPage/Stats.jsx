import React from 'react';

const statsdata = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"}
]

const Stats = () => {
  return (
    <section className='bg-richblack-800 lg:py-[70px] md:py-[40px] sm:py-[40px]'>
        
        <div className='w-11/12 justify-center items-center mx-auto gap-4'>
            <div className='flex flex-row lg:flex-nowrap gap-x-4 justify-center items-center sm:flex-wrap md:flex-wrap'>
                {
                    statsdata.map( (data, index) => (
                        <div key={index} className='flex flex-col lg:items-baseline px-28 py-5 md:w-[100%] sm:w-[100%] md:items-center sm:items-center'>
                            <h1 className='text-white font-inter text-4xl font-bold mb-2 
                            flex flex-row items-center justify-center'>{data.count}</h1>
                            <h2 className='text-richblack-600 text-base font-inter'>{data.label}</h2>
                        </div>  
                    ))
                }
            </div>
        </div>

    </section>
  )
}

export default Stats