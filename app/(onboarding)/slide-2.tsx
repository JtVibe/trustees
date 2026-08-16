/**
 * Onboarding slide 2 — a split layout on the plain page colour: cut-out models
 * anchored bottom-right behind a left-hand column of headline, copy and four
 * feature rows, with the dots and NEXT button over a dark fade at the bottom.
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FeatureRow, type FeatureIconName } from '../../components/FeatureRow';
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
const PHOTO = require('../../assets/onboarding/onboarding_02_models_trans.png');

/** The photo's real shape, read from the file, so it can never stretch. */
const photoSize = Image.resolveAssetSource(PHOTO);
const PHOTO_ASPECT = photoSize.width / photoSize.height;

/** How many onboarding slides there are in total, and which one this file is. */
const SLIDE_COUNT = 3;
const SLIDE_INDEX = 1;

/** How the screen is split: text down the left, models down the right. */
const COLUMN_WIDTH = '60%';
const PHOTO_WIDTH = '55%';

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
    title: 'Curated Collections',
    description: 'Modern styles for every occasion.',
  },
  {
    icon: 'ribbon-outline',
    title: 'Premium Quality',
    description: 'Carefully crafted for comfort and durability.',
  },
  {
    icon: 'bag-handle-outline',
    title: 'Seamless Shopping',
    description: 'A smooth experience from browse to buy.',
  },
  {
    icon: 'heart-outline',
    title: 'Made for You',
    description: 'Style that complements your lifestyle.',
  },
];

export default function Slide2Screen() {
  const router = useRouter();

  // The real notch and gesture-bar sizes for this exact phone. Added as padding
  // rather than wrapping in <SafeAreaView>, so the fade still runs edge to edge.
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/*
        Layer 1: the models. Absolute and declared first, so it sits behind the
        text; pinned to the bottom-right corner and sized to a share of the screen
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
        <Text style={styles.headline}>{'Designed for\nhow you live.'}</Text>

        <Text style={styles.copy}>
          Quality pieces. Modern fits. Effortless style. Shop with ease, anytime, anywhere.
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
            <View key={index} style={[styles.dot, index !== SLIDE_INDEX && styles.dotInactive]} />
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.push('/(onboarding)/slide-3')}
        >
          <Text style={styles.buttonText}>Next</Text>
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
    width: 580,
    height: 580,
    marginLeft: 100,
    marginBottom: 15,
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
    marginTop: spacing.lg,
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
