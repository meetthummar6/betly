interface userSchema {
    username: string,
    email: string,
    balance: number
  }

interface matchSchema {
  date: string,
  isLive: boolean,
  matchId: string,
  name: string,
  status: string,
  teams: {
    team1: string,
    team2: string,
    team1Odds?: number,
    team2Odds?: number
  },
  time: string,
  venue: string,
  id: string
}

export { userSchema, matchSchema }