import React, { useEffect, useState } from 'react'
import { getAdminData } from '../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import AdminChart from './AdminChart';
import { GetAllCourseCategories } from '../../../services/operations/courseAPI';
import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {FiEdit2} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [AdminData, setAdminData] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDahboardDetails = async () => {
      setLoading(true);

      const response = await getAdminData(token);
      const result = await GetAllCourseCategories();

      if(response?.length)
        setAdminData(response);

      if(result)
        setCategories(result);

      setLoading(false);
    }

    fetchAdminDahboardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalNoOfCourses = AdminData?.reduce(
    (acc, curr) => acc + curr.totalcourses,
    0
  );

  let totalNoOfUniqueInstructors = [];
  
  AdminData?.map((data) => (
    data.totalUniqueInstructors.map((instructorId) => (
      !totalNoOfUniqueInstructors.includes(instructorId) ?
      totalNoOfUniqueInstructors.push(instructorId) : ""
    ))
  ));

  return (
    <div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>

        {
          loading ? (<div className="flex h-screen justify-center items-center"><Spinner /></div>) 
          : categories.length > 0 ? 
          (
            <div>
              <div className="my-4 flex lg:flex-row lg:gap-y-0 md:flex-col md:gap-y-10 sm:flex-col sm:gap-y-10 lg:h-[500px] lg:space-x-4">
                
                {/* Render chart / graph */}
                {totalNoOfCourses > 0 || totalNoOfUniqueInstructors > 0 ? (
                  <AdminChart categories={AdminData} />
                ) : (
                  <div className="flex-1 rounded-md bg-richblack-800 p-6">
                    <p className="text-lg font-bold text-richblack-5">Visualize</p>
                    <p className="text-xl font-semibold text-richblack-50 flex h-full justify-center items-center">
                      Not Enough Data To Visualize
                    </p>
                  </div>
                )}

                {/* Total Statistics */}
                <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Statistics</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-lg text-richblack-200">Total Categories</p>
                      <p className="text-3xl font-semibold text-richblack-50">
                        {categories.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-richblack-200">Total Courses</p>
                      <p className="text-3xl font-semibold text-richblack-50">
                        {totalNoOfCourses}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-richblack-200">Total Instructors</p>
                      <p className="text-3xl font-semibold text-richblack-50">
                        {totalNoOfUniqueInstructors?.length}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="rounded-md bg-richblack-800 p-6">
                
                {/* Render 3 courses */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-richblack-5">Your Categories</p>
                  <Link to="/dashboard/all-categories">
                    <p className="text-xs font-semibold text-yellow-50">View All</p>
                  </Link>
                </div>

                <div className="my-4 flex items-start space-x-6">
                    <Table className="rounded-xl border-t-2 border-l-2 border-r-2 border-richblack-900">
                    
                      <Thead>
                        <Tr className="flex rounded-t-md border-b-2 border-b-richblack-900 px-6 py-2 justify-between">
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
                          categories.slice(0, 3).map((category) => (
                              <Tr key={category._id}
                              className="flex border-b-2 border-richblack-900 px-6 py-8 ">

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

              </div>

            </div>
          ) : (
          <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
            <p className="text-center text-2xl font-bold text-richblack-5">
              You have not created any categories yet
            </p>
            <Link to="/dashboard/add-category">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Create a Category
              </p>
            </Link>
          </div>
        )}

    </div>
  )
}

export default AdminDashboard