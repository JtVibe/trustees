/**
 * The onboarding pager — puts the three existing slides side by side in one
 * horizontal, page-snapping scroll view, and tells each one which dot to light so
 * the dots follow your finger. The slides themselves are unchanged.
 */

import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { colors } from '../../theme';
import Slide1Screen from './slide-1';
import Slide2Screen from './slide-2';
import Slide3Screen from './slide-3';

/** How often the scroll position is reported, in ms. 16 is roughly every frame. */
const SCROLL_EVENT_THROTTLE = 16;

export default function OnboardingPagerScreen() {
  // The phone's real width, so each page is exactly one screen wide and the
  // pager still lines up after a rotation.
  const { width } = useWindowDimensions();

  // A handle on the scroll view, so the NEXT buttons can move it themselves.
  const scrollRef = useRef<ScrollView>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /** Slides to a page and animates, used by the NEXT buttons. */
  const goToSlide = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  /**
   * Turns the scroll position into a page number. Rounding means the dots flip
   * once you are more than half a screen across, rather than after you let go.
   */
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width === 0) {
      return;
    }

    const index = Math.round(event.nativeEvent.contentOffset.x / width);

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      // Snaps to whole screens instead of stopping halfway between two slides.
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={SCROLL_EVENT_THROTTLE}
      onScroll={handleScroll}
      style={styles.pager}
    >
      {/* Each page is fixed to one screen width; the slide inside fills it. */}
      <View style={{ width }}>
        <Slide1Screen activeIndex={activeIndex} onNext={() => goToSlide(1)} />
      </View>

      <View style={{ width }}>
        <Slide2Screen activeIndex={activeIndex} onNext={() => goToSlide(2)} />
      </View>

      {/* No onNext — slide 3's button finishes onboarding rather than paging on. */}
      <View style={{ width }}>
        <Slide3Screen activeIndex={activeIndex} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pager: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
