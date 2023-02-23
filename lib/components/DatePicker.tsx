import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { ReactElement, useEffect, useState } from 'react';
import { Keyboard, View, Text } from 'react-native';
import { GestureResponderEvent, Pressable, StyleSheet, Platform, TextInputProps } from 'react-native';
import { IFormComponent, IValidator } from '../forms';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Button } from './Button';
import { KText } from './KText';

interface DatePickerProps extends IFormComponent {
    containerStyle?: any,
    androidButtonText?: ReactElement,
    androidButtonWide?: boolean,
    androidButtonStyle?: any,
    androidButtonIsSecondary?: boolean,
    validateOnChange?: boolean,
    maximumDate?: Date,
    minimumDate?: Date,
    value?: Date,
    onValueChange?: (value: any) => void,
};

export const DatePicker = (props: DatePickerProps) => {
    const [value, setValue] = useState(props.value ?? new Date());
    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        notifyChanges();
    }, [value, isValid]);

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

    const onValueChange = (e: DateTimePickerEvent, date: Date) => {
        if(props.validateOnChange) validate()
        setValue(date);
    }

    const openDatepicker = () => {
        DateTimePickerAndroid.open({value: new Date(), mode: 'date', onChange: onValueChange, maximumDate: props.maximumDate, minimumDate: props.minimumDate})
    }

    const androidOpenButton = <Button isSecondary={props.androidButtonIsSecondary} style={[props.androidButtonStyle]} wide={props.androidButtonWide} onPress={openDatepicker}>{props.androidButtonText}</Button>

    return (
        <>
            <View style={[styles.container, props.containerStyle]}>
                {Platform.OS === 'ios' && <RNDateTimePicker maximumDate={props.maximumDate} minimumDate={props.minimumDate} onChange={onValueChange} value={value} />}
                {Platform.OS === 'android' && androidOpenButton}
            </View>
            {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
