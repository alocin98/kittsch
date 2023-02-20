import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { GestureResponderEvent, Pressable, StyleSheet, Platform, TextInputProps } from 'react-native';
import { IFormComponent, IValidator } from '../forms';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Button } from './Button';
import { KText } from './KText';


interface InputProps extends TextInputProps, IFormComponent {
   
};

export const DatePicker = (props: any) => {
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
        Keyboard.dismiss();
    };

    const openDatepicker = () => {
        DateTimePickerAndroid.open({value: new Date()})
    }

    if(Platform.OS === 'ios') {
        return <RNDateTimePicker {...props} />
    } else if (Platform.OS === 'android') {
        return <View>
            <Button onPress={() => openDatepicker()}><KText>Pick</KText></Button>
        </View>
    }
};

const styles = StyleSheet.create({
    input: {

    }
})
