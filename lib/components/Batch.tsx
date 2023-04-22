import React from 'react';
import { View, Text, TextProps } from 'react-native';


const Batch = (props: TextProps) => {
    return (
        <View style={{
            backgroundColor: '#F3F3F3',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            width: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {props.children}
        </View>
    );
};

export default Batch;
