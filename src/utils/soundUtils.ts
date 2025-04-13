
import { toast } from '@/components/ui/sonner';

// Possible sound types that can be detected
export type SoundType = 
  | 'doorbell' 
  | 'alarm' 
  | 'phone'
  | 'appliance'
  | 'vehicle'
  | 'person';

// Environment profiles for context-aware detection
export type EnvironmentProfile = 'home' | 'office' | 'street';

// Information about a detected sound
export interface DetectedSound {
  id: string;
  type: SoundType;
  timestamp: Date;
  intensity: number; // 0-100
  confidence: number; // 0-100
  environment: EnvironmentProfile;
}

// Map of environment profiles to likely sounds in those environments
const environmentSounds: Record<EnvironmentProfile, SoundType[]> = {
  home: ['doorbell', 'alarm', 'phone', 'appliance'],
  office: ['phone', 'alarm', 'person'],
  street: ['vehicle', 'person', 'alarm']
};

// Function to generate a random sound detection for demo purposes
export const simulateDetection = (environment: EnvironmentProfile): DetectedSound => {
  const possibleSounds = environmentSounds[environment];
  const randomType = possibleSounds[Math.floor(Math.random() * possibleSounds.length)];
  
  const detection: DetectedSound = {
    id: Date.now().toString(),
    type: randomType,
    timestamp: new Date(),
    intensity: Math.floor(Math.random() * 80) + 20, // 20-100
    confidence: Math.floor(Math.random() * 40) + 60, // 60-100
    environment
  };
  
  return detection;
};

// Function to get a human-readable description of a sound type
export const getSoundDescription = (type: SoundType): string => {
  switch(type) {
    case 'doorbell': return 'Doorbell Ringing';
    case 'alarm': return 'Alarm Sounding';
    case 'phone': return 'Phone Ringing';
    case 'appliance': return 'Appliance Beeping';
    case 'vehicle': return 'Vehicle Horn';
    case 'person': return 'Person Calling';
    default: return 'Unknown Sound';
  }
};

// Simulate vibration if supported
export const triggerVibration = (duration: number = 200): void => {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (error) {
      console.warn('Vibration API not supported or permission denied');
    }
  }
};

// Show a notification alert for a detected sound
export const showSoundAlert = (sound: DetectedSound, enableVibration: boolean = true): void => {
  const description = getSoundDescription(sound.type);
  
  // Show toast notification
  toast(description, {
    description: `Detected with ${sound.confidence}% confidence`,
  });
  
  // Trigger vibration if enabled
  if (enableVibration) {
    triggerVibration(500);
  }
  
  // Log the detection for debugging
  console.log('Sound detected:', sound);
};
