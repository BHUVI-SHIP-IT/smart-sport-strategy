
import { toast } from "sonner";

// Type definitions for our database entities
export interface Athlete {
  id: string;
  name: string;
  age: number;
  sport: string;
  team?: string;
  position?: string;
  height?: number; // in cm
  weight?: number; // in kg
  profileImage?: string;
  contactInfo: {
    email: string;
    phone?: string;
  };
  status: 'active' | 'injured' | 'recovery' | 'off-season';
  injuryHistory?: Injury[];
  performanceStats: PerformanceStats;
  career: CareerInfo;
  wearableData?: WearableData[];
}

export interface Injury {
  id: string;
  type: string;
  bodyPart: string;
  severity: 'minor' | 'moderate' | 'major';
  date: string; // ISO date string
  recoveryTimeInDays: number;
  rehabilitationPlan?: string;
  status: 'active' | 'recovered';
  notes?: string;
}

export interface PerformanceStats {
  strengthScore?: number; // 0-100
  speedScore?: number; // 0-100
  enduranceScore?: number; // 0-100
  agilityScore?: number; // 0-100
  technicalScore?: number; // 0-100
  tacticalScore?: number; // 0-100
  mentalScore?: number; // 0-100
  overallScore?: number; // 0-100
  recentGames?: GamePerformance[];
  seasonAverages?: Record<string, number>;
  historicalData?: {
    [key: string]: number[];
  };
}

export interface GamePerformance {
  id: string;
  date: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  stats: Record<string, number>;
  highlights?: string[];
  notes?: string;
}

export interface CareerInfo {
  startDate: string;
  currentContract?: Contract;
  previousContracts?: Contract[];
  achievements?: Achievement[];
  sponsorships?: Sponsorship[];
  careerEarnings?: number; // in USD
  marketValue?: number; // in USD
}

export interface Contract {
  id: string;
  team: string;
  startDate: string;
  endDate: string;
  value: number; // in USD
  bonuses?: {
    type: string;
    value: number;
    condition: string;
  }[];
  status: 'active' | 'expired' | 'terminated';
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface Sponsorship {
  id: string;
  company: string;
  startDate: string;
  endDate?: string;
  value: number; // in USD
  requirements?: string[];
  status: 'active' | 'expired' | 'negotiating';
}

export interface WearableData {
  date: string;
  heartRate: number[]; // Array of heart rates throughout the day
  sleepHours: number;
  sleepQuality: number; // 0-100
  stepsCount: number;
  distance: number; // in km
  caloriesBurned: number;
  trainingLoad: number; // 0-100
  fatigueLevel: number; // 0-100
  readinessScore: number; // 0-100
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  specialization?: string;
  athletes?: string[]; // Array of athlete IDs
  teams?: string[]; // Array of team IDs
}

export interface Team {
  id: string;
  name: string;
  sport: string;
  league?: string;
  athletes?: string[]; // Array of athlete IDs
  coaches?: string[]; // Array of coach IDs
  schedule?: Event[];
}

export interface Event {
  id: string;
  title: string;
  type: 'game' | 'training' | 'medical' | 'team-meeting' | 'media' | 'other';
  startDate: string;
  endDate: string;
  location?: string;
  description?: string;
  attendees?: string[]; // Array of athlete/coach IDs
}

// Mock database class
export class DatabaseService {
  private athletes: Athlete[] = [];
  private coaches: Coach[] = [];
  private teams: Team[] = [];
  private events: Event[] = [];
  private isInitialized = false;

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    if (this.isInitialized) return;
    
