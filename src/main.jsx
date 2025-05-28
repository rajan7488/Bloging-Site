import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AuthLayout } from './Components/index.js'
import Login from './Components/Pages/Login.jsx'
import Signup from './Components/Pages/Signup.jsx'
import AddPost from './Components/Pages/AddPost.jsx'
import AllPost from './Components/Pages/AllPost.jsx'
import EditPost from './Components/Pages/EditPost.jsx'
import Post from './Components/Pages/Post.jsx'
import Home from './Components/Pages/Home.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
        </AuthLayout>
        )
      },
      {
        path:'/all-posts',
        element:(
          <AuthLayout authentication>
            {" "}
            <AllPost/>
        </AuthLayout>
        )
      },
      {
        path:'/add-post',
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost/>
        </AuthLayout>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <AuthLayout authentication>
            {" "}
            <EditPost/>
        </AuthLayout>
        )
      },
      {
        path:'/post/:slug',
        element:<Post/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
