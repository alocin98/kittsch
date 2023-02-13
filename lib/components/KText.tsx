import React from 'react';
import {Text, View} from 'react-native';

const FontSizeMap = new Map(
    [
        ["sm", 16],
        ["md", 20],
        ["l", 30],
        ["xl", 40]
    ]
)

export const KText = (props: {
  children: any;
  size?: 'sm' | 'md' | 'l' | 'xl';
  white?: boolean;
  style?: any;
}) => {
   
    const fontSize = FontSizeMap.get(props.size || 'md') || 20;
    const fontColor = props.white ? '#fff' : '#000';

  return (
    <Text
      style={{
        fontSize: fontSize,
        color: fontColor,
        ...props.style,
      }}>
      {props.children}
    </Text>
  );
};
