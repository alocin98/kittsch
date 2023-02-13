import { StyleSheet, Text, View } from 'react-native';
import { Button } from './lib/components/Button';
import { KText } from './lib/components/KText';
import { Input } from './lib/components/Input';
import { DismissKeyboard } from './lib/mixins/DismissKeyboard';
import { Divider } from './lib/components/Divider';
import SwitchButton from './lib/components/SwitchButtons';

global.COLORS = {
  PRIMARY: '#000',
  SECONDARY: '#fff',
}

export default function App() {
  return (
    <DismissKeyboard>
    <View style={styles.container}>
    <Divider><Text>Button</Text></Divider>
      <Button wide isSecondary onPress={() => alert("Pressed")}>
        <KText white>Hei</KText>
      </Button>
      <Divider><Text>Input</Text></Divider>
      <Input title='title' wide placeholder='placeholder'></Input>
      <Divider><Text>Switch Button</Text></Divider>
      <SwitchButton
      wide
      options={[
        {label: "Option 1", value: "o1", selected: true},
        {label: "Option 2", value: "o2", selected: false},
        {label: "Option 3", value: "o3", selected: true},
        ]}
        ></SwitchButton>
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
