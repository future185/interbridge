import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
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
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const Result = () => {
  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize();

  const [isHover, setIsHover] = useState({
    why: false,
    about: false,
    contact: false,
  });

  const [loading, setLoading] = useState(false);

  const [radios1, setIsRadios1] = useState({
    first: false,
    seconde: false,
    third: false,
  });

  const [text, setText] = useState({});
  const [count, setCount] = useState(0);
  const [smsCount, setSmsCount] = useState(0);

  useEffect(() => {
    const insterval = setInterval(() => {
      setSmsCount((prev) => prev + 1);
    }, 7000);

    return () => clearInterval(insterval);
  }, []);

  useEffect(() => {
    if(smsCount === 3){
      router.replace('/about/result')
    }  
  },[smsCount])

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 500);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []); //

  const message = [
    "Please wait while we complete the assessment.",
    "We're still reviewing the assessment thank you for your patience.",
    "The assessment is almost complete—just a moment longer!",
  ];

  const mensage = [
    "Por favor, espera mientras completamos la evaluación.",
    "Seguimos revisando la evaluación gracias por tu paciencia.",
    "La evaluación está casi completa, solo un momento más.",
  ];

  const color = ["#00cec9", "#6c5ce7", "#e84393"]



  const { userData, currentUser } = useAuth();



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
          paddingBottom: 30,
        }}
        style={{ height: "100%" }}
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
        <View
          style={{
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: nameBackground,
              borderLeftColor: "#00cec9",
              borderRightColor: "#6c5ce7",
              borderWidth: 4,
              alignItems: "center",
              justifyContent: "center",
              borderTopColor: "#55efc4",
              borderBottomColor: "#a29bfe",
            }}
          >
            <h1
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                color: nameColor,
              }}
            >
              {count}%
            </h1>
          </View>

          <View style={{width: "100%", alignItems: "center"}}>
            <h1
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                color: color[smsCount],
                textAlign: "center",
              }}
            >
              {userData?.language === "es"
                ? mensage[smsCount]
                : userData?.language === "en" && message[smsCount]}
            </h1>
          </View>
        </View>
      </ScrollView>
    </WindowWraper>
  );
};

export default Result;

const styles = StyleSheet.create({});
