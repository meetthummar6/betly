import { IoWalletSharp } from "react-icons/io5"
import { RxHamburgerMenu } from "react-icons/rx"
import { userSchema } from "../types"
import {
  Sheet,
  SheetTrigger,
  SheetContent
} from "./ui/sheet"
import { Button } from "./ui/button"
import { useNavigate } from "@tanstack/react-router"

const Navbar = ({user,logout}: {user:userSchema,logout:()=>void}) => {
  const navigate=useNavigate();
  return (
    <header className="bg-[#2a2a2a] px-4 py-4 flex items-center justify-between shadow-md max-w-screen sticky top-0 z-50">
      <div className="text-xl font-bold text-cyan-200 font-Headers">
          Bet.ly
      </div>
      <div className="flex items-center space-x-4 xl:space-x-10 px-2 xl:mx-4">
        <div className="bg-neutral-400/50 font-semibold text-sm text-cyan-200 flex items-center px-4 py-1 mr-6 gap-5 rounded-md sm:text-base"><IoWalletSharp/><span className="text-cyan-50 font-Headers">{user.balance?.toFixed(2)}</span></div>
        <Sheet>
          <SheetTrigger asChild>
        <Button variant="ghost" className="text-2xl focus:outline-none text-cyan-200"><RxHamburgerMenu /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#2a2a2a] text-white w-40 border-l border-cyan-200 shadow-[0_0_10px_#00ffff44]">
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="w-16 h-16 rounded-full bg-cyan-200/20 border border-cyan-200 shadow-[0_0_10px_#00ffff44] flex items-center justify-center text-2xl font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <p className="text-lg font-semibold">
                {user.username}
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 mt-4 px-2">
              <Button className="w-full bg-blue-400 text-black hover:bg-blue-300 transition-all shadow-[0_0_10px_#00ffff44] hover:shadow-[0_0_20px_#00ffff66]" onClick={()=>{navigate({to:'/edit-profile'})}}> Edit Profile</Button>
              <Button className="w-full bg-cyan-400 text-black hover:bg-cyan-300 transition-all shadow-[0_0_10px_#00ffff44] hover:shadow-[0_0_20px_#00ffff66]" onClick={()=>{navigate({to:'/history'})}}>History</Button>
              <Button className="w-full bg-emerald-400 text-black hover:bg-emerald-300 transition-all shadow-[0_0_10px_#00ffff44] hover:shadow-[0_0_20px_#00ffff66]" onClick={()=>{navigate({to:'/profile'})}}>Req Money</Button>
              <Button className="w-full bg-rose-400 text-black hover:bg-rose-300 transition-all shadow-[0_0_10px_#00ffff44] hover:shadow-[0_0_20px_#00ffff66]" onClick={logout}>
                Logout
              </Button>
            </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar