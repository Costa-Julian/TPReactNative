import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  clearCreateStatus,
} from "../features/users/usersSlice";
import UserForm from "../components/UserForm";
import Pagination from "../components/Pagination";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { items, status, error, page , totalPages ,createStatus, createError} = useSelector((state) => state.users);

  const isLoading = status === "loading";
  const isSubmitting = createStatus === "loading";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers(1));
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

  const handleChangePage = (newPage) => {
      if (newPage < 1 || newPage > totalPages) return;
      dispatch(fetchUsers(newPage))

  }

  return (
  <View style={styles.container}>
    <Text style={styles.header}>Gestor de Usuarios de Prueba</Text>
    <Pagination 
        page={page} 
        totalPages={totalPages} 
        onChangePage={handleChangePage} 
      />
    {isLoading && (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando usuarios...</Text>
      </View>
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
        contentContainerStyle={{ paddingBottom: 140 }}
      />
    )}
    <View style={styles.paginationWrapper}>
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        onChangePage={handleChangePage} 
      />
    </View>
    <View style={styles.formWrapper}>
      <UserForm onSubmit={handleCreateUser} isSubmitting={isSubmitting} />
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#fff",
    marginBottom: 8,
    elevation: 3,
  },

  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },

  info: { flex: 1 },

  name: { fontSize: 16, fontWeight: "bold" },

  email: { fontSize: 14, color: "#555" },

  paginationWrapper: {
    position: "absolute",
    bottom: 110,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },

  formWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 10,
  },
});

export default HomeScreen;
