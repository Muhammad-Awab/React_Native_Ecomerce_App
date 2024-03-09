// // import React, { useContext, useState, useEffect } from 'react';
// // import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
// // import AuthContext from '../features/authContext'; // Import your authentication context
// // import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
// // import { doc, updateDoc } from "firebase/firestore";

// // const AccountScreen = () => {
// //     const { currentUser } = useContext(AuthContext); // Access the current user from your authentication context

// //     const [name, setName] = useState('');
// //     const [email, setEmail] = useState('');
// //     const [age, setAge] = useState('');
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [currentPassword, setCurrentPassword] = useState('');
// //     const [newPassword, setNewPassword] = useState('');
// //     const [confirmPassword, setConfirmPassword] = useState('');
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const [modalVisible, setModalVisible] = useState(false);

// //     useEffect(() => {
// //         // Set user data once currentUser is available
// //         if (currentUser) {
// //             setName(currentUser.name || '');
// //             setEmail(currentUser.email || '');
// //             setAge(currentUser.age || '');
// //         }
// //     }, [currentUser]);

// //     const handleSave = async () => {
// //         try {
// //             // Update user data in Firestore
// //             const userRef = doc(db, "users", currentUser.uid);
// //             await updateDoc(userRef, {
// //                 name,
// //                 email,
// //                 age
// //             });
// //             // Display success message or navigate to another screen
// //             // You can add your own logic here
// //         } catch (error) {
// //             console.error("Error updating user data:", error);
// //             // Handle error, display error message, etc.
// //         }
// //     };

// //     const toggleShowPassword = () => {
// //         setShowPassword(!showPassword);
// //     };


// //     const handleChangePassword = async () => {
// //         if (newPassword !== confirmPassword) {
// //             setErrorMessage("Passwords do not match");
// //             return;
// //         }

// //         try {
// //             // Reauthenticate user with current credentials
// //             const credentials = emailAuthProvider.credential(currentUser.email, currentPassword);
// //             await reauthenticateWithCredential(currentUser, credentials);

// //             // Update password in Firebase authentication
// //             await updatePassword(currentUser, newPassword);

// //             // Clear error message and input fields
// //             setErrorMessage('');
// //             setNewPassword('');
// //             setConfirmPassword('');
// //             setCurrentPassword('');
// //             setModalVisible(false);

// //             // Display success message or navigate to another screen
// //             // You can add your own logic here
// //         } catch (error) {
// //             console.error("Error updating password:", error);
// //             setErrorMessage("Failed to update password. Please make sure your current password is correct.");
// //             // Handle error, display error message, etc.
// //         }
// //     };


// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.title}>Account Details</Text>
// //             <TextInput
// //                 style={styles.input}
// //                 value={name}
// //                 onChangeText={setName}
// //                 placeholder="Name"
// //             />
// //             <TextInput
// //                 style={styles.input}
// //                 value={email}
// //                 onChangeText={setEmail}
// //                 placeholder="Email"
// //                 keyboardType="email-address"
// //             />
// //             <View style={styles.passwordContainer}>
// //                 <TextInput
// //                     style={styles.passwordInput}
// //                     value={showPassword ? currentUser.password : '********'}
// //                     editable={false}
// //                     secureTextEntry={!showPassword}
// //                 />
// //                 <Button title={showPassword ? 'Hide Password' : 'Show Password'} onPress={toggleShowPassword} />
// //             </View>
// //             <Button title="Change Password" onPress={() => setModalVisible(true)} />
// //             <Modal
// //                 animationType="slide"
// //                 transparent={true}
// //                 visible={modalVisible}
// //                 onRequestClose={() => setModalVisible(false)}
// //             >
// //                 <View style={styles.centeredView}>
// //                     <View style={styles.modalView}>
// //                         <Text style={styles.modalTitle}>Change Password</Text>
// //                         <TextInput
// //                             style={styles.input}
// //                             value={currentPassword}
// //                             onChangeText={setCurrentPassword}
// //                             placeholder="Current Password"
// //                             secureTextEntry={true}
// //                         />
// //                         <TextInput
// //                             style={styles.input}
// //                             value={newPassword}
// //                             onChangeText={setNewPassword}
// //                             placeholder="New Password"
// //                             secureTextEntry={true}
// //                         />
// //                         <TextInput
// //                             style={styles.input}
// //                             value={confirmPassword}
// //                             onChangeText={setConfirmPassword}
// //                             placeholder="Confirm New Password"
// //                             secureTextEntry={true}
// //                         />
// //                         {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
// //                         <Button title="Save Changes" onPress={handleChangePassword} />
// //                     </View>
// //                 </View>
// //             </Modal>
// //             <Button title="Save Changes" onPress={handleSave} />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         paddingHorizontal: 20,
// //     },
// //     title: {
// //         fontSize: 24,
// //         marginBottom: 20,
// //     },
// //     input: {
// //         width: '100%',
// //         height: 40,
// //         borderColor: 'gray',
// //         borderWidth: 1,
// //         borderRadius: 5,
// //         paddingHorizontal: 10,
// //         marginBottom: 10,
// //     },
// //     passwordContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         marginBottom: 10,
// //     },
// //     passwordInput: {
// //         flex: 1,
// //         height: 40,
// //         borderColor: 'gray',
// //         borderWidth: 1,
// //         borderRadius: 5,
// //         paddingHorizontal: 10,
// //     },
// //     errorMessage: {
// //         color: 'red',
// //         marginTop: 10,
// //     },
// //     centeredView: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     modalView: {
// //         margin: 20,
// //         backgroundColor: 'white',
// //         borderRadius: 20,
// //         padding: 35,
// //         alignItems: 'center',
// //         shadowColor: '#000',
// //         shadowOffset: {
// //             width: 0,
// //             height: 2,
// //         },
// //         shadowOpacity: 0.25,
// //         shadowRadius: 4,
// //         elevation: 5,
// //     },
// //     modalTitle: {
// //         fontSize: 20,
// //         fontWeight: 'bold',
// //         marginBottom: 20,
// //     },
// // });