    // Create mock athletes
    this.athletes = [
      {
        id: "a1",
        name: "Michael Jordan",
        age: 28,
        sport: "Basketball",
        team: "Chicago Bulls",
        position: "Shooting Guard",
        height: 198,
        weight: 98,
        profileImage: "https://via.placeholder.com/150",
        contactInfo: {
          email: "mjordan@example.com",
          phone: "+1234567890"
        },
        status: "active",
        performanceStats: {
          strengthScore: 88,
          speedScore: 95,
          enduranceScore: 90,
          agilityScore: 92,
          technicalScore: 96,
          tacticalScore: 94,
          mentalScore: 98,
          overallScore: 94,
          historicalData: {
            pointsPerGame: [28.2, 30.1, 32.5, 33.6, 31.5, 29.8],
            assistsPerGame: [5.9, 6.1, 6.3, 5.5, 5.8, 6.0],
            reboundsPerGame: [6.2, 6.4, 6.6, 6.7, 6.5, 6.3]
          },
          seasonAverages: {
            pointsPerGame: 32.5,
            assistsPerGame: 6.0,
            reboundsPerGame: 6.6,
            stealsPerGame: 2.3,
            blocksPerGame: 1.1,
            fieldGoalPercentage: 52.5,
            threePointPercentage: 38.2,
            freeThrowPercentage: 85.7
          },
          recentGames: [
            {
              id: "g1",
              date: "2023-05-15",
              opponent: "New York Knicks",
              result: "win",
              stats: {
                points: 35,
                assists: 7,
                rebounds: 8,
                steals: 3,
                blocks: 1,
                turnovers: 2,
                minutesPlayed: 38
              }
            },
            {
              id: "g2",
              date: "2023-05-18",
              opponent: "Miami Heat",
              result: "loss",
              stats: {
                points: 29,
                assists: 5,
                rebounds: 6,
                steals: 2,
                blocks: 0,
                turnovers: 3,
                minutesPlayed: 36
              }
            },
            {
              id: "g3",
              date: "2023-05-20",
              opponent: "Boston Celtics",
              result: "win",
              stats: {
                points: 42,
                assists: 8,
                rebounds: 7,
                steals: 4,
                blocks: 2,
                turnovers: 1,
                minutesPlayed: 40
              }
            }
          ]
        },
        career: {
          startDate: "2015-10-28",
          currentContract: {
            id: "c1",
            team: "Chicago Bulls",
            startDate: "2021-07-01",
            endDate: "2025-06-30",
            value: 35000000,
            status: "active"
          },
          achievements: [
            {
              id: "ach1",
              title: "All-Star",
              date: "2022-02-20",
              description: "8th consecutive All-Star selection"
            },
            {
              id: "ach2",
              title: "Scoring Champion",
              date: "2022-06-15",
              description: "Led the league in scoring with 31.5 PPG"
            }
          ],
          sponsorships: [
            {
              id: "sp1",
              company: "Nike",
              startDate: "2016-05-01",
              value: 12000000,
              status: "active"
            },
            {
              id: "sp2",
              company: "Gatorade",
              startDate: "2018-01-15",
              endDate: "2023-01-14",
              value: 4000000,
              status: "active"
            }
          ],
          careerEarnings: 115000000,
          marketValue: 75000000
        },
        wearableData: [
          {
            date: "2023-05-20",
            heartRate: [65, 72, 78, 150, 165, 175, 168, 155, 140, 75, 68],
            sleepHours: 7.5,
            sleepQuality: 82,
            stepsCount: 12500,
            distance: 8.2,
            caloriesBurned: 3200,
            trainingLoad: 85,
            fatigueLevel: 35,
            readinessScore: 88
          },
          {
            date: "2023-05-21",
            heartRate: [62, 70, 75, 145, 160, 170, 165, 150, 135, 72, 65],
            sleepHours: 8.2,
            sleepQuality: 88,
            stepsCount: 9500,
            distance: 6.8,
            caloriesBurned: 2800,
            trainingLoad: 65,
            fatigueLevel: 40,
            readinessScore: 82
          }
        ]
      },
      {
        id: "a2",
        name: "Serena Williams",
        age: 30,
        sport: "Tennis",
        height: 175,
        weight: 72,
        profileImage: "https://via.placeholder.com/150",
        contactInfo: {
          email: "swilliams@example.com"
        },
        status: "recovery",
        injuryHistory: [
          {
            id: "i1",
            type: "Strain",
            bodyPart: "Hamstring",
            severity: "moderate",
            date: "2023-04-10",
            recoveryTimeInDays: 21,
            status: "recovered",
            notes: "Complete recovery, no lingering issues"
          }
        ],
        performanceStats: {
          strengthScore: 85,
          speedScore: 92,
          enduranceScore: 88,
          agilityScore: 90,
          technicalScore: 95,
          tacticalScore: 93,
          mentalScore: 96,
          overallScore: 91,
          historicalData: {
            aces: [245, 310, 298, 332, 356],
            winRate: [0.78, 0.82, 0.85, 0.86, 0.83]
          },
          seasonAverages: {
            winRate: 0.85,
            acesPerMatch: 8.2,
            firstServePercentage: 65.8,
            secondServePointsWon: 58.2,
            breakPointsSaved: 72.3,
            returnPointsWon: 45.7
          }
        },
        career: {
          startDate: "2013-01-15",
          achievements: [
            {
              id: "ach1",
              title: "Grand Slam Champion",
              date: "2022-09-10",
              description: "US Open Singles Champion"
            }
          ],
          sponsorships: [
            {
              id: "sp1",
              company: "Wilson",
              startDate: "2015-03-01",
              value: 5000000,
              status: "active"
            }
          ],
          careerEarnings: 85000000,
          marketValue: 45000000
        }
      },
      {
        id: "a3",
        name: "Cristiano Ronaldo",
        age: 32,
        sport: "Soccer",
        team: "Manchester United",
        position: "Forward",
        height: 187,
        weight: 84,
        profileImage: "https://via.placeholder.com/150",
        contactInfo: {
          email: "cronaldo@example.com",
          phone: "+3987654321"
        },
        status: "active",
        performanceStats: {
          strengthScore: 89,
          speedScore: 94,
          enduranceScore: 92,
          agilityScore: 90,
          technicalScore: 95,
          tacticalScore: 91,
          mentalScore: 93,
          overallScore: 92,
          historicalData: {
            goals: [28, 31, 35, 42, 38, 40],
            assists: [12, 14, 11, 15, 16, 14]
          },
          seasonAverages: {
            goalsPerGame: 0.85,
            assistsPerGame: 0.35,
            shotsPerGame: 5.2,
            passAccuracy: 88.5,
            dribbleSuccess: 65.3,
            aerialDuelsWon: 78.2
          }
        },
        career: {
          startDate: "2010-08-15",
          currentContract: {
            id: "c1",
            team: "Manchester United",
            startDate: "2022-07-01",
            endDate: "2024-06-30",
            value: 28000000,
            status: "active"
          },
          achievements: [
            {
              id: "ach1",
              title: "Ballon d'Or",
              date: "2022-12-05",
              description: "World's best player award"
            }
          ],
          sponsorships: [
            {
              id: "sp1",
              company: "Nike",
              startDate: "2014-01-01",
              value: 20000000,
              status: "active"
            },
            {
              id: "sp2",
              company: "Clear Shampoo",
              startDate: "2018-05-15",
              endDate: "2024-05-14",
              value: 7000000,
              status: "active"
            }
          ],
          careerEarnings: 165000000,
          marketValue: 90000000
        }
      }
    ];

