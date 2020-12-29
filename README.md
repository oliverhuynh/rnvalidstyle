# rnvalidstyle
React Native Valid Style Checker

# Setup and examples

```
npm i -g ~/projects/rnvalidstyle
validrnstyle --property "minBlockSize"
=> false
validrnstyle styles.json
=> output json with invalid style removed
```
```
validrnstyle stylesheet.json | setclip
```

# How it works

- It valid property via https://github.com/vhpoet/react-native-styling-cheat-sheet 
- And parsing output

# Steps
- [x] Framework with CLI with example output
- [x] Parsing real data
