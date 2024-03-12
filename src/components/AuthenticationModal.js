import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import AuthContext from "../features/authContext";
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from "../features/firebase/userAuth";
// import * as ImagePicker from 'react-native-image-picker';
// import { launchImageLibrary } from 'react-native-image-picker';

import { ImagePicker } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';



const windowWidth = Dimensions.get('window').width;

const AuthenticationModal = ({ modalVisible, setModalVisible }) => {
  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    const res = await loginWithEmailAndPassword(email, password);
    if (res.success === true) {
      setCurrentUser(res.user);
      setModalVisible(false);
      setIsLoggedIn(true);
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    const res = await registerWithEmailAndPassword(name, email, password);
    if (res && res.success === true) { // Check if res.success exists
      setCurrentUser({ name, email, password });
      setModalVisible(false);
      setIsLoggedIn(true);
    }
    setLoading(false);
  };


  const selectProfilePic = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setProfilePic(source);
      }
    });

  };

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <Pressable
        style={styles.overlay}
        onPress={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {type === "login" ? (
            <>
              <Text style={styles.title}>Login</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="Password"
              />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "black" }]}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.switch}>
                <Text>Not a User?</Text>
                <Pressable onPress={() => setType("register")}>
                  <Text style={styles.switchText}>Register</Text>
                </Pressable>
              </View>
              {loading && <ActivityIndicator color="black" />}
            </>
          ) : (
            <>
              <Text style={styles.title}>Register</Text>
              <TouchableOpacity onPress={selectProfilePic}>
                <View style={styles.profilePicContainer}>
                  {profilePic && <Image source={profilePic} style={styles.profilePic} />}
                  <Text style={styles.profilePicText}>Select Profile Picture</Text>
                </View>
              </TouchableOpacity>
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
                keyboardType="email-address"
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="Password"
              />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "black" }]}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.switch}>
                <Text>Already a User?</Text>
                <Pressable onPress={() => setType("login")}>
                  <Text style={styles.switchText}>Login</Text>
                </Pressable>
              </View>
              {loading && <ActivityIndicator color="black" />}
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: windowWidth - 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  switch: {
    flexDirection: "row",
    marginTop: 20,
  },
  switchText: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  profilePicContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profilePicText: {
    marginTop: 5,
  },
});

export default AuthenticationModal;
