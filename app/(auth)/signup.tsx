/**
 * Signup screen — fake auth: it checks the four fields make sense, saves a mock
 * user to AsyncStorage, then goes to Home.
 */

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/TextField';
import { body, buttonLabel, colors, heading, layout, spacing, typography } from '../../theme';

/** require() (not a URL) so Metro bundles the image into the app. */
const PHOTO = require('../../assets/auth/auth_models_trans.png');

/** Where the signed-in mock user is kept — the same key the login screen writes. */
const USER_KEY = 'user';

/** The rules the fake auth enforces: an email shape, and a minimum password length. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

/**
 * The models sit at the end of the scroll rather than behind it: this form is
 * four fields tall, so a pinned photo would end up underneath the inputs.
 */
const PHOTO_HEIGHT = 280;

/** Point sizes for this screen's text, kept together so they're easy to tune. */
const HEADING_SIZE = 28;
const SUB_SIZE = 13;
const SMALL_SIZE = 12;
const BACK_ICON_SIZE = 24;

/** The hairline rules either side of "OR SIGN UP WITH". */
const DIVIDER_WIDTH = 1;

export default function SignupScreen() {
  const router = useRouter();

  // The real notch and gesture-bar sizes for this exact phone, added as padding
  // rather than wrapping in <SafeAreaView>, so the photo still runs edge to edge.
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Undefined means "no problem with this field yet".
  const [nameError, setNameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [confirmError, setConfirmError] = useState<string>();

  /** Android's built-in toast; anything else falls back to a plain alert. */
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    Alert.alert(message);
  };

  /** Checks all four fields, and on success stores the mock user and leaves for Home. */
  const signUp = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const nextNameError = trimmedName ? undefined : 'Enter your full name.';

    const nextEmailError = EMAIL_PATTERN.test(trimmedEmail)
      ? undefined
      : 'Enter a valid email address.';

    const nextPasswordError =
      password.length >= MIN_PASSWORD_LENGTH
        ? undefined
        : `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;

    // Only worth complaining that they don't match once the first one is usable.
    const nextConfirmError =
      confirmPassword === password ? undefined : 'Passwords do not match.';

    // All four are set every time, so fixing one field clears only that field's message.
    setNameError(nextNameError);
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);

    if (nextNameError || nextEmailError || nextPasswordError || nextConfirmError) {
      return;
    }

    try {
      // A stand-in for a real account — no backend exists yet.
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify({
          email: trimmedEmail,
          name: trimmedName,
          signedInAt: new Date().toISOString(),
        }),
      );
    } catch {
      showToast('Could not save your details. Please try again.');
      return;
    }

    // replace() so the back gesture can't return to the signup form once signed in.
    router.replace('/(tabs)/home');
  };

  /** Steps back where there is history — arriving straight from onboarding, there isn't. */
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.screen}>
      {/* The form, lifted clear of the keyboard while typing. */}
      <KeyboardAvoidingView
        style={styles.filler}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom },
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

          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.sub}>
            Join Trustees and discover timeless style made for every you.
          </Text>

          <View style={styles.form}>
            <TextField
              icon="person-outline"
              placeholder="Full name"
              value={name}
              onChangeText={setName}
              error={nameError}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
            />

            <TextField
              icon="mail-outline"
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
              autoComplete="new-password"
              textContentType="newPassword"
            />

            <TextField
              icon="lock-closed-outline"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={confirmError}
              secure
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
            />
          </View>

          <PrimaryButton label="Sign up" onPress={signUp} style={styles.submit} />

          <View style={styles.divider}>
            <View style={styles.dividerRule} />
            <Text style={styles.dividerText}>Or sign up with</Text>
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

          <Text style={styles.finePrint}>
            By signing up, you agree to our <Text style={styles.finePrintStrong}>Terms of Use</Text>{' '}
            and <Text style={styles.finePrintStrong}>Privacy Policy</Text>.
          </Text>

          {/* Last in the scroll, so the models close the page off at the bottom. */}
          <Image source={PHOTO} resizeMode="cover" style={styles.photo} />
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
  /** Shared "take the space you're given" style, used by the layer and row items. */
  filler: {
    flex: 1,
  },
  content: {
    paddingHorizontal: layout.screenHorizontalPadding,
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
    marginTop: spacing.md,
  },
  sub: {
    ...body(SUB_SIZE),
    marginTop: spacing.sm,
  },
  form: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
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
  finePrint: {
    ...body(SMALL_SIZE),
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  finePrintStrong: {
    // The heading font is the design system's only bold weight.
    ...heading(SMALL_SIZE),
  },
  photoLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  photo: {
    width: 450,
    height: 450,
    marginLeft: -55,
  },
});
