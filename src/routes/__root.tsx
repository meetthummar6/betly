import { Outlet,createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: ()=> <div className='bg-[#1c1c1c]'><Outlet/></div>,
})