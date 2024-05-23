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
// Importing authentication context and functions for login and registration
import AuthContext from "../features/authContext";
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from "../features/firebase/userAuth";

// Importing ImagePicker and launchImageLibrary from react-native-image-picker
import { ImagePicker } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';




// Getting the window width of the device
const windowWidth = Dimensions.get('window').width;
// AuthenticationModal component
const AuthenticationModal = ({ modalVisible, setModalVisible }) => {
  // State variables
  const [type, setType] = useState("login");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Context variables for authentication
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // Function to handle login
  const handleLogin = async () => {
    setLoading(true);
    const res = await loginWithEmailAndPassword(email, password); // calling login function with email and password
    if (res.success === true) { // if login successful
      setCurrentUser(res.user); // set current user from response
      setModalVisible(false); // close the modal
      setIsLoggedIn(true); // set the logged in state
    }
    setLoading(false); // stop loading indicator
  };

// Function to handle registration
  const handleRegister = async () => {
    setLoading(true);
    const res = await registerWithEmailAndPassword(name, email, password); // calling register function with name, email, and password
    if (res && res.success === true) { // if registration successful
      setCurrentUser({ name, email, password }); // set current user data
      setModalVisible(false); // close the modal
      setIsLoggedIn(true); // set the logged in state
    }
    setLoading(false); // stop loading indicator
  };

  // Function to select profile picture
  const selectProfilePic = () => {
    const options = {
      title: 'Select Profile Picture', // title for image picker
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    // Launching image library for selecting profile picture
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) { // if user cancels image picker
        console.log('User cancelled image picker');
      } else if (response.error) { // if there's an error during image picking
        console.log('ImagePicker Error: ', response.error);
      } else { // if image is successfully picked
        const source = { uri: response.uri }; // set source URI for profile picture
        setProfilePic(source); // update profile picture state
      }
    });

  };
  // useEffect to check if current user is available
  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true); // if current user exists, set logged in state to true
    }
  }, [currentUser]);
  // Rendering the modal component
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
          {type === "login" ? ( /* render login form if type is login */
            <>
              <Text style={styles.title}>Login</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Email"
              /> 
              <TextInput /* Password input */
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                placeholder="Password"
              />
              <TouchableOpacity /* Login button */
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
              <Text style={styles.title}>Register</Text> {/* Render registration form if type is register*/}
              <TouchableOpacity onPress={selectProfilePic}>  {/* on press to select profile picture */}
                <View style={styles.profilePicContainer}> 
                  {profilePic && <Image source={profilePic} style={styles.profilePic} />} {/* show selected profile picture if available */}
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
              {loading && <ActivityIndicator color="black" />} {/* show loading indicator if loading is true */}
            </> 
          )}
        </View>
      </Pressable>
    </Modal>
  );
};
// Styles for the component
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
