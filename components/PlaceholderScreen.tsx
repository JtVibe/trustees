/**
 * A temporary screen body that just centres a tab's name. Each tab uses this
 * until its real screen is built, so the navigator can be tested on its own.
 */

import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { body, colors, layout } from '../theme';

/** Point size of the centred name. */
const LABEL_SIZE = 16;

type PlaceholderScreenProps = {
  /** The tab's name, e.g. 'Home'. */
  name: string;
};

export function PlaceholderScreen({ name }: PlaceholderScreenProps) {
  return (
    // Top edge only: the tab bar already clears the gesture bar at the bottom.
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.label}>{name}</Text>
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
  label: {
    ...body(LABEL_SIZE),
  },
});
