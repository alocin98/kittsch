import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Pressable } from 'react-native';
import { IFormComponent } from '../forms';

//Todo: notify changes, define colors and enable styling

export interface ISwitchButtonOption {
    label: string,
    value: string,
    selected: boolean,
}

export interface SwitchButtonProps extends IFormComponent {
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
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        notifyChanges();
    }, [selected, isValid])

    useEffect(() => {
        if(props.validateOnChange) {
            validate();
        }
    }, [selected]);

    const color = props.color ?? global.COLORS.PRIMARY;

    const validate = () => {
        if (!props.validators) {
            setIsValid(true);
            setErrorMessage('');
            return true;
        }

        const hasErrors = props.validators.some((validator) => !validator.validate(selected));
        if(!hasErrors) {
            setIsValid(true);
            setErrorMessage('');
            return true;
        }
        const errorMessage = props.validators.find((validator) => !validator.validate(selected))?.errorMessage;
        setErrorMessage(errorMessage ?? '');
        setIsValid(false);
        setErrorMessage(errorMessage);
        return false;
    }; 

    const notifyChanges = () => {
        if(props.onValueChange) {
            props.onValueChange(selected);
        }
        if(props.transport) {
            props.transport(props.dataLabel ?? '', selected, isValid, validate);
        }
    };

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
