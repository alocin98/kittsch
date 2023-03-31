import React, { useEffect, useState } from 'react';
import { TextStyle } from 'react-native';
import { Keyboard, StyleProp } from 'react-native';
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, TextInputComponent, TextInputProps } from 'react-native';
import { IFormComponent, IValidator } from '../forms';

export interface InputProps extends TextInputProps {
    onPress?: (event: GestureResponderEvent) => void;
    isSecondary?: boolean;
    errorMessage?: string;
    errorMessageStyle?: StyleProp<any>;
    layoutStyle?: any;
    title?: string;
    style?: any;
    debounce?: number;
    wide?: boolean;
    value?: string;
};

export const Input: React.FC<InputProps> = (props: InputProps) => {
    const {isSecondary, layoutStyle, wide, style, title, errorMessage } = props;
    const [value, setValue] = useState(props.value ?? '');

    // Define variables
    const color = isSecondary ? global.COLORS.SECONDARY : global.COLORS.PRIMARY;

    const textChanged = (e: string) => {
        setValue(e);
    };

    return (
        <Pressable style={{width: wide? '100%' : 'auto', ...layoutStyle}} onPress={props.onPress}>
            {title && (
                <Text style={{ color, margin: 3 }}>{title}</Text>
            )}
            <TextInput
                {...props}
                onChangeText={textChanged}
                style={{
                    color: 'black',
                    borderRadius: 8,
                    minWidth: 200,
                    borderWidth: 1,
                    borderColor: '#E3E5E5',
                    padding: 10,
                    ...style,
                }}
                value={value}
            />
            {errorMessage && <Text style={{ color: 'red', marginTop: 2, ...props.errorMessageStyle }}>{errorMessage}</Text>}
        </Pressable>
    );
};
