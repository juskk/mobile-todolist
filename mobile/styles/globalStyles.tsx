import { StyleSheet } from "react-native";

export const mainColor = 'purple';
export const secondColor = '#0228B3'
export const BUFFER_SIZE = 22;
export default StyleSheet.create({
  input: {
    padding: 4,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    width: 180,
  },
  bigInput: {
    padding: 4,
    borderColor: 'black',
    borderWidth: 2,
    width: 180,
    height: 200
  },
  boldText: {
    fontSize: 15,
    margin: 2,
    fontWeight: '600'
  }
})