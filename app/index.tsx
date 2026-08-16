/**
 * Splash screen: fades the Trustees wordmark in, then after 1.5s sends the user
 * to onboarding (first run) or straight to the Home tab (returning user).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing, typography } from '../theme';

/** How long the wordmark takes to fade from invisible to fully visible. */
const FADE_IN_MS = 400;

/** Total time the splash stays on screen before routing away. */
const SPLASH_DURATION_MS = 1500;

/** AsyncStorage key set once the user finishes the onboarding slides. */
const HAS_ONBOARDED_KEY = 'hasOnboarded';

export default function SplashScreen() {
  const router = useRouter();

  // useRef so the animated value survives re-renders instead of resetting to 0.
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: FADE_IN_MS,
      useNativeDriver: true,
    }).start();

    // Guards against routing after the screen has already been left.
    let cancelled = false;

    const timer = setTimeout(async () => {
      let hasOnboarded: string | null = null;

      try {
        hasOnboarded = await AsyncStorage.getItem(HAS_ONBOARDED_KEY);
      } catch {
        // A read failure just means we show onboarding again — safe either way.
      }

      if (cancelled) {
        return;
      }

      // replace() so the back gesture can't return to the splash.
      router.replace(hasOnboarded ? '/(tabs)/home' : '/(onboarding)/slide-1');
    }, SPLASH_DURATION_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [opacity, router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Animated.View style={{ opacity }}>
          <Animated.Text style={styles.wordmark}>Trustees</Animated.Text>
          <Animated.Text style={styles.tagline}>Everyday Essentials</Animated.Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.screenHorizontalPadding,
  },
  wordmark: {
    ...typography.wordmark,
    textAlign: 'center',
  },
  tagline: {
    ...typography.tagline,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
