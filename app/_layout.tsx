/**
 * Root layout: loads the app's fonts, holds the splash screen until they're
 * ready, then renders every route inside a headerless stack.
 */

import { Jost_300Light, Jost_400Regular } from '@expo-google-fonts/jost';
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '../theme';

// Keep the native splash up until the fonts are in. Called at module scope, not
// inside the component, as the Expo docs require.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Already hidden — nothing to do.
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Jost_300Light,
    Jost_400Regular,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    // Hide on error too, otherwise a font failure leaves the user on a frozen splash.
    if (fontsLoaded || fontError) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </SafeAreaProvider>
  );
}
