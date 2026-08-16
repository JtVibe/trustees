/** Route group for the onboarding slides — headerless stack, nothing designed yet. */

import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
