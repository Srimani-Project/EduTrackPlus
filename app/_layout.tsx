


//app/_layout.tsx
//working login and logout..page perfectly
import 'react-native-reanimated'; // 👈 MUST be first!
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  // Check if user has a token stored
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const loggedIn = !!token;
      setIsLoggedIn(loggedIn);
      return loggedIn;
    } catch (error) {
      console.error('Error reading login status:', error);
      setIsLoggedIn(false);
      return false;
    }
  };

  // First-time initialization
  useEffect(() => {
    const initializeAuth = async () => {
      await checkLoginStatus();
      setIsReady(true);
    };
    initializeAuth();
  }, []);

  // Handle redirection logic
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

  // Recheck login if path changes
  useEffect(() => {
    if (isReady) {
      checkLoginStatus();
    }
  }, [segments, isReady]);

  // Show loader until app is ready
  if (!isReady) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </GestureHandlerRootView>
    );
  }

  // ✅ Your BottomSheet and other components will work fine with this
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}



