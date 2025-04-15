import { Link, router } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image, Dimensions, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import LoginScreen from './login';
import RegisterScreen from './register';

export default function LandingPage() {
  const { user, loading } = useAuth();
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, isSmallScreen && styles.containerMobile]}>
        {/* Left Half - Text and Buttons */}
        <View style={[styles.leftSection, isSmallScreen && styles.leftSectionMobile]}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Welcome to Finance Tracker</Text>
            <Text style={styles.subtitle}>Manage your finances with ease</Text>
          </View>
          
          <Image 
            source={require('../../assets/images/financeLogo.png')}
            style={[styles.imageLeft, isSmallScreen && styles.imageLeftMobile]}
            resizeMode="contain"
          />
          
          <View style={[styles.buttonRow, isSmallScreen && styles.buttonRowMobile]}>
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.loginButton, 
                activeForm === 'login' ? styles.activeButton : styles.inactiveButton
              ]}
              onPress={() => setActiveForm('login')}
            >
              <Text style={[
                styles.loginButtonText,
                activeForm === 'login' ? styles.activeButtonText : styles.inactiveButtonText
              ]}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.registerButton, 
                activeForm === 'register' ? styles.activeButton : styles.inactiveButton
              ]}
              onPress={() => setActiveForm('register')}
            >
              <Text style={[
                styles.registerButtonText,
                activeForm === 'register' ? styles.activeButtonText : styles.inactiveButtonText
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
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  containerMobile: {
    flexDirection: 'column',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f6ff',
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
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageLeft: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 320,
    marginVertical: 20,
  },
  imageLeftMobile: {
    width: '100%',
    height: 200,
    marginVertical: 10,
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
    borderColor: '#142e48',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#142e48',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#fff',
  },
  registerButtonText: {
    color: '#142e48',
    fontSize: 16,
    fontWeight: '600',
  },
  activeButton: {
    backgroundColor: '#142e48',
    borderWidth: 1,
    borderColor: '#142e48',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  activeButtonText: {
    color: '#fff',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#142e48',
  },
  inactiveButtonText: {
    color: '#142e48',
  },
});