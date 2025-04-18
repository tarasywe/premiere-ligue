declare module '@env' {
  export const EXPO_PUBLIC_API_URL: string;
  export const EXPO_PUBLIC_API_KEY: string;
  export const RAPID_HOST: string;
}

// Extend ProcessEnv interface
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_API_KEY: string;
      RAPID_HOST: string;
    }
  }
} 