import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, ListRenderItemInfo, StyleSheet, View, } from 'react-native';

import { FullScreenTemplate, Icon, ListItem } from 'app/components';
import {  selectors } from 'app/store';
import { palette, typography } from 'app/config/styles';
import { useScreenOptions } from 'app/lib/navigation';
import * as Types from 'app/types';

interface Item {
  title: string;
  subtitle?: string;
}

const data: Item[] = [
  {
    title: 'Title',
  },
  {
    title: 'Title',
  },
  {
    title: 'Title',
    subtitle: 'Subtitle',
  },
];

type Props = Types.MainTabScreenProps<Types.Route.AdList>;

export const AdListScreen: React.FC<Props> = ({ navigation }) => {


  // const [value, setValue] = useState(false);

  // const toggleValue = useCallback(() => {
  //   setValue((prevState) => !prevState);
  // }, []);

//   const renderItem = useCallback(({ item }: ListRenderItemInfo<Item>) => {
//     const handleItemPress = () => {
//       // go to somewhere
//     };

    

//     return (
//       <View style={styles.row}>
//         <ListItem
//           leftComponent="icon"
//           icon={{ name: 'account-circle' }}
//           title={item.title}
//           rightComponent="chevron"
//           onPress={handleItemPress}
//           subtitle={item?.subtitle}
//           border
//         />
//       </View>
//     );
//   }, []);
// }

  const keyExtractor = useCallback((item: Item, index: number) => index.toString(), []);

  const navigateToContentCreate = useCallback(() => {
    navigation.navigate(Types.Route.ContentCreate);
  }, []);

  useScreenOptions({
    headerRight: () => (
      <Icon name="plus" size={28} onPress={navigateToContentCreate} color={palette.text} />
    ),
  });

  return (
    <FullScreenTemplate noScroll bottomNavigationPad>
      {/* <FlatList
        ListHeaderComponent={
          <>
            <View style={[styles.row, styles.divider]}>
              <CheckboxSection label="Checkbox Section" checked={value} onPress={toggleValue} />
            </View>
            <StyledText style={styles.listTitle}>Items</StyledText>
          </>
        }
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      /> */}
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
  },
  divider: {
    paddingBottom: 16,
    borderBottomColor: palette.border,
    borderBottomWidth: 1,
  },
  listTitle: {
    ...typography.subtitle1,
    marginBottom: 10,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
});
