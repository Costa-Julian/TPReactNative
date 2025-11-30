import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ page, totalPages, onChangePage }) => {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <View style={styles.container}>

        <TouchableOpacity
            style={[styles.navButton, page === 1 && styles.disabled]}
            disabled={page === 1}
            onPress={() => onChangePage(page - 1)}
        >
            <Text style={styles.navText}>←</Text>
        </TouchableOpacity>

        {pages.map((p) => (
            <TouchableOpacity
            key={p}
            style={[styles.pageButton, p === page && styles.activePage]}
            onPress={() => onChangePage(p)}
            >
            <Text style={[styles.pageText, p === page && styles.activePageText]}>
                {p}
            </Text>
            </TouchableOpacity>
        ))}

        {/* Botón SIGUIENTE */}
        <TouchableOpacity
            style={[styles.navButton, page === totalPages && styles.disabled]}
            disabled={page === totalPages}
            onPress={() => onChangePage(page + 1)}
        >
            <Text style={styles.navText}>→</Text>
        </TouchableOpacity>

        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 16,
        flexWrap: "wrap",
    },

    pageButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },

    activePage: {
        backgroundColor: "#6200ee",
    },

    pageText: {
        fontSize: 14,
        color: "#333",
    },

    activePageText: {
        color: "white",
        fontWeight: "bold",
    },

    navButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: "#e0e0e0",
    },

    navText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    disabled: {
        opacity: 0.3,
    },
});

export default Pagination;
