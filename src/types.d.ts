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
  _id: string
}

interface betSchema {
  bet_team: string,
  matchId: {
    _id: string,
    name: string
  },
  bet_odds: number,
  userId: string,
  _id: string,
  status: string,
  amount: number,
}

export { userSchema, matchSchema, betSchema }