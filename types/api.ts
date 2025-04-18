export interface SquadPlayer {
  id: number;
  name: string;
  age: number;
  number: number;
  position: string;
  photo: string;
}

export interface SquadResponse {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  players: SquadPlayer[];
}

export interface Team {
  team: {
    id: number;
    name: string;
    code: string | null;
    country: string;
    founded: number | null;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number | null;
    name: string | null;
    address: string | null;
    city: string | null;
    capacity: number | null;
    surface: string | null;
    image: string | null;
  };
}

export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    league: {
      id: number;
      name: string;
      country: string;
      logo: string;
      season: number;
    };
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      position: string;
      rating?: string;
      captain: boolean;
    };
    goals: {
      total: number;
      assists: number;
    };
  }>;
}

export interface SearchHistory {
  query: string;
  timestamp: number;
}

export interface ApiResponse<T> {
  get: string;
  parameters: Record<string, any>;
  errors: string[];
  paging: {
    current: number;
    total: number;
  };
  results: number;
  response: T;
}