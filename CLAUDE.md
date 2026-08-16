# Trustees — Mobile Shopping App

A test/prototype clothing retail app. Expo + TypeScript + Expo Router.
Target: Android via Expo Go. Currency: ZAR (R).

## Golden rules
- Build ONE screen per request. Never scaffold ahead.
- Never install packages with npm install. Always use `npx expo install`.
- Never use localStorage. Use @react-native-async-storage/async-storage.
- All colours, spacing and fonts come from theme files. No hardcoded hex
  values or magic numbers in screen files, ever.
- Every screen must respect safe areas (notch and gesture bar).
- The user is a beginner. When you create a file, say what it does in one line.

## Design system
Monochrome. Off-white backgrounds, black primary actions, black & white
photography. Colour appears in exactly two places: the Offers tile and the
Sales tile.

Colours (from theme/colors.ts):
  background   #F7F7F7   page background
  surface      #FFFFFF   cards, elevated panels
  panel        #ECEBEB   hero banner panel, trust strip
  ink          #000000   primary text, buttons, active states
  inkInverse   #FFFFFF   text on black
  textMuted    #555556   secondary/body copy
  border       #E2E2E2   input and card borders
  fieldFill    #F1F0F0   search bar and input fills
  offers       #6160BB   Offers tile only
  sales        #CB3430   Sales tile only

Typography:
  Wordmark  Jost_300Light, uppercase, letterSpacing 8
  Tagline   Jost_400Regular, uppercase, letterSpacing 3, 11px
  Headings  Manrope_800ExtraBold, tight line height
  Body      Manrope_400Regular, colour textMuted
  Buttons   Manrope_600SemiBold, uppercase, letterSpacing 1

Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48
Radius: inputs and cards 12, pill/chips 999, primary buttons 4
Screen horizontal padding: 20

## Structure
app/                  Expo Router routes
  (onboarding)/       splash + 3 onboarding slides
  (auth)/             login, signup, forgot-password
  (tabs)/             home, shop, cart, wallet, account
components/           reusable UI
theme/                colors.ts, typography.ts, spacing.ts
data/                 products.json, categories.json
assets/               images

## Product decisions already made
- Onboarding: 3 slides, swipe + NEXT button, no skip, slide 3 says
  GET STARTED and goes to Login. Shows once (AsyncStorage flag) with a
  dev reset button in Account.
- Browsing is open to guests. Login is only required for wishlist and cart.
- Auth is FAKE for now: validate format, store a mock user in AsyncStorage.
  No real backend. Google/Apple buttons show a "Coming soon" toast.
- Tab bar (5): Home, Shop, Cart, Wallet, Account. The tab is called
  "Account" everywhere. Never "Profile".
- Categories are 3 levels: Women > Clothing > Dresses.
- Product data is a local JSON file, ~30 products.
- No checkout in v1. The Cart screen ends at a disabled "Checkout"
  button labelled "Coming soon".
- Barcode scanner is a placeholder screen, no camera.