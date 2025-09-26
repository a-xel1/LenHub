import { DarkTheme as NavDarkTheme, DefaultTheme as NavLightTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AquaBackground from '@/src/components/AquaBackground';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { onAuthChanged } from '@/src/services/auth';
import { ensureUserDocument } from '@/src/services/user';
import { router, useSegments } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const queryClient = new QueryClient();

  useEffect(() => {
    const sub = onAuthChanged((user) => {
      const inAuthGroup = segments[0] === 'auth';
      if (!user && !inAuthGroup) router.replace('/auth/sign-in');
      if (user && inAuthGroup) router.replace('/');
      if (user) ensureUserDocument(user).catch(() => {});
    });
    return sub;
  }, [segments]);

  const Light = { ...NavLightTheme, colors: { ...NavLightTheme.colors, background: '#E6E6E6', card: '#FFFFFF' } } as const;
  const Dark = { ...NavDarkTheme, colors: { ...NavDarkTheme.colors, background: '#E6E6E6', card: '#FFFFFF' } } as const;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? Dark : Light}>
        <AquaBackground>
          <Stack screenOptions={{ contentStyle: { backgroundColor: '#E6E6E6' } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="followers" options={{ presentation: 'modal', title: 'Followers' }} />
            <Stack.Screen name="notifications" options={{ presentation: 'modal', title: 'Notifications' }} />
            <Stack.Screen name="assignments" options={{ presentation: 'modal', title: 'Assignments' }} />
            <Stack.Screen name="announcements" options={{ presentation: 'modal', title: 'Announcements' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
            <Stack.Screen name="auth/verify" options={{ headerShown: false }} />
          </Stack>
        </AquaBackground>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
