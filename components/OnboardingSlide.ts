/**
 * The two props every onboarding slide accepts so the swipe pager can drive it.
 * Both are optional, so a slide opened on its own still works unchanged.
 */

export type OnboardingSlideProps = {
  /**
   * Which dot is lit. Left out when the slide is its own screen, so it falls back
   * to the slide's own position; the pager passes the live swipe position instead.
   */
  activeIndex?: number;
  /**
   * What the NEXT button does. Left out when the slide is its own screen, so it
   * falls back to navigating to the next slide's route; the pager passes a
   * function that scrolls to the next page instead.
   */
  onNext?: () => void;
};
