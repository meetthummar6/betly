import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/auth/AuthContext'
import  Navbar  from '../../components/Navbar'

export const Route = createFileRoute('/_Layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
    const { user,loading,logout}=useAuth();
      const navigate= useNavigate();
      useEffect(()=>{
          if(!loading && !user){
              navigate({to:'/login'});
          }
      },[loading,user,navigate]);
      if(loading) return <p className='h-screen flex items-center justify-center text-white'>loading...</p>
      if(!user) return null;
    return( <>
      <Navbar user={user} logout={logout} />
      <Outlet />
    </>
  )
}
