import React, { useEffect, useState } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from 'react-router-dom';
import NavbarLinks from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai";
import {GetAllCategories} from "../../services/operations/categoriesAPI";
import {RiArrowDownSLine} from "react-icons/ri";
import {ACCOUNT_TYPE} from "../../utils/constants";
import ProfileDropdown from '../core/auth/ProfileDropDown';

const Navbar = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);

  useEffect( () => {
    GetAllCategories(setSubLinks);
  },[]);

  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
  }

  return (
    <div className='fixed top-0 w-[100%] z-[1000] flex h-[50px] items-center justify-center 
    border-b-[1px] border-b-richblack-700 bg-richblack-900'>
        <div className='flex w-11/12 max-w-maxcontent items-center justify-between'>

            {/* Logo Image */}
            <Link to="/">
                <img src={logo} width={160} height={42} loading='lazy' alt="logo" />
            </Link>

            {/* Nav Links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                        <div className='relative flex gap-x-1 items-center group cursor-pointer'>
                                            <p>{link.title}</p>
                                            <RiArrowDownSLine />

                                            <div className='invisible absolute left-[50%] top-1 h-6 w-6 opacity-0 z-10
                                            translate-x-[80%] translate-y-[100%] rotate-45 rounded bg-richblack-700
                                            group-hover:visible group-hover:opacity-100 transition-all duration-200'>
                                            </div>

                                            <div className='invisible fixed left-[50%] top-[1%]
                                            translate-x-[-50%] translate-y-[15%] z-10
                                            flex flex-col rounded-md bg-richblack-700 p-4 text-richblack-5
                                            opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                            {
                                                subLinks.length ? (
                                                    subLinks.map( (sublink, index) => (
                                                        <Link to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                            <p className='font-inter text-richblack-5 py-[5px] first-letter:uppercase'
                                                            >{sublink.name}</p>
                                                        </Link>
                                                    ))
                                                ) : (<div className="text-center">No Categories Found</div>)
                                            }
                                            </div>

                                        </div>
                                    ) 
                                    : (
                                        <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                        {link?.title}</p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            

            {/* Login/Signup/Dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && user?.accountType !== ACCOUNT_TYPE.ADMIN && (
                        <Link to="/dashboard/cart" className='relative text-richblack-200 text-xl py-2'>
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <sup className='bounce text-black bg-yellow-50 px-1 py-2 rounded-full
                                absolute z-10 top-[0px] left-[10px]'>
                                    {totalItems}
                                </sup>
                            )
                        }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/login'>
                            <button className='border-b-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                             text-richblack-100 rounded-md'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/signup'>
                            <button className='border-b-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                             text-richblack-100 rounded-md'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && (<ProfileDropdown />)
                }
            </div>


        </div>
    </div>
  )
}

export default Navbar;
