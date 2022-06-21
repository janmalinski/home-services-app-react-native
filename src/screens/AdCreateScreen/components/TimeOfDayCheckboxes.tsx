import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Checkbox, StyledText } from 'app/components';
import { spacing } from 'app/config/styles';
import { i18n } from 'app/config/translations';

import { AdFormData, workingTimeRecord } from './AdForm';

export interface Props {
  workingTime: AdFormData['workingTime'];
  setFieldValue: any;
  handleOnPress: (
    value: boolean,
    index: number,
    setFieldValue: {
      (
        field: string,
        value: string | Date | boolean | workingTimeRecord[],
        shouldValidate?: boolean | undefined,
      ): void;
      (arg0: string, arg1: string[]): void;
    },
    workingTime: AdFormData['workingTime'],
    range: string,
  ) => void;
}

export const TimeOfDayCheckboxes = React.memo<Props>(
  ({ workingTime, handleOnPress, setFieldValue }: Props) => {
    const handleOnPressCheckbox = (value: boolean, index: number, range: string) =>
      handleOnPress(value, index, setFieldValue, workingTime, range);

    const handleRenderRow = (item: workingTimeRecord, index: number, range: string, header?: boolean) => (
      <View key={'index' + index}>
        {index == 0 && (
          <View style={{ flexDirection: 'column' }}>
            {header && <StyledText>{i18n.t('adCreate:days:monday')}</StyledText>}
            <Checkbox
              onPress={(value) => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        )}
        {index == 1 && (
          <View style={{ flexDirection: 'column' }}>
            {header && <StyledText>{i18n.t('adCreate:days:tuesday')}</StyledText>}
            <Checkbox
              onPress={(value) => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        )}
        {index == 2 && (
          <View style={{ flexDirection: 'column' }}>
            {header && <StyledText>{i18n.t('adCreate:days:wednesday')}</StyledText>}
            <Checkbox
              onPress={(value) => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        )}
        {index == 3 && (
          <View style={{ flexDirection: 'column' }}>
            {header && <StyledText>{i18n.t('adCreate:days:thursday')}</StyledText>}
            <Checkbox
              onPress={(value) => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        )}
        {index == 4 && (
          <View style={{ flexDirection: 'column' }}>
            {header && <StyledText>{i18n.t('adCreate:days:friday')}</StyledText>}
            <Checkbox
              onPress={(value) => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        )}
        {index == 5 && (
          <View style={{ flexDirection: 'column' }}>
            {header && <StyledText>{i18n.t('adCreate:days:saturday')}</StyledText>}
            <Checkbox
              onPress={(value) => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        )}
        {index == 6 && (
          <View style={{ flexDirection: 'column' }}>
            {header && <StyledText>{i18n.t('adCreate:days:sunday')}</StyledText>}
            <Checkbox
              onPress={(value) => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
            />
          </View>
        )}
      </View>
    );

    return (
      <View>
        <View style={styles.rowCheckboxes}>
          <StyledText style={{ marginTop: 32 }}>06-09</StyledText>
          {workingTime.map((item, index: number) => handleRenderRow(item, index, '06-09', true))}
        </View>
        <View style={styles.rowCheckboxes}>
          <StyledText style={styles.marginTop}>09-12</StyledText>
          {workingTime.map((item, index: number) => handleRenderRow(item, index, '09-12'))}
        </View>
        <View style={styles.rowCheckboxes}>
          <StyledText style={styles.marginTop}>12-15</StyledText>
          {workingTime.map((item, index: number) => handleRenderRow(item, index, '12-15'))}
        </View>
        <View style={styles.rowCheckboxes}>
          <StyledText style={styles.marginTop}>15-18</StyledText>
          {workingTime.map((item, index: number) => handleRenderRow(item, index, '15-18'))}
        </View>
        <View style={styles.rowCheckboxes}>
          <StyledText style={styles.marginTop}>18-21</StyledText>
          {workingTime.map((item, index: number) => handleRenderRow(item, index, '18-21'))}
        </View>
        <View style={styles.rowCheckboxes}>
          <StyledText style={styles.marginTop}>21-24</StyledText>
          {workingTime.map((item, index: number) => handleRenderRow(item, index, '21-24'))}
        </View>
        <View style={styles.rowCheckboxes}>
          <StyledText style={styles.marginTop}>night </StyledText>
          {workingTime.map((item, index: number) => handleRenderRow(item, index, 'night'))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  checkboxContainer: {
    marginBottom: 0,
  },
  rowCheckboxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: 10,
  },
});
