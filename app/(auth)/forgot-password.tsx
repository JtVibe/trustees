/**
 * Forgot-password screen — checks the email looks like an email, then shows a
 * "Coming soon" toast. There is no backend, so no link is actually sent.
 */

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
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
import { body, colors, heading, layout, spacing, typography } from '../../theme';

/** The one rule this screen enforces: the email has to look like an email. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Point sizes for this screen's text, kept together so they're easy to tune. */
const HEADING_SIZE = 28;
const SUB_SIZE = 13;
const BACK_ICON_SIZE = 24;

export default function ForgotPasswordScreen() {
  const router = useRouter();

  // The real notch and gesture-bar sizes for this exact phone.
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');

  // Undefined means "no problem with this field yet".
  const [emailError, setEmailError] = useState<string>();

  /** Android's built-in toast; anything else falls back to a plain alert. */
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    Alert.alert(message);
  };

  /** Checks the email, then says the feature isn't built yet. */
  const sendResetLink = () => {
    const trimmedEmail = email.trim();

    const nextEmailError = EMAIL_PATTERN.test(trimmedEmail)
      ? undefined
      : 'Enter a valid email address.';

    setEmailError(nextEmailError);

    if (nextEmailError) {
      return;
    }

    showToast('Coming soon');
  };

  /** Steps back where there is history — otherwise falls back to Login. */
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
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
          ]}
          // Lets a tap on the button work first time while the keyboard is open.
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

          <Text style={styles.title}>Reset password</Text>
          <Text style={styles.sub}>
            Enter the email address on your account and we&apos;ll send you a reset link.
          </Text>

          <View style={styles.form}>
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
          </View>

          <PrimaryButton label="Send reset link" onPress={sendResetLink} style={styles.submit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  /** Shared "take the space you're given" style. */
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
    marginTop: spacing.xxxl,
  },
  sub: {
    ...body(SUB_SIZE),
    marginTop: spacing.sm,
  },
  form: {
    marginTop: spacing.xxl,
  },
  submit: {
    marginTop: spacing.xl,
  },
});
