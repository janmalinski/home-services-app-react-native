import React, { useCallback } from 'react';

import { FullScreenTemplate, Icon } from 'app/components';
import { palette } from 'app/config/styles';
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
      {/* THIS SCREEN WILL BE REFACTORED IN THE FUTURE */}
    </FullScreenTemplate>
  );
};
