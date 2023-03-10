import { StyleSheet, Text, View } from 'react-native';
import { Button } from './lib/components/Button';
import { KText } from './lib/components/KText';
import { Input } from './lib/components/Input';
import { DismissKeyboard } from './lib/mixins/DismissKeyboard';
import { Divider } from './lib/components/Divider';
import SwitchButton from './lib/components/SwitchButtons';
import { IForm, IValidator, NotEmpty } from './lib/forms';
import { useRef, useState } from 'react';
import { DatePicker } from './lib/components/DatePicker';

global.COLORS = {
  PRIMARY: '#0ff',
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

  const switchValidator: IValidator = {
      validate: (value: string[]) => value.length > 2,
      errorMessage: 'Please select at least one option'
  }

  const isOver18Validator: IValidator = {
    validate: (date: Date) => false,
    errorMessage: 'You must be over 18'
  }

  return (
    <DismissKeyboard>
    <View style={styles.container}>
    <KText>primary</KText>
    <Divider><Text>Button</Text></Divider>
      <Button wide onPress={() => alert("Pressed")}>
        <KText white>Primary</KText>
      </Button>
      <Button wide isSecondary onPress={() => alert("Pressed")}>
        <KText>Secondary</KText>
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
        <DatePicker validateOnChange validators={[isOver18Validator]} dataLabel='datepicker' transport={recieve} androidButtonIsSecondary androidButtonWide androidButtonText={<KText white>Open datepicker</KText>} />
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
