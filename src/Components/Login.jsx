import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Logo from './Logo'
import Input from './Input'
import Button from './Button'
import { useDispatch } from 'react-redux'
import authService, { AuthService } from '../appWrite/auth'
import { useForm } from 'react-hook-form'

export default function Login() {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const[errors,setErrors]=useState("");

    const login=async (data)=>{
      setErrors("");
      try{
        const session =await authService.login(data);
        if(session){
          const userData=await authService.getCurrentUser();
          if(userData){
            dispatch(authLogin(userData));
            navigate("/")
          }
        }
      }
      catch(error){
        setErrors(error.message);
      }
    }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-600 rounded-xl p-10 border border-black/10`}>
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width='100%'/>
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
      <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-300 hover:underline hover:text-blue-400"
                    >
                        Sign Up
                    </Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8 '>
          <div className='space-y-5'>
            <Input
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email",{
              required:true,
              validate:{
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
              }
            })}
            />
            <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password",{
              required:true,
            })}
            />
            <Button
            type="submit"
            className="w-full cursor-pointer hover:bg-gray-700 duration-700 shadow-white-500">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
