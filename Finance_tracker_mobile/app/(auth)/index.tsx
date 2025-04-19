import { Link, router } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image, Dimensions, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import LoginScreen from './login';
import RegisterScreen from './register';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const { theme, toggleTheme, colors } = useTheme();
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const isSmallScreen = windowWidth < 768;

  useEffect(() => {
    if (user && !loading) {
      router.replace('/(tabs)');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, isSmallScreen && styles.containerMobile, { backgroundColor: colors.background }]}>
        {/* Theme Toggle Button */}
        <TouchableOpacity 
          style={[styles.themeToggle, { backgroundColor: colors.card }]}
          onPress={toggleTheme}
        >
          <Ionicons 
            name={theme === 'light' ? 'moon-outline' : 'sunny-outline'} 
            size={24} 
            color={colors.text} 
          />
        </TouchableOpacity>

        {/* Left Half - Text and Buttons */}
        <View style={[styles.leftSection, isSmallScreen && styles.leftSectionMobile, { backgroundColor: colors.card }]}>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Welcome to Finance Tracker</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Manage your finances with ease</Text>
          </View>
          
          <Image 
            source={theme === 'dark' 
              ? require('../../assets/images/financeTracker.png')
              : require('../../assets/images/financeLogo.png')}
            style={[styles.imageLeft, isSmallScreen && styles.imageLeftMobile]}
            resizeMode="contain"
          />
          
          <View style={[styles.buttonRow, isSmallScreen && styles.buttonRowMobile]}>
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.loginButton, 
                activeForm === 'login' ? styles.activeButton : styles.inactiveButton,
                { 
                  backgroundColor: activeForm === 'login' ? colors.button.primary : colors.button.secondary,
                  borderColor: colors.border
                }
              ]}
              onPress={() => setActiveForm('login')}
            >
              <Text style={[
                styles.loginButtonText,
                { color: activeForm === 'login' ? colors.button.text : colors.text }
              ]}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.registerButton, 
                activeForm === 'register' ? styles.activeButton : styles.inactiveButton,
                { 
                  backgroundColor: activeForm === 'register' ? colors.button.primary : colors.button.secondary,
                  borderColor: colors.border
                }
              ]}
              onPress={() => setActiveForm('register')}
            >
              <Text style={[
                styles.registerButtonText,
                { color: activeForm === 'register' ? colors.button.text : colors.text }
              ]}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Right Half - Form */}
        <View style={[styles.rightSection, isSmallScreen && styles.rightSectionMobile]}>
          {activeForm === 'login' ? (
            <LoginScreen onSwitchToRegister={() => setActiveForm('register')} />
          ) : (
            <RegisterScreen onSwitchToLogin={() => setActiveForm('login')} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: '100%',
  },
  containerMobile: {
    flexDirection: 'column',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  leftSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftSectionMobile: {
    width: '100%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingVertical: 30,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSectionMobile: {
    width: '100%',
    paddingVertical: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  imageLeft: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 360,
    marginVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    transform: [{ translateY: -4 }],
  },
  imageLeftMobile: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ translateY: -2 }],
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  buttonRowMobile: {
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    maxWidth: 140,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButton: {},
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {},
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inactiveButton: {},
});