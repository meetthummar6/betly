
const HistoryCard = (status: string) => {
    switch(status){
        case 'won':
            return "bg-green-900/40 border-green-400 shadow-[0_0_10px_#22c55e80]";
        case 'lost':
            return "bg-red-900/40 border-red-400 shadow-[0_0_10px_#f8717180]";
        default:
            return "bg-cyan-900/40 border-cyan-400 shadow-[0_0_10px_#22d3ee80]";
    }
}

export default HistoryCard
