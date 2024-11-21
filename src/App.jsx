import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import {login,logout} from './store/authslice'

function App() {
  const [loading,setLoading] =useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authservice.getcurrentuser()
    .then((userData)=>{
      if(userData)
      {
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">Ayaj</div>
  ):(null)
}

export default App
