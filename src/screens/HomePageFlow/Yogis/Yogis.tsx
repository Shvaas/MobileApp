import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import BackgroundImageDup from '../../../common/BackgroundImageFullPage';
import {
  themeFontFamily,
  themefonts,
  themeColor,
} from '../../../constants/theme';
import ProfileCardView from './components/ProfileCardView';
import {aryan, nabeel, shikha, utkarsh, yoga_instructor1, yoga_instructor2, yoga_instructor3} from '../../../images/imageLinks';
import RouteNames from '../../../constants/routeName';

interface PropsType {
  navigation: any;
}

const DATA = [
  {
    key: 1,
    name: 'Anna',
    image: yoga_instructor1,
    yearsOfExp: 2,
    rating: 4.5,
    certificates: 'Masters in Yoga, RYT-500',
    studentsTrained: 450,
    description: 'Yoga lorem ipsium the random text',
    ActiveCourses: 2,
    interest: ['meditation', 'Yoga', 'hatha Yoga'],
    reviews: [
      {
        image: utkarsh,
        name: 'Utkarsh Nath',
        review:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
      },
      {
        image: aryan,
        name: 'Aryan Mittal',
        review:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
      },
      {
        image: utkarsh,
        name: 'Utkarsh Nath 2.0',
        review:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
      },
    ],
  },
  {
    key: 2,
    name: 'Emma',
    image: yoga_instructor2,
    yearsOfExp: 4,
    rating: 4.9,
    certificates: 'RYT-200, RYT-500',
    studentsTrained: 700,
    description: 'Meditation',
    ActiveCourses: 3,
    interest: ['yoga', 'meditation', 'Yin Yoga', 'Anxiety'],
    reviews: [
      {
        image: shikha,
        name: 'Shikha Asrani',
        review:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
      },
      {
        image: aryan,
        name: 'Aryan Mittal',
        review:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
      },
    ],
  },
  {
    key: 3,
    name: 'Olivia',
    image: yoga_instructor3,
    yearsOfExp: 1,
    rating: 3.5,
    certificates: 'RYT-200',
    studentsTrained: 106,
    description: 'Yoga',
    ActiveCourses: 3,
    interest: ['yoga', 'Children\'s Yoga', 'Pranayama'],
    reviews: [
      {
        image: utkarsh,
        name: 'Utkarsh Nath',
        review:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
      },
      {
        image: shikha,
        name: 'Shikha Asrani',
        review:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit consequuntur vitae cumque, sed, dolor culpa cum praesentium possimus animi quia, omnis quod distinctio magnam qui? Ab dignissimos vero aliquam velit!',
      },
    ],
  },
  // {
  //   key: 4,
  //   name: 'Shikha Asrani',
  //   image: shikha,
  //   yearsOfExp: 2,
  //   rating: 4.5,
  //   certificates: 'xyz, abc, 123',
  //   studentsTrained: 98,
  //   description: 'Yoga',
  //   ActiveCourses: 2,
  // },
  // {
  //   key: 5,
  //   name: 'Nabeel Bhattacharya',
  //   image: nabeel,
  //   yearsOfExp: 1,
  //   rating: 4.5,
  //   certificates: 'Masters in Yoga',
  //   studentsTrained: 106,
  //   description: 'Meditation',
  //   ActiveCourses: 3,
  // },
  // {
  //   key: 6,
  //   name: 'Aryan Mittal',
  //   image: aryan,
  //   yearsOfExp: 1,
  //   rating: 4.5,
  //   certificates: 'xyz, 123',
  //   studentsTrained: 106,
  //   description: 'Yoga',
  //   ActiveCourses: 3,
  // },
  // {
  //   key: 7,
  //   name: "Utkarsh Nath",
  //   image: utkarsh,
  //   yearsOfExp: 4,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Meditation",
  //   ActiveCourses: 3
  // },
  // {
  //   key: 8,
  //   name: "Nabeel Bhattacharya",
  //   image: nabeel,
  //   yearsOfExp: 1,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Meditation",
  //   ActiveCourses: 3
  // },
  // {
  //   key: 9,
  //   name: "Utkarsh Nath",
  //   image: utkarsh,
  //   yearsOfExp: 4,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Meditation",
  //   ActiveCourses: 3
  // },
  // {
  //   key: 10,
  //   name: "Aryan Mittal",
  //   image: aryan,
  //   yearsOfExp: 1,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Yoga",
  //   ActiveCourses: 3
  // },
  // {
  //   key: 11,
  //   name: "Utkarsh Nath",
  //   image: utkarsh,
  //   yearsOfExp: 4,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Meditation",
  //   ActiveCourses: 3
  // },
  // {
  //   key: 12,
  //   name: "Aryan Mittal",
  //   image: aryan,
  //   yearsOfExp: 1,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Yoga",
  //   ActiveCourses: 3
  // },
  // {
  //   key: 13,
  //   name: "Utkarsh Nath",
  //   image: utkarsh,
  //   yearsOfExp: 4,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Meditation",
  //   ActiveCourses: 3
  // },
  // {
  //   key: 14,
  //   name: "Nabeel Bhattacharya",
  //   image: nabeel,
  //   yearsOfExp: 1,
  //   rating: 4.5,
  //   certificates: "xyz, 123",
  //   studentsTrained: 106,
  //   description: "Meditation",
  //   ActiveCourses: 3
  // },
];

const Yogis: React.FC<PropsType> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <BackgroundImageDup>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={DATA}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(RouteNames.HomePageFlow.YogiProfile, {
                      yogiProfile: item,
                    })
                  }>
                  <ProfileCardView profile={item} />
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </BackgroundImageDup>
    </SafeAreaView>
  );
};

export default Yogis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.background,
  },
  heading: {
    fontSize: themefonts.font32,
    textAlign: 'center',
    fontFamily: themeFontFamily.raleway,
    color: themeColor.white,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  buttonStyle: {
    width: 167,
  },
  btnContainerStyle: {
    alignSelf: 'center',
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentContainer: {
    paddingVertical: 5,
    contentOffset: {x: 0, y: 0},
  },
});
