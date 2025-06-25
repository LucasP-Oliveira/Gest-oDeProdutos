import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useUser } from '../../contexts/UserContext'; 

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { user, logout } = useUser(); 

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Deseja voltar para a tela de Login?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: () => {
                        logout(); 
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            })
                        );
                    }
                }
            ]
        );
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.info}>Não foi possível carregar os dados.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Minhas Informações</Text>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Nome:</Text>
                    <Text style={styles.info}>{user.name}</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.info}>{user.email}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoBox: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    info: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    logoutButton: {
        width: '100%',
        backgroundColor: '#d32f2f',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
