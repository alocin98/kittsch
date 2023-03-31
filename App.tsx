import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from './lib/components/Button';
import { KText } from './lib/components/KText';
import { Input } from './lib/components/Input';
import { DismissKeyboard } from './lib/mixins/DismissKeyboard';
import { Divider } from './lib/components/Divider';
import SwitchButton from './lib/components/SwitchButtons';
import { IForm, IValidator, NotEmpty } from './lib/forms';
import { useRef, useState } from 'react';
import { DatePicker } from './lib/components/DatePicker';
import Checkbox from './lib/components/Checkbox';

global.COLORS = {
  PRIMARY: '#1F618D',
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

  const [error, setError] = useState<string>('');

  const recieve = (key: string, value: string, isValid: boolean, validate: () => {}) => {
    setForm({...form, [key]: {value, isValid, validate}});
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
      <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.container}>
    <KText>primary</KText>
    <Divider><Text>Button</Text></Divider>
      <Button wide onPress={() => alert("Pressed")}>
        <KText white>Primary</KText>
      </Button>
      <Button wide isSecondary onPress={() => alert("Pressed")}>
        <KText>Secondary</KText>
      </Button>
      <Divider><Text>Input</Text></Divider>
      <Input title='title' wide placeholder='placeholder'></Input>
      <Divider><Text>Input with error</Text></Divider>
      <Input title='title' wide placeholder='placeholder' errorMessage={error}></Input>
      <Button wide onPress={() => setError('Error message')}><KText white>Set error</KText></Button>
      <Button wide onPress={() => setError('')}><KText white>Clear error</KText></Button>
      <Divider><Text>Checkbox</Text></Divider>
      <Checkbox><Text>Some text here</Text></Checkbox>
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
    </ScrollView>
    </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 3,
    width: '90%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
