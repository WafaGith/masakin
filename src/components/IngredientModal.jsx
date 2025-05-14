import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

const IngredientModal = ({ ingredient, onClose }) => {
  if (!ingredient) return null;

  return (
    <Modal transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{ingredient.name}</Text>
          <Text style={styles.description}>{ingredient.description}</Text>
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#F7944D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default IngredientModal;
