import React, { useState } from 'react'
import { GetAllCourseCategories } from '../../../services/operations/courseAPI';
import { useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {FiEdit2} from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';

const AllCategories = () => {

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true);
      const result = await GetAllCourseCategories();
      if(result){
        setCategories(result);
      }
      setLoading(false);
    }

    fetchAllCategories();
  },[]);


  return (
    <div className='flex flex-col gap-y-5 mt-5'>
      <h1 className='text-3xl text-white font-semibold font-inter'>All Categories</h1>

      <Table className="rounded-xl border-2 border-richblack-800">

        <Thead>
            <Tr className="flex rounded-t-md border-b-2 border-b-richblack-800 px-6 py-2 justify-between">
                <Th className="flex-1 w-[30%] text-left text-sm font-medium uppercase text-richblack-100">
                    Category
                </Th>
                <Th className=" w-[50%] text-center text-sm font-medium uppercase text-richblack-100">
                    Description
                </Th>
                <Th className="text-right w-[20%] text-sm font-medium uppercase text-richblack-100">
                    Actions
                </Th>
            </Tr>
        </Thead>

        <Tbody>
          {
            categories?.map((category) => (
                <Tr key={category._id}
                className="flex  border-b-2 border-richblack-800 px-6 py-8 ">

                    <Td className="text-lg text-left w-[30%] font-medium text-yellow-50 flex flex-col">
                      <Link to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}>{category.name}</Link>
                    </Td>

                    <Td className="text-sm text-left w-[50%] font-medium text-richblack-300 flex flex-col justify-center">
                      {category.description.split(" ").length > 30 ? category.description.split(" ").splice(0,30).join(" ") + "..." : category.description}
                    </Td>

                    <Td className="text-sm text-right w-[20%] font-medium text-richblack-100 flex flex-col justify-center">
                        
                      <button disabled={loading}
                          onClick={() => {
                              navigate(`/dashboard/edit-category/${category._id}`)
                          }}
                          title="Edit"
                          className="flex justify-end px-2 text-caribbeangreen-300 transition-all duration-200 hover:scale-110"
                      >
                          <FiEdit2 size={20} />
                      </button>


                    </Td>

                </Tr>
            ))
          }
        </Tbody>

      </Table>
    </div>
  )
}

export default AllCategories