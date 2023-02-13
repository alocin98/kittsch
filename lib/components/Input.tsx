import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, TextInputComponent, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    onPress?: (event: GestureResponderEvent) => void;
    isSecondary?: boolean;
    layoutStyle?: any;
    attribute?: string;
    title?: string;
    style?: any;
    debounce?: number;
    wide?: boolean;
    onChangeText?: (value: string, attribute?: string) => void;
};

export const Input: React.FC<InputProps> = (props: InputProps) => {
    useEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    const color = props.isSecondary ? global.COLORS.SECONDARY : global.COLORS.PRIMARY;

    const [value, setValue] = useState(props.value ?? '');

    let timeout: any;

    const textChanged = (e: string) => {
        setValue(e);
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            if (!props.onChangeText) return;
            props.onChangeText(e, props.attribute);
        }, props.debounce || 0);
    };

    return (
        <Pressable style={{...props.layoutStyle, width: props.wide? '90%' : 'auto'}} onPress={props.onPress}>
            {props.title && (
                <Text style={{ color }}>{props.title}</Text>
            )}
            <TextInput
                {...props}
                onBlur={() => Keyboard.dismiss()}
                onChangeText={textChanged}
                style={{
                    color: 'black',
                    borderRadius: 8,
                    minWidth: 200,
                    borderWidth: 1,
                    borderColor: '#E3E5E5',
                    padding: 10,
                    ...props.style,
                }}
                value={value}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    input: {

    }
})
