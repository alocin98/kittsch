import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboard = (props: { children: React.ReactNode }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
        {props.children}
    </TouchableWithoutFeedback>
    );