import { StyleSheet, Text, View } from 'react-native';
import { Button } from './lib/components/Button';
import { KText } from './lib/components/KText';
import { Input } from './lib/components/Input';
import { DismissKeyboard } from './lib/mixins/DismissKeyboard';
import { Divider } from './lib/components/Divider';
import SwitchButton from './lib/components/SwitchButtons';
import { IForm, IValidator, NotEmpty } from './lib/forms';
import { useState } from 'react';
import { DatePicker } from './lib/components/DatePicker';

global.COLORS = {
  PRIMARY: '#000',
  SECONDARY: '#fff',
}

export default function App() {
  const [form, setForm] = useState<any>({
    input: {
      value: '',
      isValid: false,
      validate: () => {}
    }
  });

  const recieve = (key: string, value: string, isValid: boolean, validate: () => {}) => {
    setForm({...form, [key]: {value, isValid, validate}});
  }

  const validateInput = () => {
    form['input'].validate();
  }

  const noSpecialCharactersValidator: IValidator = {
      validate: (value: string) => !value.match(/[^a-zA-Z0-9]/),
      errorMessage: 'No special characters allowed'
  }

  const switchValidator: IValidator = {
      validate: (value: string[]) => value.length > 2,
      errorMessage: 'Please select at least one option'
  }

  return (
    <DismissKeyboard>
    <View style={styles.container}>
    <Divider><Text>Button</Text></Divider>
      <Button wide isSecondary onPress={() => alert("Pressed")}>
        <KText white>Hei</KText>
      </Button>
      <Divider><Text>Input</Text></Divider>
      <Input dataLabel='input' transport={recieve} title='title' wide placeholder='placeholder'></Input>
      <Button wide onPress={validateInput}><Text>Validate Input</Text></Button>
      <Divider><Text>Switch Button</Text></Divider>
      <SwitchButton
      dataLabel='switch'
      wide
      multi
      validators={[switchValidator]}
      transport={recieve}
      validateOnChange
      options={[
        {label: "Option 1", value: "o1", selected: true},
        {label: "Option 2", value: "o2", selected: false},
        {label: "Option 3", value: "o3", selected: true},
        ]}
        ></SwitchButton>
        <Divider><Text>Datepicker</Text></Divider>
        <DatePicker />
        <Divider><Text>Form Content</Text></Divider>
        <Text>{JSON.stringify(form)}</Text>
    </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
