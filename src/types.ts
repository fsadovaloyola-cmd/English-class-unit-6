export interface GrammarPoint {
  original: string;
  enhanced: string;
  point: string;
}

export interface HiringStep {
  id: number;
  title: string;
  description: string;
  enhancedPoints: string[];
  placeholder: string;
}

export interface UserProfile {
  roleName: string;
  steps: { [key: number]: string };
}

export interface ProfileChallenge {
  id: number;
  name: string;
  image: string;
  activeDescription: string;
  correctPassive: string;
  options: string[];
}

export interface WordPair {
  id: number;
  left: string;
  right: string;
}

export interface MemoryCard {
  id: number;
  content: string;
  pairId: number;
}
