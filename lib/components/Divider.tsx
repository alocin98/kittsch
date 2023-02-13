import React from 'react';
import { Text, View } from 'react-native';

export const Divider = (props: { children?: any }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'black',
                margin: 10,
                marginRight: props.children ? 10 : 0,
            }} />
            <View>
                {props.children}
            </View>
            <View style={{
                flex: 1,
                height: 1,
                backgroundColor: 'black',
                margin: 10,
                marginLeft: props.children ? 10 : 0,
            }} />
            </View>
    );
};
