import React, { Component } from 'react';
import { Pressable, PressableProps } from 'react-native';

export interface KButtonProps extends PressableProps {
    isSecondary?: boolean;
    wide?: boolean;
    style?: any;
};

export const Button = (props: KButtonProps ) => {
    const { isSecondary, wide, style, children, onPress } = props;
    const backgroundColor = isSecondary ? '#F3F3F3' : global.COLORS.PRIMARY;

    return (
        <Pressable
            onPress={onPress}
            style={[
                {
                    backgroundColor: backgroundColor,
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    width: wide ? '100%' : 'auto',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}>
            {children}
        </Pressable>
    );
}
