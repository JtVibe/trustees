/**
 * The app's bottom tab bar: Home, Shop, Cart, Wallet, Account. Icons are outline
 * when inactive and filled black when active, with the cart showing a count badge.
 */

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fontFamily, spacing } from '../../theme';

/** The bar's own height. The gesture-bar inset is added to this at runtime. */
const TAB_BAR_HEIGHT = 60;

/** Icon size, and the label sitting under it. */
const ICON_SIZE = 24;
const LABEL_SIZE = 11;

/** Text size inside the cart's count badge. */
const BADGE_SIZE = 10;

/**
 * How many items are in the cart. Hard-wired to 0 until the real cart exists —
 * the badge only appears once this is above zero.
 */
const CART_ITEM_COUNT = 0;

export default function TabsLayout() {
  // Bottom inset = the Android gesture bar, so the tab bar sits above it.
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontFamily: fontFamily.body,
          fontSize: LABEL_SIZE,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingTop: spacing.sm,
          paddingBottom: insets.bottom,
          // Android draws a drop shadow by default; the hairline is the whole design.
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={ICON_SIZE} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bag' : 'bag-outline'} size={ICON_SIZE} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          // undefined hides the badge entirely — an empty cart shows no dot.
          tabBarBadge: CART_ITEM_COUNT > 0 ? CART_ITEM_COUNT : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.ink,
            color: colors.inkInverse,
            fontFamily: fontFamily.body,
            fontSize: BADGE_SIZE,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={ICON_SIZE} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'wallet' : 'wallet-outline'} size={ICON_SIZE} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
