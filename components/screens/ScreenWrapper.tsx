import * as React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';


type Props = ScrollViewProps & {
  children: React.ReactNode;
  withScrollView?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function ScreenWrapper({
  children,
  withScrollView = true,
  style,
  contentContainerStyle,
  ...rest
}: Props) {
  

  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: "#0f1629",
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.left,
    },
  ];

  return (
    <>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="always"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[containerStyle, style]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[containerStyle, style]}>{children}</View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
