import React from 'react'
import authService from '../../appWrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
export default function LogoutBtn() {
    const dispatch=useDispatch();
    const logoutBtnHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }
  return (
    <button  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutBtnHandler}>Logout</button>
  )
}
