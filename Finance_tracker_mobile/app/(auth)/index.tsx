import { Link, router } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import LoginScreen from './login';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
    <View style={styles.container}>
      {/* Left Half - Text and Buttons */}
      <View style={styles.leftSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Finance Tracker</Text>
          <Text style={styles.subtitle}>Manage your finances with ease</Text>
        </View>
        
        <Image 
          source={require('../../assets/images/financeLogo.png')}
          style={styles.imageLeft}
          resizeMode="contain"
        />
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.loginButton]}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.registerButton]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Right Half - Image */}
      <View style={styles.rightSection}>
        <LoginScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
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
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: Dimensions.get('window').height -320,
    marginVertical: 20,
  },
  imageRight: {
    width: '80%',
    height: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    maxWidth: 140,
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
    borderWidth: 1,
    borderColor: '#142e48',
  },
  registerButtonText: {
    color: '#142e48',
    fontSize: 16,
    fontWeight: '600',
  },
});