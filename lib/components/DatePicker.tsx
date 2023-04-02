import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { ReactElement, useState } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Button } from './Button';

export interface DatePickerProps {
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

    const onValueChange = (e: DateTimePickerEvent, date: Date) => {
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
