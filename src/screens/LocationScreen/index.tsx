import React, { useCallback, useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button, FullScreenTemplate, StyledText } from 'app/components';
import * as Types from 'app/types';
import { i18n } from 'app/config/translations';
import { palette, spacing, typography } from 'app/config/styles';
import { actions, selectors } from 'app/store';
import { Route } from 'app/types';
import Config from 'react-native-config';

export type Props = Types.RootStackNavigatorProps<Types.Route.Location>;

export const LocationScreen: React.FC<Props> = ({ navigation }) => {

  const [locationType, setLocationType] = useState('')
  const [userType, setUserType] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const dispatch = useDispatch();
  const typeemployments: Types.Typeemployment[] = useSelector(selectors.getTypeemployments);
  const roles: Types.Role[] = useSelector(selectors.getRoles);
 
  useEffect(()=>{
    dispatch(actions.getTypeemploymentRequest());
    dispatch(actions.getRoleRequest());
  },[]);

  const handlePressEmploymentTypeButton = (id:string)=>{
    const clickedEmploymentType = employmentTypes.map(el=>el).indexOf(id);
    if (clickedEmploymentType === -1) {
      setEmploymentTypes([...employmentTypes, id])
    } else {
      setEmploymentTypes(employmentTypes.filter(item => item !== id))
    }
  }

  const navigateToMap = useCallback( (type: string) => {
    setLocationType(type);
    navigation.navigate(Route.Map, {userType});
  },[setLocationType, navigation, userType])
  
  return (
    <FullScreenTemplate padded> 
      <StyledText style={styles.header}>{i18n.t('location:clientOrWorker')}</StyledText>
      <View style={[styles.rowTwoButtons]}>
          {roles?.map(item => 
            item.name !== 'Admin' &&
            (<View key={item.id} style={styles.wrapButton}>
              <Button
                buttonStyle={[
                styles.button,
                styles.buttonLeft,
                userType === item.id
                  ? { backgroundColor: '#def5f1' }
                  : { backgroundColor: '#F6F6F6' },
                ]}
                titleStyle={styles.buttonTitle}
                title={i18n.t(item.name === 'Help' ? 'location:worker' : 'location:client')}
                onPress={() => setUserType(item.id)}
              />
            </View>))}
      </View>
      {userType !== '' &&
        <View>
            <StyledText style={styles.header}>{userType === 'client' ? i18n.t('location:clientEmploymentType') : i18n.t('location:workerEmploymentType')}</StyledText>
          <View style={styles.userTypeChoiceContainer}>
           {typeemployments.map((typeemployment:{id: string, name: string}) => (
              <Button
                key={typeemployment.id}
                buttonStyle={[
                  { marginBottom: 10 },
                  employmentTypes.includes(typeemployment.id)
                    ? { backgroundColor: '#def5f1' }
                    : { backgroundColor: '#F6F6F6' },
                ]}
                titleStyle={styles.buttonTitle}
                title={typeemployment.name}
                onPress={()=>handlePressEmploymentTypeButton(typeemployment.id)}
              />
            ))}
          </View>
        </View>
      }
      {employmentTypes.length > 0 &&
      <View>
        <StyledText style={styles.header}>{i18n.t('location:yourLocation')}</StyledText>
        <Button
          buttonStyle={[
            styles.button,
            locationType === 'detect'
              ? { backgroundColor: '#def5f1' }
              : { backgroundColor: '#F6F6F6' },
          ]}
          titleStyle={styles.buttonTitle}
          title={i18n.t('location:detectLocation')}
          onPress={()=>navigateToMap('detect')}
        />
    </View>
    }
    </FullScreenTemplate>
  )
}

const styles = StyleSheet.create({
  header: {
    ...typography.subtitle1,
  marginTop: spacing.xxxLarge, 
  marginBottom: spacing.tiny,
  },
  subHeader:{
    ...typography.subtitle2,
  },
  rowTwoButtons: {
    flexDirection: 'row',
  },
  wrapButton: {
    flex: 1,
  },
  button:{
    height: 60
  },
  buttonLeft:{
    marginRight:8,
  },
  buttonRight:{
    marginLeft:8
  },
  buttonTitle: {
    color: palette.grayscale09,
    textAlign: 'left'
  },
  userTypeChoiceContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  marginBottomRegular:{
    marginBottom: spacing.regular
  }
})