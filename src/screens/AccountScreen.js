import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import AuthContext from '../features/authContext';
import { reauthenticateWithCredential, updatePassword, getAuth, getIdToken } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getIdTokenResult, updatePasswordInDatabase, initializeRecaptchaConfig, RecaptchaParameters, EmailAuthCredential, EmailAuthProvider } from 'firebase/auth';
import { db } from '../../firebase';

const AccountScreen = () => {
    const { currentUser } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || '');
            setEmail(currentUser.email || '');
            const fetchUserDetails = async () => {
                try {
                    const userRef = doc(db, "users", currentUser.uid);
                    const userSnapshot = await getDoc(userRef);
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        if (userData && userData.age) {
                            setAge(userData.age);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
            fetchUserDetails();
        }
    }, [currentUser]);

    const handleSave = async () => {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { name, email, age });
        } catch (error) {
            console.error("Error updating user data:", error);
            setErrorMessage("Failed to update user data.");
        }
    };

    const handleChangePassword = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!currentUser) {
            console.error("Current user not found.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            await updatePassword(user, newPassword);
            setErrorMessage('');
            setNewPassword('');
            setConfirmPassword('');
            setCurrentPassword('');
            setModalVisible(false);
        } catch (error) {
            console.error("Error updating password:", error);
            setErrorMessage("Failed to update password. " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Details</Text>

            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
            <Button title="Save Changes" onPress={handleSave} color="black" />
            <br></br>
            <Button title="Change Password" onPress={() => setModalVisible(true)} color="black" />
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current Password" secureTextEntry={true} />
                        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New Password" secureTextEntry={true} />
                        <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm New Password" secureTextEntry={true} />
                        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                        <Button title="Save Changes" onPress={handleChangePassword} color="black" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold'
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black'
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    },
});

export default AccountScreen;
