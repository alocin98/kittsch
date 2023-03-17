import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, TextInputComponent, TextInputProps } from 'react-native';
import { IFormComponent, IValidator } from '../forms';

export interface InputProps extends TextInputProps, IFormComponent {
    onPress?: (event: GestureResponderEvent) => void;
    isSecondary?: boolean;
    layoutStyle?: any;
    title?: string;
    style?: any;
    debounce?: number;
    wide?: boolean;
    value?: string;
    hideKeyboardOnBlur?: boolean;
    onValueChange?: (value: string) => void;
};

export const Input: React.FC<InputProps> = (props: InputProps) => {
    const [value, setValue] = useState(props.value ?? '');
    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        notifyChanges();
    }, [value, isValid]);


    // Define variables
    const color = props.isSecondary ? global.COLORS.SECONDARY : global.COLORS.PRIMARY;

    const notifyChanges = () => {
        if(props.onValueChange) {
            props.onValueChange(value);
        }
        if(props.transport) {
            props.transport(props.dataLabel ?? '', value, isValid, validate);
        }
    };

    const validate = () => {
        if (!props.validators) {
            setIsValid(true);
            setErrorMessage('');
            return true;
        }

        const hasErrors = props.validators.some((validator) => !validator.validate(value));
        if(!hasErrors) {
            setIsValid(true);
            setErrorMessage('');
            return true;
        }
        const errorMessage = props.validators.find((validator) => !validator.validate(value))?.errorMessage;
        setErrorMessage(errorMessage ?? '');
        setIsValid(false);
        setErrorMessage(errorMessage);
        return false;
    };

    const textChanged = (e: string) => {
        setValue(e);
    };

    const onBlur = () => {
        validate();
        if(props.hideKeyboardOnBlur) {
            Keyboard.dismiss();
        }
    };

    return (
        <Pressable style={{...props.layoutStyle, width: props.wide? '90%' : 'auto'}} onPress={props.onPress}>
            {props.title && (
                <Text style={{ color, margin: 3 }}>{props.title}</Text>
            )}
            <TextInput
                {...props}
                onBlur={onBlur}
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
            {errorMessage && (
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    input: {

    }
})
