import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { WindowWraper } from "../components/WindowWraper";
import { images } from "../constants/Images";
import { useWindowSize } from "../helper/WindowSize";
import { Input } from "../components/Input";
import { useRouter } from "expo-router";
import { ButtonComponent } from "../components/ButtonComponent";
import { supabase } from "../lib/supabase";
import { Icon } from "../constants/Icon";
import { updateUserData, useAuth } from "../service/authservice";
import { AlertMessages } from "../components/AlertMessages";
import { color } from "@rneui/themed/dist/config";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { currentUserData } = useAuth();
  const router = useRouter();
  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize();
  const { userData } = useAuth();

  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    cancelMsg: "",
    onPressMsg: "",
  });

  const [isError, setIsError] = useState({
    name: false,
    last_name: false,
    email: false,
    country: false,
    card_number: false,
    name_on_card: false,
    expiry_date: false,
    cvv_code: false,
    postal_code: false,
    billin_adress: false,
  });

  const [modelDetail, setModelDetail] = useState({
    name: "",
    last_name: "",
    country: "",
    email: "",
    card_number: "",
    name_on_card: "",
    expiry_date: "",
    cvv_code: "",
    postal_code: "",
    billin_adress: "",
  });

  const handleChange = (name, value) => {
    setModelDetail({ ...modelDetail, [name]: value });

    if (value.trim() !== "") {
      setIsError({ ...isError, [name]: false });
    }
  };

  const submit = async () => {
    // Create a temporary error object for immediate validation checking
    const tempErrors = {
      name: modelDetail.name.trim() === "",
      last_name: modelDetail.last_name.trim() === "",
      email: modelDetail.email.trim() === "",
      country: modelDetail.country.trim() === "",
      card_number:
        modelDetail.card_number.trim() === "" ||
        !/^\d{12,20}$/.test(modelDetail.card_number.trim()),
      // 16 digits for card number
      name_on_card: modelDetail.name_on_card.trim() === "",
      expiry_date:
        modelDetail.expiry_date.trim() === "" ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(
          modelDetail.expiry_date.trim()
        ), // MM/YY format
      cvv_code:
        modelDetail.cvv_code.trim() === "" ||
        !/^\d{3,4}$/.test(modelDetail.cvv_code.trim()), // 3 or 4 digits for CVV
      postal_code: modelDetail.postal_code.trim() === "",
      billin_adress: modelDetail.billin_adress.trim() === "",
    };

    // Update the isError state with the temporary error object
    setIsError(tempErrors);

    // Check if there are any errors in tempErrors
    const hasErrors = Object.values(tempErrors).some((error) => error);
    if (hasErrors) {
      return; // Exit the function if there are validation errors
    }

    // Proceed if no validation errors
    const userDetailtrim = Object.fromEntries(
      Object.entries(modelDetail).map(([key, value]) => [key, value.trim()])
    );

    let userDetail = { ...userDetailtrim };

    const res = await updateUserData(userData?.id, userDetail);
    if (res.error) {
      alert(
        `${
          userData?.language === "es"
            ? "algo salió mal, reintenta de nuevo"
            : "Something went wrong, try again"
        }`
      );
    } else {
      router.replace("/");
    }
  };

  const styles = StyleSheet.create({
    inpuErrorContainer: {
      borderWidth: 2,
      borderColor: "red",
    },
    textErrorStyle: {
      color: "red",
    },
  });

  if (currentUserData) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#161622",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={40} color={`#9C27B0`} />
      </View>
    );
  }
  return (
    <WindowWraper bg="#161622">
      {/*that is the parent container */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          style={{ width: wp(90), height: "100%" }}
          showsHorizontalScrollIndicator={true}
        >
          {/*that is the content container */}
          <View
            style={{
              width: DeviceWidth > 500 ? "500px" : "95%",
              height: "100%",
              alignItems: "center",
              gap: 20,
              shadowColor: "#000",
              shadowOpacity: 0.8,
              shadowRadius: 5,
              elevation: 50,
              shadowOffset: { width: 2, height: 2 },
              paddingBottom: 30,
            }}
          >
            {/*the title and the text */}
            <View style={{ gap: 10, alignItems: "center", width: "90%" }}>
              <Text
                style={{
                  color: "#9C27C0",
                  shadowColor: "#9C27C0",
                  padding: 5,
                  borderRadius: 10,
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 50,
                  shadowOffset: { width: 2, height: 2 },
                }}
              >
                {userData?.language === "es" ? (
                  <> Sección de Bonos Interbridge </>
                ) : (
                  userData?.language === "en" && <> Interbridge Bonus Section</>
                )}
              </Text>
              <Text style={{ color: "white" }}>
                {userData?.language === "es" ? (
                  <>
                    Por favor, ingrese los detalles de la tarjeta donde le
                    gustaría recibir su bono de $600 dólares.
                  </>
                ) : (
                  userData?.language === "en" && (
                    <>
                      Please enter the card details where you'd like to receive
                      your $600 bonus.
                    </>
                  )
                )}
              </Text>
            </View>
            {/*these are the input section */}

            <View
              style={{
                width: "100%",
                gap: 20,
                flex: 1,
                marginVertical: 10,
                alignItems: "center",
              }}
            >
              {/*these are the name and last */}
              <View
                style={{
                  width: "100%",

                  flexDirection: "row",
                  flex: 1,
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <Text style={[{ color: "white", fontFamily: "Roboto" }]}>
                      {userData?.language === "es" ? (
                        <>NOMBRE</>
                      ) : (
                        userData?.language === "en" && <>FIRST NAME</>
                      )}
                    </Text>
                    {isError.name && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <> Se requiere el nombre </>
                        ) : (
                          userData?.language === "en" && (
                            <> First name is required </>
                          )
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "35px", borderRadius: 3 },
                      isError.name && styles.inpuErrorContainer,
                    ]}
                    inputStyles={[
                      {
                        width: "100%",
                        height: "80%",
                        backgroundColor: "white",
                        borderRadius: 3,
                        fontSize: "70%",
                      },
                    ]}
                    placeholder={
                      userData?.language === "es" ? "ejemplo ana" : "e.g., ana"
                    }
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("name", text)}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <Text style={{ color: "white", fontFamily: "Roboto" }}>
                      {userData?.language === "es" ? (
                        <> APELLIDO </>
                      ) : (
                        <> LAST NAME </>
                      )}
                    </Text>{" "}
                    {isError.last_name && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <> El apellido es obligatorio </>
                        ) : (
                          <> Last name is required </>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "35px", borderRadius: 3 },
                      isError.last_name && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder={
                      userData?.language === "es"
                        ? "ejemplo perez"
                        : "e.g., perez"
                    }
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("last_name", text)}
                  />
                </View>
              </View>
              {/*this the country and email */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  flex: 1,
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <Text style={{ color: "white", fontFamily: "Roboto" }}>
                      {userData?.language === "es" ? <>País</> : <>Country</>}
                    </Text>
                    {isError.country && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>El campo 'país' es obligatorio</>
                        ) : (
                          <>country is required</>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      {
                        width: "90%",
                        height: "35px",
                        borderRadius: 3,
                      },
                      isError.country && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder={
                      userData?.language === "es"
                        ? "¿En qué país vives?"
                        : "Where do you live"
                    }
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("country", text)}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <Text style={{ color: "white", fontFamily: "Roboto" }}>
                      {userData?.language === "es" ? (
                        <>CORREO ELECTRÓNICO</>
                      ) : (
                        <>E-MAIL</>
                      )}
                    </Text>
                    {isError.email && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>se requiere correo electronico </>
                        ) : (
                          <> Email is required </>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "35px", borderRadius: 3 },
                      isError.email && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder={
                      userData?.language === "es"
                        ? "ejemplo, anaperez@gmail"
                        : "e.g., anaperez@gmail"
                    }
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("email", text)}
                  />
                </View>
              </View>
            </View>
            {/*this is the card section */}

            {/*this is the card pics */}

            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                <Image
                  resizeMethod="center"
                  style={{
                    width: DeviceWidth > 500 ? "90%" : "80%",
                    height: DeviceWidth > 500 ? "30px" : "30px",
                  }}
                  source={Icon.card}
                />
              </View>
            </View>

            {/* this is the card data section */}

            <View
              style={{
                width: "100%",
                alignItems: "center",
                gap: DeviceWidth > 500 ? 15 : 20,
              }}
            >
              {/* this the card Number section */}
              <View
                style={{
                  width: "95%",
                  flex: 1,
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 30 }}>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      {userData?.language === "es" ? (
                        <>NÚMERO DE TARJETA</>
                      ) : (
                        <>CARD NUMBER</>
                      )}
                    </Text>
                    {isError.card_number && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>Número de tarjeta no válido</>
                        ) : (
                          <>Invalid card number</>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "35px", borderRadius: 3 },
                      isError.card_number && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder={
                      userData?.language === "es"
                        ? "ejemplo, 1234 5678 9012 3456"
                        : "e.g., 1234 5678 9012 3456"
                    }
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("card_number", text)}
                  />
                </View>
              </View>

              {/* this the card NAME ON THE CARD section */}
              <View
                style={{
                  width: "95%",
                  flex: 1,
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 30 }}>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      {userData?.language === "es" ? (
                        <>NOMBRE DEL TITULAR DE LA TARJETA</>
                      ) : (
                        <>CARDHOLDER NAME</>
                      )}
                    </Text>
                    {isError.name_on_card && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>
                            El nombre del titular de la tarjeta es obligatorio
                          </>
                        ) : (
                          <>Cardholder name is required</>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "35px", borderRadius: 3 },
                      isError.name_on_card && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder={
                      userData?.language === "es"
                        ? "ejemplo, John Doe"
                        : "e.g., John Doe"
                    }
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("name_on_card", text)}
                  />
                </View>
              </View>
              {/*these are the Expiration Date and CVV/CVC and zipcode*/}
              <View
                style={{
                  width: "90%",
                  marginTop: 20,
                  flexDirection: "row",
                  flex: 1,
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <Text style={[{ color: "white", fontFamily: "Roboto" }]}>
                      {userData?.language === "es" ? (
                        <>Fecha de caducidad</>
                      ) : (
                        <>Expiration Date</>
                      )}
                    </Text>
                    {isError.expiry_date && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>Fecha de caducidad no válida</>
                        ) : (
                          <>Invalid expiry date</>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "30px", borderRadius: 3 },
                      isError.expiry_date && styles.inpuErrorContainer,
                    ]}
                    inputStyles={[
                      {
                        width: "100%",
                        height: "80%",
                        backgroundColor: "white",
                        borderRadius: 3,
                        fontSize: "70%",
                      },
                    ]}
                    placeholder="MM/YY"
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("expiry_date", text)}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <Text style={{ color: "white", fontFamily: "Roboto" }}>
                      {userData?.language === "es" ? (
                        <>CÓDIGO CVV/CVC</>
                      ) : (
                        <>CVV/CVC CODE</>
                      )}
                    </Text>
                    {isError.cvv_code && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>CVV/CVC no válido</>
                        ) : (
                          <>Invalid CVV/CVC</>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "30px", borderRadius: 3 },
                      isError.cvv_code && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder=""
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("cvv_code", text)}
                  />
                </View>
                {/*this is the codigo postal code */}
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 20 }}>
                    <Text style={{ color: "white", fontFamily: "Roboto" }}>
                      {userData?.language === "es" ? (
                        <>CÓDIGO POSTAL</>
                      ) : (
                        <>POSTAL CODE</>
                      )}
                    </Text>
                    {isError.postal_code && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>El código postal es obligatorio</>
                        ) : (
                          <>Postal code is required</>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      {
                        width: "90%",
                        height: "30px",
                        borderRadius: 3,
                        paddingLeft: 5,
                      },
                      isError.postal_code && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder=""
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("postal_code", text)}
                  />
                </View>
              </View>
              {/* this is the billing adress section */}
              <View
                style={{
                  width: "95%",
                  flex: 1,
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "100%", paddingLeft: 30 }}>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      {userData?.language === "es" ? (
                        <>DIRECCIÓN DE FACTURACIÓN</>
                      ) : (
                        <>BILLING ADDRESS</>
                      )}
                    </Text>
                    {isError.billin_adress && (
                      <Text style={{ color: "red" }}>
                        {userData?.language === "es" ? (
                          <>Se requiere la dirección de facturación</>
                        ) : (
                          <>billing address is required</>
                        )}
                      </Text>
                    )}
                  </View>
                  <Input
                    containerStyles={[
                      { width: "90%", height: "35px", borderRadius: 3 },
                      isError.billin_adress && styles.inpuErrorContainer,
                    ]}
                    inputStyles={{
                      width: "100%",
                      height: "80%",
                      backgroundColor: "white",
                      borderRadius: 3,
                      fontSize: "70%",
                    }}
                    placeholder=""
                    placeholderTextColor="#888"
                    onChangeText={(text) => handleChange("billin_adress", text)}
                  />
                </View>
              </View>
            </View>
            {/*these are the other signup method */}
            <View style={{ width: "100%", alignItems: "center" }}>
              <View
                style={{
                  width: "95%",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    gap: 2,
                    width: "90%",
                    flexDirection: DeviceWidth > 700 ? "row" : "column",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  {userData?.language === "es" ? (
                    <>
                      <Text style={{ color: "white", textAlign: "center" }}>
                        ¿necesitas ayuda? Escríbenos a
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#9C27B0",
                          textAlign: "center",
                        }}
                      >
                        interbridgesupportlsh@gmail.com
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Are you stuck or need help? Text us at{" "}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#9C27B0",
                          textAlign: "center",
                        }}
                      >
                        interbridgesupportlsh@gmail.com
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>
            {/* this the button section */}
            <View
              style={{
                width: "100%",
                paddingBottom: DeviceWidth > 500 ? 10 : 30,
                paddingTop: 10,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: "90%",
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <ButtonComponent
                    containerStyles={{
                      width: "100%",
                      borderRadius: 3,
                      backgroundColor: "#161622",
                      height: "35px",
                      shadowColor: "#000",
                      shadowOpacity: 0.8,
                      shadowRadius: 5,
                      elevation: 50,
                      shadowOffset: { width: 2, height: 2 },
                    }}
                    officialcontainer={{
                      width: "75%",
                      borderRadius: 3,
                      height: "35px",
                    }}
                    textStyles={{ color: "white", fontSize: "80%" }}
                    title={userData?.language === "es" ? "Cancelar" : "Cancel"}
                  />
                </View>
                <View
                  style={{
                    width: "50%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <ButtonComponent
                    containerStyles={{
                      width: "100%",
                      borderRadius: 5,
                      backgroundColor: "#161622",
                      height: "35px",
                      shadowColor: "#000",
                      shadowOpacity: 0.8,
                      shadowRadius: 5,
                      elevation: 50,
                      shadowOffset: { width: 2, height: 2 },
                    }}
                    officialcontainer={{
                      width: "75%",
                      borderRadius: 3,
                      height: "35px",
                    }}
                    textStyles={{ color: "#C738BD", fontSize: "80%" }}
                    title={userData?.language === "es" ? "Enviar" : "Submit"}
                    onPress={submit}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </WindowWraper>
  );
};

export default Signup;
