import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../hooks/useAuth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}
