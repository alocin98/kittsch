import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';

//Todo: notify changes, define colors and enable styling

interface ISwitchButtonOption {
    label: string,
    value: string,
    selected: boolean,
}

interface SwitchButtonProps {
    options?: ISwitchButtonOption[],
    onValueChange?: (selected: string[]) => void,
    wide?: boolean,
}

const SwitchButton = (props: SwitchButtonProps) => {
    const [selected, setSelected] = useState(props.options ?? []);

    const addSelected = (value: string) => {
        const newSelected = selected.map((option) => {
            if (option.value === value) {
                return {
                    ...option,
                    selected: !option.selected,
                };
            }
            return option;
        });
        setSelected(newSelected);
    };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', width: props.wide ? '90%' : 'auto'}}>
      {selected.map((option, index) => (
        <Pressable key={index} onPress={() => addSelected(option.value)}
        style={{
            borderColor: option.selected ? 'red' : 'blue',
            borderWidth: option.selected ? 2 : 1,
            margin: option.selected ? 5 : 6,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            width: '100%'
        }}
        >
            <Text style={{color: option.selected ? 'red' : 'blue'}}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default SwitchButton;
