/**
 * Temporary placeholder route: centres the Trustees wordmark and tagline so the
 * theme fonts and colours can be checked on a device. Replace with onboarding.
 */

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing, typography } from '../theme';

export default function BrandCheckScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.wordmark}>Trustees</Text>
        <Text style={styles.tagline}>Everyday Essentials</Text>
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
