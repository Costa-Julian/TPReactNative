import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

const UserForm = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !job.trim()) {
      Alert.alert(
        "Advertencia",
        "Por favor, complete todos los campos (Nombre y Job)."
      );
      return;
    }

    onSubmit({ name: name.trim(), job: job.trim() });

    setName("");
    setJob("");
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.header}>Agregar un usuario nuevo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={name}
        onChangeText={setName}
        editable={!isSubmitting}
      />
      <TextInput
        style={styles.input}
        placeholder="Job (Rol/Puesto)"
        value={job}
        onChangeText={setJob}
        editable={!isSubmitting}
      />

      <TouchableOpacity
        style={[
          styles.customButton,
          isSubmitting && styles.customButtonDisabled, // Estilo de deshabilitado
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}
        activeOpacity={0.7} // Opacidad al presionar
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? "Creando..." : "Crear Usuario"}
        </Text>
      </TouchableOpacity>
      {isSubmitting && (
        <ActivityIndicator
          style={{ marginTop: 5 }}
          size="small"
          color="#007AFF"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  customButton: {
    backgroundColor: "#6817b9ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  customButtonDisabled: {
    backgroundColor: "#99bce3",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  activityIndicator: {
    marginTop: 5,
  },
});

export default UserForm;
