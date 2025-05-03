import { IoWalletSharp } from "react-icons/io5"
import { RxHamburgerMenu } from "react-icons/rx"
import { userSchema } from "../types"

const Navbar = ({user,logout}: {user:userSchema,logout:()=>void}) => {
  return (
    <header className="bg-[#2a2a2a] px-4 py-4 flex items-center justify-between shadow-md max-w-screen sticky top-0 z-50">
      <div className="text-xl font-bold text-cyan-200 font-Headers">
          Bet.ly
      </div>
      <div className="flex items-center space-x-4 xl:space-x-10 px-2 xl:mx-4">
        <div className="bg-neutral-400/50 font-semibold text-sm text-cyan-200 flex items-center px-4 py-1 mr-6 gap-5 rounded-md sm:text-base"><IoWalletSharp/><span className="text-cyan-50 font-Headers">{user.balance?.toFixed(2)}</span></div>
        <button className="text-2xl focus:outline-none text-cyan-200"><RxHamburgerMenu /></button>
      </div>
    </header>
  )
}

export default Navbar