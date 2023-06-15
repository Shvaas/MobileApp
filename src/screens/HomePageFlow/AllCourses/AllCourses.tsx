import React, { useState } from 'react';

import ToggleButton from '../../../components/ToggleButton';

import {useDispatch, useSelector} from 'react-redux';

import {getSessions} from '../../../store/userSessionSlice';

interface PropsType {
  navigation: any;
}

const AllCourses: React.FC<PropsType> = ({navigation}) => {

  const sessions = useSelector(getSessions);
  const upcommingSessions = sessions[0];
  const completedSessions = sessions[1];

  console.log(upcommingSessions);
  console.log(completedSessions);
  const [index, setIndex] = useState(1); 
  const onOptionPress = (x: number) => {
    if(x!=index){
      setIndex(x);
    }
  }  
  return (
    <ToggleButton
      navigation = {navigation}
      disabled={false}
      activeOption={index} 
      onOptionPress={onOptionPress} 
      dataCurrent={upcommingSessions} 
      dataPast={completedSessions}/>
      );
    };
    
export default AllCourses;
    