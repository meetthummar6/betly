import { createFileRoute} from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import Api from "@/axios/Api";

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

    console.log(matches);
    const matchesToDisplay = matches.slice(0, 2);

    return (
        <div className="bg-[#1c1c1c] text-white">
            <div className="bg-cyan-200 bg-gradient-to-r from-cyan-200 to-slate-800 text-black text-center font-bold text-xl sm:text-2xl px-4 py-6 shadow-[0_0_12px_rgba(0,255,255,0.5)]">
                Welcome to the #1 IPL Betting Platform- Bet.ly . Bet Smart and Win Big
            </div>
            <Tabs defaultValue={tabs[0]} className="w-full shadow-[0_0_12px_rgba(0,255,255,0.5)] ">
                <TabsList className="grid w-full bg-black items-center text-white grid-cols-3 gap-1 rounded-none">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab} value={tab} className=" text-white text-md rounded-md font-medium data-[state=active]:font-semibold data-[state=active]:bg-cyan-200 data-[state=active]:text-black data-[state=active]:shadow data-[state=active]:shadow-cyan-200">{tab}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="Bets">
                    {matches.map((match: any) => ( <div>{match.name}</div>
                    ))}
                </TabsContent>
                <TabsContent value="Live">
                    {
                        matches[0]?.isLive ? <div>Live</div> : <div>Not Live</div>
                    }
                </TabsContent>
                <TabsContent value="Schedule">Schedule</TabsContent>
            </Tabs>
        </div>
    )
}

