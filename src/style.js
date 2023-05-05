import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  itemStyle: {
    padding: 10
  },
  textInputStyle: {
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1
  }
});
export default style;
