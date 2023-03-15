import React, { Component } from 'react';
import { Pressable } from 'react-native';


export const Button = (props: {
    children: any;
    onPress?: () => void;
    size?: number;
    isSecondary?: boolean;
    wide?: boolean;
    style?: any;
}) => {
    const backgroundColor = props.isSecondary ? '#F3F3F3' : global.COLORS.PRIMARY;

    return (
        <Pressable
            onPress={props.onPress}
            style={[
                {
                    backgroundColor: backgroundColor,
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    width: props.wide ? '90%' : 'auto',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                props.style,
            ]}>
            {props.children}
        </Pressable>
    );
}
