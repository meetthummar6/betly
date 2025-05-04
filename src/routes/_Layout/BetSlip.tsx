import { createFileRoute,useSearch} from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '@/auth/AuthContext'
import Api from '@/axios/Api'

export const Route = createFileRoute('/_Layout/BetSlip')({
    validateSearch: (search) => search.from === '/_Layout/BetSlip',
  component: RouteComponent,
})

function RouteComponent() {
    const {user}=useAuth();
    const {id,choice,match,teamOdds}=useSearch({from:'/_Layout/BetSlip'});
    const [stake,setStake]=useState(0);
    const potentialReturn=(stake*teamOdds).toFixed(2);
  return <div className='min-h-screen bg-[#0a0a0a] text-white px-4 py-6'>
    <div className=' bg-[#121212] max-w-md mx-auto border border-cyan-200/20 rounded-2xl shadow-[0_0_10px_#00ffff44] ring-1 ring-cyan-200/20 p-6 space-y-6'>
        <h2 className='text-2xl font-bold text-cyan-200 font-Headers'>
             Your BetSlip
        </h2>
        <div className='bg-[#1a1a1a] rounded-xl p-4 text-white/70 overflow-hidden font-semibold'>
            {match}
        </div>
        <div className='text-lg font-bold text-cyan-200 mb-2'>
            {choice}
        </div>
        <div className='text-white/70 text-sm'>
            Odds: <span className='font-semibold text-cyan-200 text-sm'>{teamOdds}</span>
        </div>
        <div className='space-y-2'>
            <Input placeholder='Stake' onChange={(e)=>setStake(Number(e.target.value))} className='bg-[#111] text-white border border-cyan-200/30 focus:ring-2 focus:ring-cyan-200' type='number' />
        </div>
        <div className='flex items-center justify-between bg-[#1a1a1a] rounded-xl p-4 text-sm'>
                <div className='text-cyan-200 text-sm font-semibold'>
                    Potential Return: {potentialReturn}
                </div>
        </div>
        <Button className='w-full bg-cyan-200 text-black hover:bg-cyan-100 transition-all shadow-[0_0_10px_#00ffff44] hover:shadow-[0_0_20px_#00ffff66]' onClick={async() => {
            if (!choice || !match || !teamOdds || !stake || !user) return toast.error('Please fill all fields');
            if(stake<=0) return toast.error('Invalid Stake');
            if(user?.balance && stake>user?.balance) return toast.error('Insufficient Balance');
            await Api.post('/bets', {matchId:id,bet_team:choice,bet_odds:teamOdds,amount:stake,userId:user?._id}).then((res) => {
                toast.success(res.data.message);
                setStake(0);
                window.location.href='/';
            }).catch((err) => toast.error(err.response.data.message));
        }}>Place Bet</Button>
    </div>
  </div>
}
