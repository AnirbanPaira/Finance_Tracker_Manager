import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    button: {
      primary: string;
      secondary: string;
      text: string;
    };
  };
}

const lightColors = {
  primary: '#142e48',
  background: '#fff',
  card: '#e3f6ff',
  text: '#000',
  border: '#142e48',
  button: {
    primary: '#142e48',
    secondary: '#fff',
    text: '#fff',
  },
};

const darkColors = {
  primary: '#1a73e8',
  background: '#121212',
  card: '#1e1e1e',
  text: '#fff',
  border: '#1a73e8',
  button: {
    primary: '#1a73e8',
    secondary: '#1e1e1e',
    text: '#fff',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme as ThemeType);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 