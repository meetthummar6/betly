import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import HistoryCard from '@/components/HistoryCard'
import Api from '@/axios/Api'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/auth/AuthContext'
import { betSchema } from '@/types'

export const Route = createFileRoute('/_Layout/BetHistory')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')

  const { 
    isLoading, 
    error, 
    data: betHistory 
  } = useQuery({
    queryKey: ['betHistory'],
    queryFn: async () => {
      const res = await Api.get(`/bets/user/${user?._id}`);
      return res.data.data
    }
});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const filteredBets = betHistory.filter((bet:betSchema) => filter === 'all'? true : filter === "settled" ? bet.status === "Won" || bet.status === "Lost": bet.status === "Pending")
  return(
    <div className='max-w-3xl min-h-screen mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-6 text-cyan-200'>
        Bet History
      </h2>
      <div className='flex gap-2 mb-6'>
        {
          ["all","settled","Pending"].map((type) => (
            <Button key={type} variant={filter === type ? "default" : "outline"} className={`capitalize ${filter === type ? "bg-cyan-700 text-white" : "bg-transparent border-cyan-500 text-cyan-300"}`} onClick={() => setFilter(type)}>
              {type}
            </Button>
          ))
        }
      </div>

      <div className='grid gap-4'>
          {
            filteredBets.map((bet:betSchema) => {
              const payout = bet.status==="Won" ? bet.amount * bet.bet_odds : bet.status === "Lost" ? -bet.amount :bet.bet_odds * bet.amount;
              return (
                <div className={`rounded-xl border p-4 transition-all ${HistoryCard(bet.status)}`}>
                  <h3 className='text-lg font-bold text-white mb-1'>
                    {bet.matchId.name.split(",")[0]}
                  </h3>
                  <div className='text-sm text-cyan-100 space-y-1'>
                    <div>
                      <span className='font-semibold text-cyan-300'>
                        Your Pick:
                      </span>
                      {" "}
                      <span className='font-semibold text-white'>{bet.bet_team}</span>
                    </div>
                    <div>
                      <span className='font-semibold text-cyan-300'>
                        Odds:
                      </span>
                      {" "}
                      <span className='font-semibold text-white'>{bet.bet_odds}</span>
                    </div>
                    <div>
                      <span className='font-semibold text-cyan-300'>
                        Stake:
                      </span>
                      {" "}
                      <span className='font-semibold text-white'>{bet.amount}</span>
                    </div>
                    <div>
                      <span className='font-semibold text-cyan-300'>
                        {bet.status === "pending" ? "Potential Win:" : "Earned:"}
                      </span>
                      {" "}
                      <span className='font-semibold text-white'>{payout.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              )
            })
          }
          {
            filteredBets.length === 0 && (
              <div className='text-center text-white/50'>
                No Bets Found
              </div>
            )
          }
      </div>

    </div>
  )
}
