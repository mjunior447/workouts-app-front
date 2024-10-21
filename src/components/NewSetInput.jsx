import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const NewSetInput = () => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const addSet = () => {
    console.warn("Add set");

    // save data in the database
    
    setReps("");
    setWeight("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={reps}
        onChangeText={setReps}
        placeholder="Reps"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight"
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Add" onPress={addSet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gainsboro",
    padding: 10,
    flex: 1,
  },
});

export default NewSetInput;
