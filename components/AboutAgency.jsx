import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { WindowWraper } from "../components/WindowWraper";
import { ActivityIndicator, ScrollView } from "react-native-web";
import { useWindowSize } from "../helper/WindowSize";
import { useAuth } from "../service/authservice";
import Feather from "@expo/vector-icons/Feather";
import { Loading } from "../components/Loading";
import { router } from "expo-router";
import { agent } from "../constants/agenService";
import { ButtonComponent } from "../components/ButtonComponent";
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Linking } from "react-native";

const Intro = ({
  videoEnUrl,
  videoEsUrl,
  respuesta1,
  answer1,
  respuesta2,
  answer2,
  respuesta3,
  answer3,
  respuesta4,
  answer4,
  respuesta5,
  answer5,
  respuesta6,
  answer6,
  nexRoute,
}) => {
  const { userData, currentUser } = useAuth();

  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize();
  const [isHover, setIsHover] = useState({
    why: false,
    about: false,
    contact: false,
  });

  const [text, setText] = useState({});

  useEffect(() => {
    if (userData?.language === "es") {
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
        Button: "siguiente",
      });
    } else if (userData?.language === "en") {
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
        Button: "Next",
      });
    }
  }, [userData]); // This useEffect depends on the language state

  const videoRef = useRef(null);

  const videoSrc =
    userData?.language === "es"
      ? videoEsUrl
      : userData?.language === "en"
      ? videoEnUrl
      : undefined;

 

  const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#3A82A7",
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 50,
      shadowOffset: { width: 4, height: 4 },
    },
    radios: {
      width: 25,
      height: 25,
      borderColor: "#ddd",
      borderWidth: 2,
      borderRadius: "50%",
      borderWidth: 3,
      cursor: "pointer",
    },
  });

  // set the user profile
  let nameColor;
  let nameBackground;

  switch (userData?.name[0]?.toLowerCase()) {
    case "a":
    case "b":
      nameColor = "#A64CA6"; // royal purple
      nameBackground = "#E0BBE4"; // soft lavender
      break;
    case "c":
    case "d":
      nameColor = "#FF8C42"; // burnt orange
      nameBackground = "#FFDFD3"; // champagne blush
      break;
    case "e":
    case "f":
      nameColor = "#4C9F70"; // forest green
      nameBackground = "#C3E5AE"; // sage green
      break;
    case "g":
    case "h":
      nameColor = "#005B96"; // deep ocean blue
      nameBackground = "#B5EAEA"; // icy mint
      break;
    case "i":
    case "j":
      nameColor = "#D7263D"; // rich crimson
      nameBackground = "#FDE2E4"; // soft rose
      break;
    case "k":
    case "l":
      nameColor = "#6B5B95"; // deep lavender
      nameBackground = "#A6B1E1"; // light periwinkle
      break;
    case "m":
    case "n":
      nameColor = "#FF6F61"; // coral red
      nameBackground = "#FFF5BA"; // pale lemon
      break;
    case "o":
    case "p":
      nameColor = "#D4A5A5"; // dusky pink
      nameBackground = "#E2F0CB"; // pastel green
      break;
    case "q":
    case "r":
      nameColor = "#2A9D8F"; // teal green
      nameBackground = "#C1E1C1"; // soft mint green
      break;
    case "s":
    case "t":
      nameColor = "#C06C84"; // deep pink
      nameBackground = "#FAE1DD"; // peach cream
      break;
    case "u":
    case "v":
      nameColor = "#37718E"; // ocean blue
      nameBackground = "#A9DEF9"; // light sky blue
      break;
    case "w":
    case "x":
      nameColor = "#C46210"; // copper orange
      nameBackground = "#EDE7B1"; // warm vanilla
      break;
    case "y":
    case "z":
      nameColor = "#9B5094"; // plum
      nameBackground = "#F3C5C5"; // blush pink
      break;
    default:
      nameColor = "#333333"; // deep gray as fallback
      nameBackground = "#E8E8E8"; // cool light gray as fallback
  }

  const [loading, setLoading] = useState(false);

  const [radios1, setIsRadios1] = useState({
    first: false,
    seconde: false,
    third: false,
  });

  const [radios2, setIsRadios2] = useState({
    first: false,
    seconde: false,
    third: false,
  });

  const [radios3, setIsRadios3] = useState({
    first: false,
    seconde: false,
    third: false,
  });

  const [radios4, setIsRadios4] = useState({
    first: false,
    seconde: false,
    third: false,
  });

  const [radios5, setIsRadios5] = useState({
    first: false,
    seconde: false,
    third: false,
  });

  const [radios6, setIsRadios6] = useState({
    first: false,
    seconde: false,
    third: false,
  });

  if (!userData || userData?.isbaned) {
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
    <WindowWraper bg="white">
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
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
                    Linking.openURL("https://t.me/flexjobsofficial");
                  }}
                >
                  <FontAwesome5 name="telegram" size={30} color="#3A82A7" />
                </Pressable>
                <Pressable
                  onPointerMove={() => setIsHover({ ...isHover, about: true })}
                  onPointerLeave={() =>
                    setIsHover({ ...isHover, about: false })
                  }
                  onPress={() => {
                    Linking.openURL("https://www.facebook.com/flexjobs");
                  }}
                >
                  <AntDesign name="facebook-square" size={30} color="#3A82A7" />
                </Pressable>
                <Pressable
                  onPointerMove={() =>
                    setIsHover({ ...isHover, contact: true })
                  }
                  onPointerLeave={() =>
                    setIsHover({ ...isHover, contact: false })
                  }
                  onPress={() => {
                    Linking.openURL(
                      "https://www.flexjobs.com/blog/post/10-great-work-home-jobs-stay-home-moms/?msclkid=a206eb7d98de145c05c68c5432966e05&utm_source=bing&utm_medium=cpc&utm_campaign=%5Bsearch%5D%20row_nb_alpha&utm_term=remote%20customer%20service%20jobs&utm_content=remote%20customer%20service%20jobs&network=o&device=c&adposition=&adgroupid=1262240987804098&placement=&adid=&msclkid=a206eb7d98de145c05c68c5432966e05&utm_source=bing&utm_medium=cpc&utm_campaign=%5Bsearch%5D%20row_nb_alpha&utm_term=remote%20customer%20service%20jobs&utm_content=remote%20customer%20service%20jobs"
                    );
                  }}
                >
                  <Fontisto name="world-o" size={30} color="#3A82A7" />
                </Pressable>
                {/*this the user  Profile */}

                <View
                  style={{
                    backgroundColor: nameBackground,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h2
                    style={{
                      color: nameColor,
                      textAlign: "center",
                    }}
                  >
                    {userData?.name[0].toUpperCase()}
                  </h2>
                </View>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: nameBackground,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2
                  style={{
                    color: nameColor,
                    textAlign: "center",
                  }}
                >
                  {userData?.name[0].toUpperCase()}
                </h2>
              </View>
            )}
          </View>
        </View>
        {/* this the body */}

        {/* questions section */}
        <View
          style={[
            {
              alignItems: "center",
              width: DeviceWidth > 700 ? "65%" : "90%",
              paddingHorizontal: 10,
              gap: 30,
              marginBottom: 20,
              marginTop: 30
            },
          ]}
        >
          <View>
            <Text>
              {" "}
              {userData?.language === "es"
                ? respuesta1
                : userData?.language === "en" && answer1}{" "}
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: DeviceWidth > 700 ? "70%" : "85%",
                  paddingVertical: 5,
                }}
              >
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {userData?.language === "es"
                      ? "De acuerdo"
                      : userData?.language === "en" && "Agree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios1({
                        ...radios1,
                        first: true,
                        seconde: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios1.first && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*second one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "Neutral"
                      : userData?.language === "en" && "Neutral"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios1({
                        ...radios1,
                        seconde: true,
                        first: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        {
                          backgroundColor: radios1.seconde && "rgba(0,0,0,0.5)",
                        },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*third one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "En desacuerdo"
                      : userData?.language === "en" && "Disagree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios1({
                        ...radios1,
                        first: false,
                        seconde: false,
                        third: true,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios1.third && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*  */}
              </View>
            </View>
          </View>
          {/* this is the second question */}
          <View>
            <Text>
              {" "}
              {userData?.language === "es"
                ? respuesta2
                : userData?.language === "en" && answer2}{" "}
            </Text>

            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: DeviceWidth > 700 ? "70%" : "85%",
                  paddingVertical: 5,
                }}
              >
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {userData?.language === "es"
                      ? "De acuerdo"
                      : userData?.language === "en" && "Agree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios2({
                        ...radios2,
                        first: true,
                        seconde: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios2.first && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*second one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "Neutral"
                      : userData?.language === "en" && "Neutral"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios2({
                        ...radios2,
                        seconde: true,
                        first: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        {
                          backgroundColor: radios2.seconde && "rgba(0,0,0,0.5)",
                        },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*third one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "En desacuerdo"
                      : userData?.language === "en" && "Disagree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios2({
                        ...radios2,
                        first: false,
                        seconde: false,
                        third: true,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios2.third && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*  */}
              </View>
            </View>
          </View>
          {/* this is the third question section */}
          <View>
            <Text>
              {" "}
              {userData?.language === "es"
                ? respuesta3
                : userData?.language === "en" && answer3}{" "}
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: DeviceWidth > 700 ? "70%" : "85%",
                  paddingVertical: 5,
                }}
              >
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {userData?.language === "es"
                      ? "De acuerdo "
                      : userData?.language === "en" && "Agree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios3({
                        ...radios3,
                        first: true,
                        seconde: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios3.first && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*second one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "Neutral"
                      : userData?.language === "en" && "Neutral"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios3({
                        ...radios3,
                        seconde: true,
                        first: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        {
                          backgroundColor: radios3.seconde && "rgba(0,0,0,0.5)",
                        },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*third one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "En desacuerdo"
                      : userData?.language === "en" && "Disagree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios3({
                        ...radios3,
                        first: false,
                        seconde: false,
                        third: true,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios3.third && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*  */}
              </View>
            </View>
          </View>
           {/* this is the 4th question section */}
           <View>
            <Text>
              {" "}
              {userData?.language === "es"
                ? respuesta4
                : userData?.language === "en" && answer4}{" "}
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: DeviceWidth > 700 ? "70%" : "85%",
                  paddingVertical: 5,
                }}
              >
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {userData?.language === "es"
                      ? "De acuerdo "
                      : userData?.language === "en" && "Agree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios4({
                        ...radios4,
                        first: true,
                        seconde: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios4.first && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*second one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "Neutral"
                      : userData?.language === "en" && "Neutral"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios4({
                        ...radios4,
                        seconde: true,
                        first: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        {
                          backgroundColor: radios4.seconde && "rgba(0,0,0,0.5)",
                        },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*third one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "En desacuerdo"
                      : userData?.language === "en" && "Disagree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios4({
                        ...radios4,
                        first: false,
                        seconde: false,
                        third: true,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios4.third && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*  */}
              </View>
            </View>
          </View>
           {/* this is the 5th question section */}
           <View>
            <Text>
              {" "}
              {userData?.language === "es"
                ? respuesta5
                : userData?.language === "en" && answer5}{" "}
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: DeviceWidth > 700 ? "70%" : "85%",
                  paddingVertical: 5,
                }}
              >
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {userData?.language === "es"
                      ? "De acuerdo "
                      : userData?.language === "en" && "Agree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios5({
                        ...radios5,
                        first: true,
                        seconde: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios5.first && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*second one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "Neutral"
                      : userData?.language === "en" && "Neutral"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios5({
                        ...radios5,
                        seconde: true,
                        first: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        {
                          backgroundColor: radios5.seconde && "rgba(0,0,0,0.5)",
                        },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*third one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "En desacuerdo"
                      : userData?.language === "en" && "Disagree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios5({
                        ...radios5,
                        first: false,
                        seconde: false,
                        third: true,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios5.third && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*  */}
              </View>
            </View>
          </View>
           {/* this is the 6th question section */}
           <View>
            <Text>
              {" "}
              {userData?.language === "es"
                ? respuesta6
                : userData?.language === "en" && answer6}{" "}
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: DeviceWidth > 700 ? "70%" : "85%",
                  paddingVertical: 5,
                }}
              >
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {userData?.language === "es"
                      ? "De acuerdo "
                      : userData?.language === "en" && "Agree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios6({
                        ...radios6,
                        first: true,
                        seconde: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios6.first && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*second one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "Neutral"
                      : userData?.language === "en" && "Neutral"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios6({
                        ...radios6,
                        seconde: true,
                        first: false,
                        third: false,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        {
                          backgroundColor: radios6.seconde && "rgba(0,0,0,0.5)",
                        },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*third one */}
                <View style={{ alignItems: "center", gap: 3 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {userData?.language === "es"
                      ? "En desacuerdo"
                      : userData?.language === "en" && "Disagree"}
                  </Text>
                  <Pressable
                    onPress={() =>
                      setIsRadios6({
                        ...radios6,
                        first: false,
                        seconde: false,
                        third: true,
                      })
                    }
                  >
                    <View
                      style={[
                        styles.radios,
                        { backgroundColor: radios6.third && "rgba(0,0,0,0.5)" },
                      ]}
                    ></View>
                  </Pressable>
                </View>
                {/*  */}
              </View>
            </View>
          </View>
          {/* this is the next */}
          <View
            style={{
              width: DeviceWidth > 700 ? "130px" : "40%",

              height: DeviceWidth > 700 ? "35px" : "30px",
            }}
          >
            <ButtonComponent
              officialcontainer={{
                width: "100%",
                borderRadius: 0,
                height: "100%",
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
                fontSize: "90%",
              }}
              title={`${text.Button}`}
              onPress={() => {
                setLoading(true);
                router.push(nexRoute);
                setLoading(false);
              }}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </WindowWraper>
  );
};

export default Intro;

const styles = StyleSheet.create({});
