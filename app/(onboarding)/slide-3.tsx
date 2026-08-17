/**
 * Onboarding slide 3 — the same split layout as slide 2 (cut-out models behind a
 * left-hand column of headline, copy and four feature rows), ending in GET STARTED,
 * which records that onboarding is done and sends the user to Login.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FeatureRow, type FeatureIconName } from '../../components/FeatureRow';
import type { OnboardingSlideProps } from '../../components/OnboardingSlide';
import {
  alpha,
  body,
  buttonLabel,
  colors,
  heading,
  layout,
  opacity,
  radius,
  scrim,
  spacing,
  typography,
} from '../../theme';

/** require() (not a URL) so Metro bundles the image into the app. */
const PHOTO = require('../../assets/onboarding/onboarding_03_models_trans.png');

/** How many onboarding slides there are in total, and which one this file is. */
const SLIDE_COUNT = 3;
const SLIDE_INDEX = 2;

/** Must match HAS_ONBOARDED_KEY in app/index.tsx, which reads it on the splash. */
const HAS_ONBOARDED_KEY = 'hasOnboarded';

/** How the screen is split: text down the left, models down the right. */
const COLUMN_WIDTH = '60%';

/** How far up the screen the bottom fade reaches. */
const GRADIENT_HEIGHT = '20%';

/** Point sizes for this screen's text, kept together so they're easy to tune. */
const HEADLINE_SIZE = 30;
const COPY_SIZE = 13;
const BUTTON_SIZE = 16;

/** The four selling points, in order down the page. */
const FEATURES: { icon: FeatureIconName; title: string; description: string }[] = [
  {
    icon: 'sparkles-outline',
    title: 'New Arrivals Every Week',
    description: 'Stay fresh with the latest trends.',
  },
  {
    icon: 'heart-outline',
    title: "Pieces You'll Love",
    description: "Handpicked styles you'll reach for again and again.",
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Secure & Easy',
    description: 'Safe checkout and multiple payment options.',
  },
  {
    icon: 'cube-outline',
    title: 'Delivered to You',
    description: 'Fast, reliable delivery right to your door.',
  },
];

/** activeIndex comes from the pager while swiping; on its own the third dot is lit. */
export default function Slide3Screen({ activeIndex = SLIDE_INDEX }: OnboardingSlideProps) {
  const router = useRouter();

  // The real notch and gesture-bar sizes for this exact phone. Added as padding
  // rather than wrapping in <SafeAreaView>, so the fade still runs edge to edge.
  const insets = useSafeAreaInsets();

  /** Remembers that onboarding is finished, then leaves for Login. */
  const finish = async () => {
    try {
      await AsyncStorage.setItem(HAS_ONBOARDED_KEY, 'true');
    } catch {
      // A write failure only means onboarding shows again next launch — safe.
    }

    // replace() so the back gesture can't return into onboarding.
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.screen}>
      {/*
        Layer 1: the models. Absolute and declared first, so it sits behind the
        text; pinned to the bottom of the screen and sized to a share of the screen
        width, with the height following from the photo's own shape.
      */}
      <View style={styles.photoLayer} pointerEvents="none">
        <Image source={PHOTO} resizeMode="contain" style={styles.photo} />
      </View>

      {/* Layer 2: the fade, so white footer text reads over whatever is behind it. */}
      <LinearGradient colors={scrim} style={styles.gradient} pointerEvents="none" />

      {/* Layer 3: the content. */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.xxxl }]}>
        <Text style={styles.wordmark}>Trustees</Text>
        <Text style={styles.tagline}>Clothing. Confidence. You.</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.headline}>{'Style made\njust for you.'}</Text>

        <Text style={styles.copy}>
          Timeless fashion for every moment. Look good, feel confident, wherever you go.
        </Text>

        <View style={styles.features}>
          {FEATURES.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              showDivider={index > 0}
            />
          ))}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.dots}>
          {Array.from({ length: SLIDE_COUNT }, (_, index) => (
            <View key={index} style={[styles.dot, index !== activeIndex && styles.dotInactive]} />
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={finish}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // A flat colour, not a photo — the cut-out models sit on top of it.
    backgroundColor: colors.background,
  },
  photoLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  photo: {
    width: 600,
    height: 600,
    marginLeft: 28,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: GRADIENT_HEIGHT,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: layout.screenHorizontalPadding,
  },
  wordmark: {
    ...typography.wordmark,
    textAlign: 'center',
  },
  tagline: {
    ...typography.tagline,
    // Black, not the usual muted grey — the top of the screen is very light.
    color: colors.ink,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  column: {
    // Takes the space between the wordmark and the footer, but only the left
    // share of the width, leaving the models visible down the right.
    flex: 1,
    width: COLUMN_WIDTH,
    paddingHorizontal: layout.screenHorizontalPadding,
    paddingTop: spacing.xxxl,
  },
  headline: {
    ...heading(HEADLINE_SIZE),
  },
  copy: {
    ...body(COPY_SIZE),
    marginTop: spacing.md,
  },
  features: {
    marginTop: 0,
  },
  footer: {
    paddingHorizontal: layout.screenHorizontalPadding,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.inkInverse,
  },
  dotInactive: {
    backgroundColor: alpha(colors.inkInverse, opacity.inactive),
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.inkInverse,
    borderRadius: radius.button,
    marginTop: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  buttonPressed: {
    opacity: opacity.overPhoto,
  },
  buttonText: {
    ...buttonLabel(BUTTON_SIZE),
    color: colors.ink,
  },
});
