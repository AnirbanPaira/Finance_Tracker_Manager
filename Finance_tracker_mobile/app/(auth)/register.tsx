import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

interface GoogleUser {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  photo: string;
}

interface GoogleSignInResponse {
  user: GoogleUser;
  idToken: string;
  serverAuthCode: string;
}

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
}

export default function RegisterScreen({ onSwitchToLogin }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { colors } = useTheme();

  const { register } = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your web client ID from Google Cloud Console
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      await GoogleSignin.hasPlayServices();
      const result = (await GoogleSignin.signIn() as unknown) as GoogleSignInResponse;
      
      if (result && result.user) {
        // Here you can handle the user info and register the user
        // You might want to send this to your backend
        console.log('Google Sign-In successful:', result);
        
        // Call your register function with Google user info
        await register(
          result.user.givenName || result.user.name || '',
          result.user.email,
          'google-oauth'
        );
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Sign in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Play services not available');
      } else {
        setError(error.message || 'Google Sign-In failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await register(name, email, password);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Sign up to get started</Text>
      </View>

      <View style={styles.form}>
        {error ? (
          <Text style={[styles.errorText, { 
            color: '#dc3545',
            backgroundColor: '#f8d7da'
          }]}>{error}</Text>
        ) : null}

        <View style={[styles.inputContainer, { 
          borderColor: colors.border,
          backgroundColor: colors.card
        }]}>
          <Ionicons name="person-outline" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Full Name"
            placeholderTextColor={colors.text + '80'}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={[styles.inputContainer, { 
          borderColor: colors.border,
          backgroundColor: colors.card
        }]}>
          <Ionicons name="mail-outline" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Email"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={[styles.inputContainer, { 
          borderColor: colors.border,
          backgroundColor: colors.card
        }]}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.text} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.text + '80'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button.primary }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.button.text} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.button.text }]}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.text }]}>OR</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>

        <TouchableOpacity
          style={[styles.googleButton, { backgroundColor: colors.card }]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <Ionicons name="logo-google" size={20} color={colors.text} style={styles.googleIcon} />
          <Text style={[styles.googleButtonText, { color: colors.text }]}>Sign up with Google</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.text }]}>Already have an account? </Text>
          <TouchableOpacity onPress={onSwitchToLogin}>
            <Text style={[styles.loginLink, { color: colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {},
  loginLink: {
    fontWeight: 'bold',
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 