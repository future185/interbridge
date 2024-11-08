import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { WindowWraper } from "../../components/WindowWraper";
import { images } from "../../constants/Images";
import { Icon } from "../../constants/Icon";
import { useWindowSize } from "../../helper/WindowSize";
import styled from "styled-components/native";
import Feather from "@expo/vector-icons/Feather";
import { Input } from "../../components/Input";
import { ScrollView } from "react-native-web";
import { ButtonComponent } from "../../components/ButtonComponent";
import { supabase } from "../../lib/supabase";
import { AlertMessages } from "../../components/AlertMessages";
import { useAuth } from "../../service/authservice";
import { useRouter, useSegments } from "expo-router";
import { agent, agente } from "../../constants/agenService";
import { Loading } from "../../components/Loading";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const index = () => {
  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize();
  const [isHover, setIsHover] = useState({
    why: false,
    about: false,
    contact: false,
  });

  const [agenDetail, setAgentDetail] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    card_number: "",
    name_on_card: "",
    expiry_date: "",
    cvv_code: "",
    postal_code: "",
    billin_adress: "",
  });

  const [isError, setIsError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [language, setLanguage] = useState({
    en: true,
    es: false,
  });

  const [userLanguage, setUserLanguage] = useState("");

  const [text, setText] = useState({});

  const [alertMsg, setAlertMSg] = useState({
    show: false,
    title: "",
    message: "",
    buttonText: "ok",
  });

  const handleChange = (name, value) => {
    setAgentDetail({ ...agenDetail, [name]: value });

    if (value.trim() !== "") {
      setIsError({ ...isError, [name]: false });
    }
  };

  const handleBoxChange = (language1, value1, language2, value2) => {
    setLanguage({
      [language1]: value1,
      [language2]: value2,
    });
  };

  useEffect(() => {
    if (language.es) {
      setText({
        why: "¿Porque InterBridge?",
        about: "¿Que somos?",
        help: "Ayuda",
        guide: `"¡Hola, bienvenido a Interbridge! Ingrese su nombre, correo electrónico y contraseña para registrarse. Una vez que haya terminado, presione 'Empezar' para comenzar la prueba. ¡Buena suerte!"`,
        name: "Nombre",
        nameEg: "Por ejemplo, ANA",
        email: "Correo electrónico",
        emailEg: "ingresa tu Correo electrónico",
        password: "contraseña",
        passwordEg: "ingresa tu contraseña",
        Button: "Empezar",
      });
    } else if (language.en) {
      setText({
        why: "why InterBridge?",
        about: "about us",
        help: "help",
        guide: `Hey, welcome to Interbridge! Please enter your name, email, and password to register. Once you're done, press 'Start' to begin the test. Good luck!`,
        name: "Name",
        nameEg: "e.g., ANA",
        email: "E-mail",
        emailEg: "Enter your email",
        password: "Password",
        passwordEg: "Enter your password",
        Button: "Start",
      });
    }

    if (language.en) {
      setUserLanguage("en");
    } else if (language.es) {
      setUserLanguage("es");
    }
  }, [language]); // This useEffect depends on the language state


  const [loading, setIsLoading] = useState(false);

  const submit = async () => {
    const errors = {
      name: agenDetail.name.trim() === "",
      email:
        agenDetail.email.trim() === "" ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          agenDetail.email.trim()
        ),
      password: agenDetail.password.trim() === "",
    };

    setIsError(errors);

    // If any errors exist, return early
    if (errors.name || errors.email || errors.password) {
      return;
    }

    let { name, email, password } = { ...agenDetail };

    name = name.trim();
    email = email.trim();
    password = password.trim();

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          email,
          password,
          language: userLanguage,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      let errorMessage = "";

      switch (error.name) {
        case "Invalid login credentials":
          errorMessage = "Credenciales de inicio de sesión no válidas";
          break;
        case "Email already registered":
          errorMessage = "El correo electrónico ya está registrado";
          break;
        case "AuthWeakPasswordError":
          errorMessage = "La contraseña es demasiado débil";
          break;
        case "Password should be at least 6 characters":
          errorMessage = "La contraseña debe tener al menos 6 caracteres";
          break;
        default:
          errorMessage = "Ocurrió un error: " + error.message;
      }

      setAlertMSg({
        ...alertMsg,
        show: true,
        title: userLanguage === "en" ? "Sign up" : "Registrarse",
        message: userLanguage === "en" ? error.message : errorMessage,
        buttonText: "Ok",
      });
    }
  };

  const { userData, currentUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <WindowWraper bg="white">
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading color="#3A82A7" size={40} />
        </View>
      </WindowWraper>
    );
  }

  return (
    <WindowWraper bg="white" style={{ paddingHorizontal: 0 }}>
      {/*this is the header */}
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          shadowColor: "#3A82A7",
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 50,
          shadowOffset: { width: 4, height: 4 },
          marginBottom: 4,
          width: wp(100),
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-ends",
          }}
        >
          <View>
            <Text
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: "70%", // Adjust this value for more/less rounding
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderBottomWidth: 5,
                borderBottomColor: "#3A82A7",
                fontSize: "90%",
                fontStyle: "italic",
                fontFamily: "Roboto",
                fontWeight: "bold",
              }}
            >
              InterBridge-LT
            </Text>
          </View>

          {DeviceWidth > 700 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "40%",
                alignItems: "flex-end",
                marginRight: 20,
              }}
            >
              <Pressable
                onPointerMove={() => setIsHover({ ...isHover, why: true })}
                onPointerLeave={() => setIsHover({ ...isHover, why: false })}
                onPress={() => {
                  Linking.openURL("https://t.me/flexjobsofficial")
                }}
              >
                <FontAwesome5 name="telegram" size={30} color="#3A82A7" />
              </Pressable>
              <Pressable
                onPointerMove={() => setIsHover({ ...isHover, about: true })}
                onPointerLeave={() => setIsHover({ ...isHover, about: false })}
                onPress={() => {
                  Linking.openURL("https://www.facebook.com/flexjobs")
                }
                }
              >
                <AntDesign name="facebook-square" size={30} color="#3A82A7" />
              </Pressable>
              <Pressable
                onPointerMove={() => setIsHover({ ...isHover, contact: true })}
                onPointerLeave={() =>
                  setIsHover({ ...isHover, contact: false })
                }
                onPress={ () => {
                  Linking.openURL(
                    "https://www.flexjobs.com/blog/post/10-great-work-home-jobs-stay-home-moms/?msclkid=a206eb7d98de145c05c68c5432966e05&utm_source=bing&utm_medium=cpc&utm_campaign=%5Bsearch%5D%20row_nb_alpha&utm_term=remote%20customer%20service%20jobs&utm_content=remote%20customer%20service%20jobs&network=o&device=c&adposition=&adgroupid=1262240987804098&placement=&adid=&msclkid=a206eb7d98de145c05c68c5432966e05&utm_source=bing&utm_medium=cpc&utm_campaign=%5Bsearch%5D%20row_nb_alpha&utm_term=remote%20customer%20service%20jobs&utm_content=remote%20customer%20service%20jobs",
                  )}
                }
              >
                <Fontisto name="world-o" size={30} color="#3A82A7" />
              </Pressable>
            </View>
          ) : (
            <View>
              <Pressable>
                <Feather name="menu" size={24} color="black" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <AlertMessages
        show={alertMsg.show}
        title={alertMsg.title}
        message={alertMsg.message}
        cancelMsg={alertMsg.buttonText}
        onCancel={() => setAlertMSg({ ...alertMsg, show: false })}
      />
      {/*this is the body */}
      <View style={{ flex: 1 }}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
          source={images.ImageBackground}
        >
          <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 20,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  width: DeviceWidth > 500 ? "80%" : "95%",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderRadius: 10,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  paddingBottom: 20,
                }}
              >
                {/* this the input box */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: DeviceWidth > 700 ? "50%" : "90%",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "30%",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        borderRadius: 10,
                        accentColor: "#3A82A7",
                      }}
                      onChange={() => handleBoxChange("en", false, "es", true)}
                      checked={language.es}
                    />

                    <View style={{ width: "100%" }}>
                      <Text style={{ color: "white", fontSize: "95%" }}>
                        Español
                      </Text>
                    </View>
                  </View>
                  {/*english */}
                  <View
                    style={{
                      flexDirection: "row",
                      width: "30%",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ borderRadius: 10, accentColor: "#3A82A7" }}
                      onChange={() => handleBoxChange("en", true, "es", false)}
                      checked={language.en}
                    />
                    <View style={{ width: "100%" }}>
                      <Text style={{ color: "white", fontSize: "95%" }}>
                        English
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    borderRadius: 5,
                    marginTop: 10,
                    paddingHorizontal: 3,
                  }}
                >
                  <h1 style={{ color: "white", textAlign: "center" }}>
                    {text.guide}
                  </h1>
                </View>

                {/*input section */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: DeviceWidth > 700 ? "row" : "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: DeviceWidth > 700 ? 5 : 13,
                  }}
                >
                  {/* this is the user name section */}
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      alignItems: "center",
                      width: DeviceWidth > 700 ? "30%" : "85%",
                      borderRadius: 10,
                      paddingVertical: 8,
                      gap: 5,
                    }}
                  >
                    <View style={{ width: "92%", gap: 3 }}>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "left",
                          fontFamily: "Roboto",
                          textTransform: "uppercase",
                        }}
                      >
                        {text.name}
                      </Text>
                      {isError.name && (
                        <Text style={{ color: "red" }}>
                          {userLanguage === "en"
                            ? "Your name is required"
                            : userLanguage === "es" && "Se requiere tu nombre"}
                        </Text>
                      )}
                    </View>
                    <Input
                      containerStyles={{
                        width: "95%",
                        height: DeviceWidth > 700 ? "33px" : "45px",
                        borderRadius: 5,
                      }}
                      inputStyles={{ width: "95%" }}
                      placeholder={`${text.nameEg}`}
                      placeholderTextColor="#888"
                      onChangeText={(text) => handleChange("name", text)}
                    />
                  </View>
                  {/* E-mail section */}
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      alignItems: "center",
                      width: DeviceWidth > 700 ? "30%" : "85%",
                      borderRadius: 10,
                      paddingVertical: 8,
                      gap: 5,
                    }}
                  >
                    <View style={{ width: "92%", gap: 3 }}>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "left",
                          fontFamily: "Roboto",
                          textTransform: "uppercase",
                        }}
                      >
                        {text.email}
                      </Text>
                      {isError.email && (
                        <Text style={{ color: "red" }}>
                          {userLanguage === "en"
                            ? "Invalid email"
                            : userLanguage === "es" &&
                              "Correo electrónico no válido"}
                        </Text>
                      )}
                    </View>
                    <Input
                      containerStyles={{
                        width: "95%",
                        height: DeviceWidth > 700 ? "33px" : "45px",
                        borderRadius: 5,
                      }}
                      inputStyles={{ width: "95%" }}
                      placeholder={`${text.emailEg}`}
                      placeholderTextColor="#888"
                      onChangeText={(text) => handleChange("email", text)}
                    />
                  </View>
                  {/* password section */}
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      alignItems: "center",
                      width: DeviceWidth > 700 ? "30%" : "85%",
                      borderRadius: 10,
                      paddingVertical: 8,
                      gap: 5,
                    }}
                  >
                    <View style={{ width: "92%", gap: 3 }}>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "left",
                          fontFamily: "Roboto",
                          textTransform: "uppercase",
                        }}
                      >
                        {text.password}
                      </Text>
                      {isError.password && (
                        <Text style={{ color: "red" }}>
                          {userLanguage === "en"
                            ? "Password is required"
                            : userLanguage === "es" && " Ingresa tu contraseña"}
                        </Text>
                      )}
                    </View>
                    <Input
                      containerStyles={{
                        width: "95%",
                        height: DeviceWidth > 700 ? "33px" : "45px",
                        borderRadius: 5,
                      }}
                      inputStyles={{ width: "95%", height: "90%" }}
                      placeholder={`${text.passwordEg}`}
                      placeholderTextColor="#888"
                      onChangeText={(text) => handleChange("password", text)}
                    />
                  </View>
                </View>

                {/* this the button component */}
                <View
                  style={{
                    width: DeviceWidth > 700 ? "120px" : "40%",
                    backgroundColor: "#3A82A7",
                    marginTop: 20,
                  }}
                >
                  <ButtonComponent
                    officialcontainer={{
                      width: "100%",
                      borderRadius: 0,
                      height: "40px",
                    }}
                    containerStyles={{
                      width: "100%",
                      borderRadius: 0,
                      flex: 1,
                      backgroundColor: "#3A82A7",
                      height: "100%",
                    }}
                    textStyles={{
                      textTransform: "uppercase",
                      color: "white",
                    }}
                    title={`${text.Button}`}
                    onPress={submit}
                    loading={loading}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </WindowWraper>
  );
};

export default index;
