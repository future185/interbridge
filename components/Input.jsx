import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { Icon } from '../constants/Icon';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useWindowSize } from '../helper/WindowSize';

export const Input = ({
  placeholder,
  keyboardType,
  title,
  onChangeText,
  containerStyles,
  inputStyles,
  placeholderTextColor
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize(); // Make sure useWindowSize returns wp and hp


  const styles = StyleSheet.create({
    container: {
      width: wp(90), // Use wp here
      height: hp(7), // Use hp here
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 12,
      justifyContent: "space-between",
      flexDirection: 'row',
      alignItems: 'center',
    },

  });

  return (
    <View style={[styles.container, containerStyles]}>
      {title && title === 'search' && (
        <AntDesign name='search1' size={22} color='black' />
      )}
      <TextInput
        style={[
          inputStyles,
          {
            textDecorationColor: '#333',
            fontWeight: "semibold",
            fontSize: DeviceWidth > 600? "13px" : "13px", // Use wp here
            outlineStyle: 'none',
            color: "#333"
          },
        ]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={title === 'password' && !showPassword}
        placeholderTextColor={placeholderTextColor}
      />

      {title === 'password' && (
        <TouchableOpacity style={{position: "absolute", right: 0}} onPress={() => setShowPassword(!showPassword)}>
          <Image
            tintColor='#333'
            resizeMode='contain'
            style={{ fontSize: 10, height: 20 }} // Adjusted style
            source={!showPassword ? Icon.eye : Icon.eyeHide}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
