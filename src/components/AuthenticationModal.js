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
} from "react-native";
import AuthContext from "../features/authContext";
import Logo from "../../assets/logo.png";
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from "../features/firebase/userAuth";

const windowWidth = Dimensions.get('window').width;

const AuthenticationModal = ({ modalVisible, setModalVisible }) => {
  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

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
    if (res.success === true) {
      setCurrentUser({ name, email });
      setModalVisible(false);
      setIsLoggedIn(true);
    }
    setLoading(false);
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
});

export default AuthenticationModal;

