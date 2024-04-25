import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Certifique-se de instalar essa biblioteca de ícones

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
      <View style={styles.checkbox}>
        {isChecked ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="check-box" size={24} color="blue" />
            <Text>Termos de uso aceiros!</Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="check-box-outline-blank"
              size={24}
              color="blue"
            />
            <Text>Aceiter os termos de uso!</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: "100%",
    height: 24,
    borderWidth: 0,
    borderColor: "none",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;
