import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const loggedIn = !!token;
      setIsLoggedIn(loggedIn);
      return loggedIn;
    } catch (error) {
      setIsLoggedIn(false);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await checkLoginStatus();
      setIsReady(true);
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthScreen = segments[0] === 'login';

    if (!isLoggedIn && !inAuthScreen) {
      router.replace('/login');
    }

    if (isLoggedIn && inAuthScreen) {
      router.replace('/(tabs)/dashboard');
    }
  }, [isReady, isLoggedIn, segments]);


  useEffect(() => {
    if (isReady) {
      checkLoginStatus();
    }
  }, [segments, isReady]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}