    // Create mock coaches
    this.coaches = [
      {
        id: "c1",
        name: "Phil Jackson",
        role: "Head Coach",
        specialization: "Team Strategy",
        athletes: ["a1"],
      },
      {
        id: "c2",
        name: "Patrick Mouratoglou",
        role: "Personal Coach",
        specialization: "Technical Training",
        athletes: ["a2"],
      },
      {
        id: "c3",
        name: "Erik ten Hag",
        role: "Head Coach",
        specialization: "Tactical Development",
        athletes: ["a3"],
      }
    ];

    // Create mock teams
    this.teams = [
      {
        id: "t1",
        name: "Chicago Bulls",
        sport: "Basketball",
        league: "NBA",
        athletes: ["a1"],
        coaches: ["c1"]
      },
      {
        id: "t2",
        name: "Manchester United",
        sport: "Soccer",
        league: "Premier League",
        athletes: ["a3"],
        coaches: ["c3"]
      }
    ];

    // Create mock events
    this.events = [
      {
        id: "e1",
        title: "Chicago Bulls vs LA Lakers",
        type: "game",
        startDate: "2023-06-15T19:00:00Z",
        endDate: "2023-06-15T22:00:00Z",
        location: "United Center, Chicago",
        attendees: ["a1", "c1"]
      },
      {
        id: "e2",
        title: "Wimbledon Quarter-finals",
        type: "game",
        startDate: "2023-07-05T14:00:00Z",
        endDate: "2023-07-05T17:00:00Z",
        location: "All England Club, London",
        attendees: ["a2", "c2"]
      },
      {
        id: "e3",
        title: "Manchester United vs Manchester City",
        type: "game",
        startDate: "2023-06-10T15:00:00Z",
        endDate: "2023-06-10T17:00:00Z",
        location: "Old Trafford, Manchester",
        attendees: ["a3", "c3"]
      },
      {
        id: "e4",
        title: "Physical Therapy Session",
        type: "medical",
        startDate: "2023-05-25T10:00:00Z",
        endDate: "2023-05-25T11:30:00Z",
        location: "Sports Medicine Center",
        attendees: ["a2"]
      },
      {
        id: "e5",
        title: "Team Strategy Meeting",
        type: "team-meeting",
        startDate: "2023-06-08T09:00:00Z",
        endDate: "2023-06-08T11:00:00Z",
        location: "Training Facility",
        attendees: ["a1", "c1"]
      }
    ];

