import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

//Todo: notify changes, define colors and enable styling

export interface ISwitchButtonOption {
    label: string,
    value: string,
    selected: boolean,
}

export interface SwitchButtonProps {
    options?: ISwitchButtonOption[],
    validateOnChange?: boolean,
    onValueChange?: (selected: string[]) => void,
    wide?: boolean,
    multi?: boolean,
    color?: string,
}

const SwitchButton: React.FC<SwitchButtonProps> = (props: SwitchButtonProps) => {

    const getSelected = (options: ISwitchButtonOption[]) => {
        return options.filter((option) => option.selected).map((option) => option.value);
    };

    const [options, setOptions] = useState(props.options ?? []);
    const [selected, setSelected] = useState(getSelected(options) ?? []);
    const [errorMessage, setErrorMessage] = useState('');

    const color = props.color ?? global.COLORS.PRIMARY;

    const addSelected = (value: string) => {
        if(props.multi) {
            const newOptions = options.map((option) => {
                if (option.value === value) {
                    return {
                        ...option,
                        selected: !option.selected,
                    };
                }
                return option;
            });
            setOptions(newOptions);
            setSelected(getSelected(newOptions));
        } else {
            const newOptions = options.map((option) => {
                if (option.value === value) {
                    return {
                        ...option,
                        selected: true,
                    };
                }
                return {
                    ...option,
                    selected: false,
                };
            });
            setOptions(newOptions);
            setSelected(getSelected(newOptions));
        }
    };

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', width: props.wide ? '90%' : 'auto'}}>
      {options.map((option, index) => (
        <Pressable key={index} onPress={() => addSelected(option.value)}
        style={{
            borderColor: color,
            borderWidth: option.selected ? 2 : 1,
            margin: option.selected ? 5 : 6,
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            width: '100%'
        }}
        >
            <Text style={{color}}>{option.label}</Text>
        </Pressable>
      ))}
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
    </View>
  );
};

export default SwitchButton;
