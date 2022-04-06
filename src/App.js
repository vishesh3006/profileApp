import React, {useEffect} from 'react'
import {Login} from './Pages/Login'
import {Navbar} from './components/Navbar'
import {Home} from './Pages/Home'
import {Route, Routes} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {auth} from './firebase'
import {UpdateProfile} from './Pages/UpdateProfile'
import {setUser} from './Redux/Actions/authAction'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AddProfile} from './Pages/AddProfile'
import { UpdateProfile } from './Pages/UpdateProfile'
import './App.css'

export const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(setUser(authUser))
      }else{
        dispatch(setUser(null))
      }
    })
  }, [dispatch])
  return (
    <>
      <Navbar />
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/update' element={<UpdateProfile/>}/>
        <Route path='/addProfile' element={<AddProfile/>}/>
        <Route path='/updateProfile' element={<UpdateProfile/>}/>
      </Routes>
    </>
  )
}
