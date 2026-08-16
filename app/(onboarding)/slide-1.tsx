/**
 * Onboarding slide 1 — a cut-out photo of the models on the off-white page, with
 * the wordmark above it and the headline, dots and NEXT button over a dark gradient.
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
const PHOTO = require('../../assets/onboarding/onboarding_01_models_trans.png');

/**
 * The photo's real shape, read from the file itself rather than typed in by hand,
 * so swapping in a differently sized image still displays undistorted.
 */
const photoSize = Image.resolveAssetSource(PHOTO);
const PHOTO_ASPECT = photoSize.width / photoSize.height;

/** How many onboarding slides there are in total, and which one this file is. */
const SLIDE_COUNT = 3;
const SLIDE_INDEX = 0;

/** Point sizes for this screen's text, kept together so they're easy to tune. */
const HEADLINE_SIZE = 32;
const COPY_SIZE = 15;
const BUTTON_SIZE = 16;

export default function Slide1Screen() {
  const router = useRouter();

  // The real notch and gesture-bar sizes for this exact phone. Added as padding
  // rather than wrapping in <SafeAreaView>, so the gradient still runs edge to edge.
  const insets = useSafeAreaInsets();

  // Measured, not guessed: the wordmark block's height decides where the photo
  // starts, and it changes with the notch size and the user's font scale.
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <View style={styles.screen}>
      {/*
        The photo sits on its own layer behind everything. It is sized to the screen
        WIDTH and kept at its natural shape, so the models stay small — a plain
        "cover" background would blow a square photo up to fill the tall screen.
        The layer is absolute so the gradient below can overlap the models' legs.
      */}
      <View style={styles.photoLayer} pointerEvents="none">
        <Image
          source={PHOTO}
          resizeMode="contain"
          style={[styles.photo, { marginTop: headerHeight + spacing.xl }]}
        />
      </View>

      <View
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
        style={[styles.header, { paddingTop: insets.top + spacing.xxxl }]}
      >
        <Text style={styles.wordmark}>Trustees</Text>
        <Text style={styles.tagline}>Clothing. Confidence. You.</Text>
      </View>

      {/* Empty and flexible — this is the gap the photo shows through. */}
      <View style={styles.photoArea} />

      <LinearGradient colors={scrim} style={styles.gradient}>
        <Text style={styles.headline}>{'Elevated style.\nEveryday you.'}</Text>

        <Text style={styles.copy}>
          Discover modern clothing for men and women. Premium quality. Timeless style. Made for
          living.
        </Text>

        <View style={styles.dots}>
          {Array.from({ length: SLIDE_COUNT }, (_, index) => (
            <View key={index} style={[styles.dot, index !== SLIDE_INDEX && styles.dotInactive]} />
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { marginBottom: insets.bottom + spacing.xl },
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('/(onboarding)/slide-2')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // The photo is a transparent cut-out, so the page colour shows through
    // around the models and they read as standing on the background.
    backgroundColor: colors.background,
  },
  photoLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  photo: {
    width: 650,
    height: 650,
    // Height follows from the width, so the photo can never stretch.
    // aspectRatio: PHOTO_ASPECT,
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
  photoArea: {
    flex: 1,
  },
  gradient: {
    // flexGrow fills at least the bottom half on a tall phone, while flexShrink 0
    // stops the copy being squashed on a short one. No fixed pixel height.
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: layout.screenHorizontalPadding,
    paddingTop: spacing.huge,
  },
  headline: {
    ...heading(HEADLINE_SIZE),
    color: colors.inkInverse,
  },
  copy: {
    ...body(COPY_SIZE),
    // Overrides the muted grey that body() defaults to.
    color: alpha(colors.inkInverse, opacity.overPhoto),
    marginTop: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xxxl,
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