    this.isInitialized = true;
  }

  // Athlete methods
  async getAthletes(): Promise<Athlete[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.athletes]), 300);
    });
  }

  async getAthleteById(id: string): Promise<Athlete | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const athlete = this.athletes.find(a => a.id === id) || null;
        resolve(athlete ? {...athlete} : null);
      }, 200);
    });
  }

  async updateAthlete(athlete: Athlete): Promise<Athlete> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.athletes.findIndex(a => a.id === athlete.id);
        if (index === -1) {
          reject(new Error("Athlete not found"));
          return;
        }
        
        this.athletes[index] = {...athlete};
        resolve({...this.athletes[index]});
        toast.success("Athlete data updated successfully");
      }, 400);
    });
  }

  async createAthlete(athlete: Omit<Athlete, "id">): Promise<Athlete> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAthlete = {
          ...athlete,
          id: `a${this.athletes.length + 1}`
        };
        this.athletes.push(newAthlete);
        resolve({...newAthlete});
        toast.success("New athlete added successfully");
      }, 400);
    });
  }

  // Coach methods
  async getCoaches(): Promise<Coach[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.coaches]), 300);
    });
  }

  async getCoachById(id: string): Promise<Coach | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const coach = this.coaches.find(c => c.id === id) || null;
        resolve(coach ? {...coach} : null);
      }, 200);
    });
  }

  // Team methods
  async getTeams(): Promise<Team[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.teams]), 300);
    });
  }

  async getTeamById(id: string): Promise<Team | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const team = this.teams.find(t => t.id === id) || null;
        resolve(team ? {...team} : null);
      }, 200);
    });
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.events]), 300);
    });
  }

  async getEventsByAthleteId(athleteId: string): Promise<Event[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const athleteEvents = this.events.filter(e => e.attendees?.includes(athleteId));
        resolve([...athleteEvents]);
      }, 300);
    });
  }

  // Performance analysis methods
  async getAthletePerformanceTrend(athleteId: string, metric: string, period: string): Promise<{dates: string[], values: number[]}> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const athlete = this.athletes.find(a => a.id === athleteId);
        if (!athlete || !athlete.performanceStats.historicalData) {
          resolve({dates: [], values: []});
          return;
        }

        // Generate mock trend data
        const dates = [];
        const values = athlete.performanceStats.historicalData[metric] || [];
        
        // Generate dates for the values
        const today = new Date();
        for (let i = values.length - 1; i >= 0; i--) {
          const date = new Date();
          date.setMonth(today.getMonth() - i);
          dates.unshift(date.toISOString().split('T')[0]);
        }
        
        resolve({dates, values});
      }, 400);
    });
  }
}

// Create a singleton instance
export const databaseService = new DatabaseService();
