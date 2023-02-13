# Kittsch
A Minimal React native component library.

## Installation
First, install the package:

```npm install kittsch```

Add the following code in you index.tsx or App.tsx file to define a Color scheme:

```typescript:
global.COLORS = {
  PRIMARY: '#000',
  SECONDARY: '#fff',
}
```

## Components
Warning: Components yet uncomplete. Work is in progress.

### Input
Bsic Usage:
```typescript:
<Input placeholder='placeholder' />

```
### Button
Bsic Usage:
```typescript:
<Button wide isSecondary onPress={() => alert("Pressed")}>
    <KText white>Hei</KText>
</Button>
```
### Text
TBD
### SwitchButtons
TBD
### Divider
TBD

### Mixins
TBD
#### DismissKeyboard
TBD

