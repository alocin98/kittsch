import React from 'react';
import {Text, TextProps} from 'react-native';

const FontSizeMap = new Map(
    [
        ["sm", 16],
        ["md", 20],
        ["l", 30],
        ["xl", 40]
    ]
)

interface KTextProps extends TextProps {
  size?: 'sm' | 'md' | 'l' | 'xl';
  primary?: boolean;
  white?: boolean;
  color?: string;
};

export const KText = (props: KTextProps) => {
   
    const fontSize = FontSizeMap.get(props.size || 'md') || 20;

    let fontColor =  props.white? '#fff' : null || props.primary? global.COLORS.PRIMARY : null || props.color || '#000'

  return (
    <Text
      style={[{
        fontSize: fontSize,
        color: fontColor,
      }, props.style]}>
      {props.children}
    </Text>
  );
};
