import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  clearCreateStatus,
} from "../features/users/usersSlice";
import UserForm from "../components/UserForm";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.users);

  const { createStatus, createError } = useSelector((state) => state.users);

  const isLoading = status === "loading";
  const isSubmitting = createStatus === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      Alert.alert(
        "Éxito",
        "¡Usuario creado exitosamente y añadido a la lista!"
      );
    } else if (createStatus === "failed") {
      Alert.alert("Error", `Fallo al crear usuario: ${createError}`);
    }

    if (createStatus !== "idle") {
      dispatch(clearCreateStatus());
    }
  }, [createStatus, createError, dispatch]);

  const handleCreateUser = (userData) => {
    dispatch(createUser(userData));
  };

  return (
    <View style={[styles.container, { paddingBottom: 150 }]}>
      <Text style={styles.header}>Gestor de Usuarios de Prueba</Text>

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Cargando usuarios...</Text>
        </View>
      )}
      {status === "failed" && (
        <Text style={styles.error}>Error al obtener usuarios: {error}</Text>
      )}

      {status === "succeeded" && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.avatar && (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              )}
              <View style={styles.info}>
                <Text style={styles.name}>
                  {item.first_name} {item.last_name}
                </Text>
                {item.email && <Text style={styles.email}>{item.email}</Text>}
              </View>
            </View>
          )}
        />
      )}

      <UserForm onSubmit={handleCreateUser} isSubmitting={isSubmitting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, marginTop: 10 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  center: { alignItems: "center", marginVertical: 8 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 4,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,

    elevation: 3,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold" },
  email: { fontSize: 14, color: "#555" },
  error: { color: "red", marginVertical: 8 },
});

export default HomeScreen;
