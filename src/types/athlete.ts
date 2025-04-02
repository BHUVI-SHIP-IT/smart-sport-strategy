
import { Athlete as MockAthlete } from '../services/databaseService';

// Supabase athlete structure
export interface SupabaseAthlete {
  id: string;
  user_id: string;
  name: string;
  sport: string;
  achievements?: string;
  bio?: string;
  image_url?: string;
  social_media?: any;
  created_at: string;
  updated_at: string;
}

// Extended athlete type with all required properties
export interface ExtendedAthlete extends SupabaseAthlete {
  age?: number;
  position?: string;
  team?: string;
  height?: number;
  weight?: number;
  profileImage?: string;
  contactInfo?: {
    email: string;
    phone?: string;
  };
  status?: 'active' | 'injured' | 'recovery' | 'off-season';
  injuryHistory?: any[];
  performanceStats?: {
    strengthScore?: number;
    speedScore?: number;
    enduranceScore?: number;
    agilityScore?: number;
    technicalScore?: number;
    tacticalScore?: number;
    mentalScore?: number;
    overallScore?: number;
    recentGames?: any[];
    seasonAverages?: Record<string, number>;
    historicalData?: {
      [key: string]: number[];
    };
    [key: string]: any;
  };
  career?: {
    startDate: string;
    currentContract?: any;
    previousContracts?: any[];
    achievements?: any[];
    sponsorships?: any[];
    careerEarnings?: number;
    marketValue?: number;
  };
  wearableData?: any[];
}

// Helper function to convert any athlete type to our extended format
export function normalizeAthlete(athlete: MockAthlete | SupabaseAthlete | any): ExtendedAthlete {
  if ('image_url' in athlete && !athlete.profileImage) {
    // This is a Supabase athlete
    return {
      ...athlete,
      profileImage: athlete.image_url,
      status: athlete.status || 'active',
      position: athlete.position || '',
      team: athlete.team || '',
      age: athlete.age || 0,
      performanceStats: athlete.performanceStats || {
        strengthScore: 75,
        speedScore: 75,
        enduranceScore: 75,
        agilityScore: 75,
        technicalScore: 75,
        tacticalScore: 75,
        mentalScore: 75,
        overallScore: 75,
      },
      contactInfo: athlete.contactInfo || {
        email: '',
      },
      career: athlete.career || {
        startDate: new Date().toISOString(),
      }
    };
  }
  
  // Just return the athlete as is if it's already in our mock format
  return athlete as ExtendedAthlete;
}
