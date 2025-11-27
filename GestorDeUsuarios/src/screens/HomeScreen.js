import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const {items,status,error} = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    },[dispatch]);

    const isLoading = status === 'loading';

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Gestor de Usuarios de Prueba</Text>

        {isLoading && (
            <View style={styles.center}>
            <ActivityIndicator />
            <Text>Cargando usuarios...</Text>
            </View>
        )}

        {status === 'failed' && (
            <Text style={styles.error}>
            Error al obtener usuarios: {error}
            </Text>
        )}

        <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                    />
                    <View style={styles.info}>
                    <Text style={styles.name}>
                        {item.first_name} {item.last_name}
                    </Text>
                    {item.email && (
                        <Text style={styles.email}>{item.email}</Text>
                    )}
                    </View>
                </View>
                )}
                ListEmptyComponent={
                !isLoading && status === 'succeeded' ? (
                    <Text style={styles.empty}>No hay usuarios para mostrar.</Text>
                ) : null
                }
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    center: { alignItems: 'center', marginVertical: 8 },

    card: {
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
    },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold' },
    email: { fontSize: 14, color: '#555' },

    empty: { textAlign: 'center', marginTop: 16, fontStyle: 'italic' },
    error: { color: 'red', marginVertical: 8 },
});

export default HomeScreen;
