import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import authService from './appWrite/auth'
import { login,logout } from './store/authSlice'
import { useDispatch } from 'react-redux';
import  Header from './Components/Header/Header.jsx'
import { Outlet } from 'react-router'
import Footer from './Components/Footer/Footer.jsx'
import Logo from './Components/Logo.jsx'

function App() {

  console.log(import.meta.env.VITE_APPWRITE_URL);

  const[loading,setLoading]=useState(true)
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=>setLoading(false))
    
  },[])

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>

        <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
