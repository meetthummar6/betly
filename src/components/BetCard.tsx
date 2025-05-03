import React from 'react'
import { Link } from '@tanstack/react-router'

const BetCard = ({name,time,venue,team1,team2,team1Odds,team2Odds}: {name: string,time: string,venue: string,team1: string,team2: string,team1Odds: number,team2Odds: number}) => {
    const date = new Date(time+'Z').toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
  return (
    <div className='bg-[#121212] border border-cyan-200/20 rounded-2xl shadow-[0_0_20px_#00ffff33] p-4 w-full max-w-lg mx-auto mb-6'>
        <div className='flex items-center justify-between mb-2'>
            <h2 className='text-cyan-200 font-semibold text-lg'>
                {name}
            </h2>
            <span className='text-xs text-white/70 ml-1'>
                {date}
            </span>
        </div>
        <p className='text-sm text-white/60 mb-4'>
            {venue}
        </p>
        <div className='grid grid-cols-2 gap-4'>
            <Link to='/betslip?id=1' className='group bg-[#1a1a1a] hover:bg-[#1f1f1f] rounded-xl p-3 shadow-[0_0_10px_#00ffff33] hover:shadow-[0_0_20px_#00ffff66] tramsform hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer'>
                <div className='text-white font-medium text-center'>
                    {team1}
                </div>
                <div className='text-cyan-200 text-lg text-center mt-1'>
                    {team1Odds}
                </div>
            </Link>
            <Link to='/betslip?id=2' className='bg-[#1a1a1a] hover:bg-[#1f1f1f] rounded-xl p-3 shadow-[0_0_10px_#00ffff33] hover:shadow-[0_0_20px_#00ffff66] transform hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer'>
                <div className='text-white font-medium text-center'>
                    {team2} 
                </div>
                <div className='text-cyan-200 text-lg text-center mt-1'>
                    {team2Odds}
                </div>
            </Link>
        </div>
    </div>
  )
}

export default BetCard
