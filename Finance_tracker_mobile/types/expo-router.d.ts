import { RelativePathString, ExternalPathString } from 'expo-router/build/typed-routes';

declare module 'expo-router' {
  export type RoutePath = 
    | RelativePathString
    | ExternalPathString
    | '/(auth)/login'
    | '/(auth)/register'
    | '/(tabs)'
    | '/_sitemap'
    | `/_sitemap?${string}`
    | `/_sitemap#${string}`;
} 