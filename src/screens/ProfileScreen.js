import React, { useContext, useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import User from "../../assets/user.png";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";
import { db } from '../../firebase';

import { getDoc, doc } from "firebase/firestore";

const account = require("../../assets/icon.png");
const help = require("../../assets/icon.png");
const notification = require("../../assets/icon.png");
const setting = require("../../assets/icon.png");

const ProfileScreen = ({ navigation }) => {
    const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = async () => {
        const res = await logout();
        if (res.success === true) {
            ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
            setIsLoggedIn(false);
            setCurrentUser(null);
        }
    };

    const [profilePicUrl, setProfilePicUrl] = useState(null);

    useEffect(() => {
        const fetchProfilePic = async () => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userRef);
                const userData = userDoc.data();
                setProfilePicUrl(userData.profilePicUrl);
            }
        };

        fetchProfilePic();
    }, [currentUser]);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.topSection}>
                    <View style={styles.propicArea}>
                        <Image source={User} style={styles.propic} />
                    </View>
                </View>

                <View style={styles.buttonList}>
                    {isLoggedIn ? (
                        <View style={styles.buttonSection}>
                            <TouchableOpacity style={styles.buttonArea} onPress={() => navigation.navigate('accountscreen')}>
                                <Image source={account} style={styles.buttonIcon} />
                                <Text style={styles.buttonName}>Account</Text>
                            </TouchableOpacity>
                            <View style={styles.sp}></View>

                            <TouchableOpacity style={styles.buttonArea} onPress={() => navigation.navigate('cart-screen')}>
                                <Image source={notification} style={styles.buttonIcon} />
                                <Text style={styles.buttonName}>My Cart</Text>
                            </TouchableOpacity>
                            <View style={styles.sp}></View>

                            <TouchableOpacity style={styles.buttonArea} onPress={() => navigation.navigate('orderscreen')}>
                                <Image source={help} style={styles.buttonIcon} />
                                <Text style={styles.buttonName}>My Products</Text>
                            </TouchableOpacity>
                            <View style={styles.sp}></View>

                            <TouchableOpacity style={styles.buttonArea} onPress={() => navigation.navigate('settings')}>
                                <Image source={setting} style={styles.buttonIcon} />
                                <Text style={styles.buttonName}>Settings</Text>
                            </TouchableOpacity>
                            <View style={styles.sp}></View>
                        </View>
                    ) : (
                        <View style={styles.buttonSection}>
                            <Text style={styles.buttonName}>Login to view your Profile!</Text>
                        </View>
                    )}
                </View>
            </View>

            {isLoggedIn && (
                <View style={styles.logoutButton}>
                    <Pressable onPress={handleLogout}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>Log Out</Text>
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    topSection: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    propicArea: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 30,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#FFBB3B'
    },
    propic: {
        width: '100%',
        height: '100%',
    },
    buttonList: {
        marginTop: 20,
    },
    buttonSection: {
        marginBottom: 20,
    },
    buttonArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    buttonName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    sp: {
        height: 1,
        backgroundColor: '#00000045'
    },
    logoutButton: {
        backgroundColor: "black",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    }
});

export default ProfileScreen;
