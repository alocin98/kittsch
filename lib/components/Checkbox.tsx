import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    children?: React.ReactNode;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, children } = props;
    const [isChecked, setIsChecked] = useState(checked ?? false);

    const handlePress = () => {
        setIsChecked(!isChecked);
        onChange && onChange(!isChecked);
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name={isChecked ? 'ios-checkbox' : 'ios-square-outline'}
                  size={24}
                  color={isChecked ? global.COLORS.PRIMARY : 'gray'}
                />
                <View style={{ marginLeft: 8 }}>{children}</View>
             </View>
        </Pressable>
    );
};

export default Checkbox;
