/**
 * Login screen — fake auth: it checks the email looks like an email and the
 * password is long enough, saves a mock user to AsyncStorage, then goes to Home.
 */

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/TextField';
import { body, buttonLabel, colors, heading, layout, spacing, typography } from '../../theme';

/** require() (not a URL) so Metro bundles the image into the app. */
const PHOTO = require('../../assets/auth/auth_models_trans.png');

/** Where the signed-in mock user is kept. Other screens read this same key. */
const USER_KEY = 'user';

/** The rules the fake auth enforces: an email shape, and a minimum password length. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

/** How tall the photo band across the bottom is, as a share of the screen. */
const PHOTO_HEIGHT = '40%';

/** Point sizes for this screen's text, kept together so they're easy to tune. */
const HEADING_SIZE = 28;
const SUB_SIZE = 13;
const SMALL_SIZE = 12;
const BACK_ICON_SIZE = 24;

/** The hairline rules either side of "OR LOG IN WITH". */
const DIVIDER_WIDTH = 1;

/** Room under the last line so the photo never crowds it. */
const CONTENT_BOTTOM_SPACE = spacing.huge;

export default function LoginScreen() {
  const router = useRouter();

  // The real notch and gesture-bar sizes for this exact phone, added as padding
  // rather than wrapping in <SafeAreaView>, so the photo still runs edge to edge.
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Undefined means "no problem with this field yet".
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  /** Android's built-in toast; anything else falls back to a plain alert. */
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    Alert.alert(message);
  };

  /** Checks both fields, and on success stores the mock user and leaves for Home. */
  const logIn = async () => {
    const trimmedEmail = email.trim();

    const nextEmailError = EMAIL_PATTERN.test(trimmedEmail)
      ? undefined
      : 'Enter a valid email address.';

    const nextPasswordError =
      password.length >= MIN_PASSWORD_LENGTH
        ? undefined
        : `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;

    // Both are set every time, so fixing one field clears only that field's message.
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);

    if (nextEmailError || nextPasswordError) {
      return;
    }

    try {
      // A stand-in for a real session — no backend exists yet.
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify({
          email: trimmedEmail,
          // Everything before the @ makes a good enough display name for now.
          name: trimmedEmail.split('@')[0],
          signedInAt: new Date().toISOString(),
        }),
      );
    } catch {
      showToast('Could not save your session. Please try again.');
      return;
    }

    // replace() so the back gesture can't return to the login form once signed in.
    router.replace('/(tabs)/home');
  };

  /** Steps back where there is history — arriving straight from onboarding, there isn't. */
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.screen}>
      {/*
        Layer 1: the models. Absolute and declared first, so it sits behind the
        form; pinned to the bottom, full width, and cropped by the screen edges.
      */}
      <View style={styles.photoLayer} pointerEvents="none">
        <Image source={PHOTO} resizeMode="cover" style={styles.photo} />
      </View>

      {/* Layer 2: the form, lifted clear of the keyboard while typing. */}
      <KeyboardAvoidingView
        style={styles.filler}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
          ]}
          // Lets a tap on a button work first time while the keyboard is open.
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            style={styles.back}
            // Widens the tap area beyond the arrow itself, which is small.
            hitSlop={spacing.md}
          >
            <Ionicons name="arrow-back" size={BACK_ICON_SIZE} color={colors.ink} />
          </Pressable>

          <Text style={styles.wordmark}>Trustees</Text>
          <Text style={styles.tagline}>Clothing. Confidence. You.</Text>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.sub}>Log in to access your account and continue shopping.</Text>

          <View style={styles.form}>
            <TextField
              icon="person-outline"
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <TextField
              icon="lock-closed-outline"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
              secure
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/(auth)/forgot-password')}
            style={styles.forgot}
            hitSlop={spacing.sm}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <PrimaryButton label="Log in" onPress={logIn} style={styles.submit} />

          <View style={styles.divider}>
            <View style={styles.dividerRule} />
            <Text style={styles.dividerText}>Or log in with</Text>
            <View style={styles.dividerRule} />
          </View>

          <View style={styles.social}>
            <PrimaryButton
              label="Google"
              variant="outline"
              icon="logo-google"
              onPress={() => showToast('Coming soon')}
              style={styles.filler}
            />
            <PrimaryButton
              label="Apple"
              variant="outline"
              icon="logo-apple"
              onPress={() => showToast('Coming soon')}
              style={styles.filler}
            />
          </View>

          <View style={styles.signup}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <Pressable accessibilityRole="button" onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // A flat colour, not a photo — the cut-out models sit on top of it.
    backgroundColor: colors.background,
  },
  /** Shared "take the space you're given" style, used by layers and row items. */
  filler: {
    flex: 1,
  },
  photoLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  photo: {
    width: 450,
    height: 450,
    marginTop: 900,
    marginLeft: -40,
  },
  content: {
    paddingHorizontal: layout.screenHorizontalPadding,
    // Keeps the last line off the models, however tall the phone is.
    paddingBottom: CONTENT_BOTTOM_SPACE,
  },
  back: {
    // Pins the arrow to the left while the wordmark below stays centred.
    alignSelf: 'flex-start',
  },
  wordmark: {
    ...typography.wordmark,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  tagline: {
    ...typography.tagline,
    color: colors.ink,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  title: {
    ...heading(HEADING_SIZE),
    marginTop: 10,
  },
  sub: {
    ...body(SUB_SIZE),
    marginTop: spacing.sm,
  },
  form: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
  },
  forgotText: {
    ...heading(SMALL_SIZE),
  },
  submit: {
    marginTop: spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  dividerRule: {
    flex: 1,
    height: DIVIDER_WIDTH,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...buttonLabel(SMALL_SIZE),
    color: colors.textMuted,
  },
  social: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
  signup: {
    flexDirection: 'row',
    // Keeps the sentence and the link on the same baseline.
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  signupText: {
    ...body(SMALL_SIZE),
  },
  signupLink: {
    ...heading(SMALL_SIZE),
    // The design system's uppercase link treatment.
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
