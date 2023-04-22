import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from './lib/components/Button';
import { KText } from './lib/components/KText';
import { Input } from './lib/components/Input';
import { DismissKeyboard } from './lib/mixins/DismissKeyboard';
import { Divider } from './lib/components/Divider';
import SwitchButton from './lib/components/SwitchButtons';
import { useRef, useState } from 'react';
import { DatePicker } from './lib/components/DatePicker';
import Checkbox from './lib/components/Checkbox';
import Batch from './lib/components/Batch';

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

  return (
    <DismissKeyboard>
      <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
      <Input title='title' wide placeholder='placeholder'></Input>
      <Divider><Text>Input with error</Text></Divider>
      <Input title='title' wide placeholder='placeholder' errorMessage={error}></Input>
      <Button wide onPress={() => setError('Error message')}><KText white>Set error</KText></Button>
      <Button wide onPress={() => setError('')}><KText white>Clear error</KText></Button>
      <Divider><Text>Checkbox</Text></Divider>
      <Checkbox><Text>Some text here</Text></Checkbox>
      <Divider><Text>Switch Button</Text></Divider>
      <SwitchButton
      wide
      multi
      validateOnChange
      options={[
        {label: "Option 1", value: "o1", selected: true},
        {label: "Option 2", value: "o2", selected: false},
        {label: "Option 3", value: "o3", selected: true},
        ]}
        ></SwitchButton>
                <Divider><Text>Batch</Text></Divider>
        <Batch><Text>1/3 messages</Text></Batch>
        <Divider><Text>Datepicker</Text></Divider>
        <DatePicker validateOnChange androidButtonIsSecondary androidButtonWide androidButtonText={<KText white>Open datepicker</KText>} />
        </View>

    </ScrollView>
    </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 3,
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