// // export default AccountScreen;


// import React, { useContext, useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
// import AuthContext from '../features/authContext';
// import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
// import { doc, updateDoc } from "firebase/firestore";
// import { auth, EmailAuthCredential, EmailAuthProvider } from 'firebase/auth';
// import { db } from '../../firebase';


// const AccountScreen = () => {
//     const { currentUser } = useContext(AuthContext);

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [age, setAge] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [modalVisible, setModalVisible] = useState(false);
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');


//     useEffect(() => {
//         if (currentUser) {
//             setName(currentUser.name || '');
//             setEmail(currentUser.email || '');
//             setAge(currentUser.age || '');
//         }
//     }, [currentUser]);

//     const handleSave = async () => {
//         try {
//             const userRef = doc(db, "users", currentUser.uid);
//             await updateDoc(userRef, { name, email, age });
//             // Handle success
//         } catch (error) {
//             console.error("Error updating user data:", error);
//             // Handle error, display error message, etc.

//         }
//     };

//     const handleChangePassword = async () => {
//         if (newPassword !== confirmPassword) {
//             setErrorMessage("Passwords do not match");
//             return;
//         }

//         try {
//             const credentials = EmailAuthProvider.credential(currentUser.email, currentPassword);
//             await reauthenticateWithCredential(currentUser, credentials);
//             await updatePassword(currentUser, newPassword);

//             setErrorMessage('');
//             setNewPassword('');
//             setConfirmPassword('');
//             setCurrentPassword('');
//             setModalVisible(false);

//             // Handle success
//         } catch (error) {
//             console.error("Error updating password:", error);
//             setErrorMessage("Failed to update password. Please make sure your current password is correct.");
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Account Details</Text>
//             <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
//             <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
//             <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
//             <Button title="Save Changes" onPress={handleSave} />
//             <Button title="Change Password" onPress={() => setModalVisible(true)} />
//             <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalTitle}>Change Password</Text>
//                         <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current Password" secureTextEntry={true} />
//                         <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New Password" secureTextEntry={true} />
//                         <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm New Password" secureTextEntry={true} />
//                         {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
//                         <Button title="Save Changes" onPress={handleChangePassword} />

//                     </View>

//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
//     input: {
//         width: '100%',
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         marginBottom: 10,
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     errorMessage: {
//         color: 'red',
//         marginTop: 10,
//     },
// });

// export default AccountScreen;


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
            // Update state with current user's details
            setName(currentUser.name || '');
            setEmail(currentUser.email || '');
            // Assuming age is stored in the user's custom claims or database, fetch it accordingly
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
            // Handle success
        } catch (error) {
            console.error("Error updating user data:", error);
            // Handle error, display error message, etc.

        }
    };

    const handleChangePassword = async () => {

        const auth = getAuth();

        // Obtain the current user from the auth object
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
            // Update the password using Firebase Authentication
            await updatePassword(user, newPassword);
            console.log('Password updated successfully');

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
            <Button title="Save Changes" onPress={handleSave} />
            <Button title="Change Password" onPress={() => setModalVisible(true)} />
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current Password" secureTextEntry={true} />
                        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New Password" secureTextEntry={true} />
                        <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm New Password" secureTextEntry={true} />
                        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                        <Button title="Save Changes" onPress={handleChangePassword} />

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
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
    },
});

export default AccountScreen;



