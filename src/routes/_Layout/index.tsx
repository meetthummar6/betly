import { createFileRoute} from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import Api from "@/axios/Api";
import { matchSchema } from "@/types";
import BetCard from "@/components/BetCard";
import ScheduleCard from "@/components/ScheduleCard";

export const Route = createFileRoute('/_Layout/')({
    component: RouteComponent,
})

const tabs=[
    "Bets",
    "Live",
    "Schedule"
]

function RouteComponent() {
    const fetchMatches = async () => {
        const res = await Api.get('/matches/upcoming-matches');
        return res.data.data
    }

    const { 
        isLoading, 
        error, 
        data: matches 
      } = useQuery({
        queryKey: ['matches'],
        queryFn: fetchMatches,
        refetchInterval: 10000,
        refetchIntervalInBackground: true
    });
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const matchesToDisplay = matches.filter((match: matchSchema) => !match.isLive).slice(0, 2);


    return (
        <div className="bg-[#1c1c1c] text-white min-h-[94vh]">
            <div className="bg-cyan-200 bg-gradient-to-r from-cyan-200 to-slate-800 text-black text-center font-bold text-xl sm:text-2xl px-4 py-6 shadow-[0_0_12px_rgba(0,255,255,0.5)]">
                Welcome to the #1 IPL Betting Platform- Bet.ly . Bet Smart and Win Big
            </div>
            <Tabs defaultValue={tabs[0]} className="w-full shadow-[0_0_12px_rgba(0,255,255,0.5)] min-h-[94vh]">
                <TabsList className="grid w-full bg-black items-center text-white grid-cols-3 gap-1 rounded-none">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab} value={tab} className=" text-white text-md rounded-md font-medium data-[state=active]:font-semibold data-[state=active]:bg-cyan-200 data-[state=active]:text-black data-[state=active]:shadow data-[state=active]:shadow-cyan-200">{tab}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="Bets">
                    {matchesToDisplay.map((match: matchSchema) => ( <BetCard key={match.id} name={match.name.split(',')[0]} time={match.time} venue={match.venue} team1={match.teams.team1} team2={match.teams.team2} team1Odds={match.teams.team1Odds || 1.8} team2Odds={match.teams.team2Odds || 1.8}/>
                    ))}
                </TabsContent>
                <TabsContent value="Live">
                    {
                        matches[0]?.isLive ? (
                            <div className="relative">
                                <div className="absolute top-2 left-2 z-10">
                                    <span className="text-xs font-semibold bg-red-600 text-white rounded px-2 py-0.5 shadow-md">
                                        LIVE
                                    </span>
                                </div>
                                <div className="w-full mx-auto py-4">
                                    <ScheduleCard team1={matches[0].teams.team1} team2={matches[0].teams.team2} time={matches[0].time} venue={matches[0].venue}/>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full py-10 text-center text-zinc-400 font-medium text-sm">
                                No match is live at the moment
                            </div>
                        )
                    }
                </TabsContent>
                <TabsContent value="Schedule">
                    {matches.map((match: matchSchema) => ( <ScheduleCard key={match.id} team1={match.teams.team1} team2={match.teams.team2} time={match.time} venue={match.venue}/>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}

