import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  top: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text_top: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "(rgba(225,225,255,0.1))",
    padding: 10,
  },
  carddown: {
    backgroundColor: "#fff",
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "#131313",
    padding: 10,
  },
});

export default styles;
