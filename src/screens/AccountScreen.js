import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AccountScreen = () => {
    // Mock user data
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
    });

    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [age, setAge] = useState(userData.age);

    const handleSave = () => {
        // Update user data with new values
        setUserData({
            ...userData,
            name,
            email,
            age,
        });
        // Here you can send updated user data to your backend
        console.log('Updated User Data:', userData);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Details</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                value={age.toString()}
                onChangeText={text => setAge(parseInt(text, 10))}
                placeholder="Age"
                keyboardType="numeric"
            />
            <Button title="Save Changes" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default AccountScreen;
