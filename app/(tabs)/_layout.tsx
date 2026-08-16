/** Route group for the main app tabs — a plain stack for now; the real tab bar comes later. */

import { Stack } from 'expo-router';

export default function TabsLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
