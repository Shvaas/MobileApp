export const APP_FLOWS = {
  OnboardingFlow: 'OnboardingFlow',
  HomePageFlow: 'HomePageFlow',
};

const RouteNames = {
  [APP_FLOWS.OnboardingFlow]: {
    Welcome: 'Welcome',
    Login: 'Login',
    FreeTrial: 'FreeTrial',
    ProfileQuestions: 'ProfileQuestions',
  },
  [APP_FLOWS.HomePageFlow]: {
    AllYogis: 'Yogis',
    TeacherSessions: 'Teacher Session',
    CreateSessions: 'Create Session',
    YogiProfile: 'Yogi Profile',
    Feed: 'Feed',
    UserProfile: 'User Profile',
    CreatePost: 'Create Post',
    MyCourse: 'My Courses',
    MyCourseDetail: "Course Detail",
    AllCourses: "Sessions",
    AllCourseDetail: "Course Detail",
    CalendarPage: "Calendar Page",
    AllComments: 'All Comments',
  },
};

export default RouteNames;
