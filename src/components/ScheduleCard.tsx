
const ScheduleCard = ({team1,team2,time,venue}: {team1: string,team2: string,time: string,venue: string}) => {
    const teamColors:Record<string,string> = {
        "Mumbai Indians":"#2563eb",
        "Chennai Super Kings":"#eab308",
        "Royal Challengers Bengaluru":"#b91c1c",
        "Kolkata Knight Riders":"#6d28d9",
        "Delhi Capitals":"#1e40af",
        "Sunrisers Hyderabad":"#f97316",
        "Punjab Kings":"#991b1b",
        "Rajasthan Royals":"#d946ef",
        "Lucknow Super Giants":"#0e7490",
        "Gujarat Titans":"#1b2133",
    }
    const date = new Date(time+'Z').toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
    return (
    <div className={`relative max-w-md mx-2 rounded-xl p-4 text-white overflow-hidden mt-6 mb-2 sm:mx-auto ring-2 ring-cyan-200/60`} style={{background: `linear-gradient(to right, ${teamColors[team1]}, black, ${teamColors[team2]})`}}>
      <div className='flex items-center justify-between mb-3'>
        <span className='text-white text-base font-medium truncate w-[36%]'>{team1}</span>
        <span className='text-cyan-200 font-semibold w-[18%] text-center text-sm'>VS</span>
        <span className='text-white text-base font-medium truncate w-[36%] text-right'>{team2}</span>
      </div>
      <div className='text-sm text-cyan-100/90 mb-1'>
        Stats at: <span className='font-normal'>{date}</span>
      </div>
      <div className='text-sm text-cyan-100/90'>
        Venue: <span className='font-normal'>{venue}</span>
      </div>
    </div>
  )
}

export default ScheduleCard
