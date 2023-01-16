export const APP_FLOWS = {
  OnboardingFlow: 'OnboardingFlow',
  HomePageFlow: 'HomePageFlow',
};

const RouteNames = {
  [APP_FLOWS.OnboardingFlow]: {
    Welcome: 'Welcome',
    Login: 'Login'
  },
  [APP_FLOWS.HomePageFlow]: {
    Yogis: 'Yogis',
    Feed: 'Feed',
  },
};

export default RouteNames;
