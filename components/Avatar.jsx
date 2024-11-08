import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getUserImageUrl } from '../services/ImageService'
import { getUserBannerImageUrl } from '../services/ImageService'
import Feather from '@expo/vector-icons/Feather'
import { useWindowSize } from '../helper/WindowSize'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useAuth } from '../contexts/AuthContext'

const Avatar = ({
  BannerUrl,
  imageUrl,
  size = 35,
  onBannerPress,
  onImagePress,
  color,
  isCamera = true,
}) => {
  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize()

  const { currentUserData } = useAuth()

  const styles = StyleSheet.create({
    container: {
      height: DeviceWidth > 500 ? '40%' : '32%',
      width: DeviceWidth > 500 ? wp(50) : wp(95),
    },
    BannerImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
      borderWidth: 1,
      resizeMode: 'cover',
      padding: 4,
      alignItems: 'center',
      borderColor: '#CDCDE0',
    },
    ProfileImage: {
      width: '80%',
      height: '100%',
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#CDCDE0',
      shadowColor: '#000',
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 10,
      shadowOffset: { width: 2, height: 2 },
    },
    cameraEditBanner: {
      width: DeviceWidth > 500 ? wp(50) : '100%',
      height: '100%',
    },
    cameraEditProfile: {
      width: DeviceWidth > 500 ? '140px' : '100px',
      height: DeviceWidth > 500 ? '130px' : '80px',
      position: 'absolute',
      bottom: DeviceWidth > 500 ? -90 : -60,
      left: 20,
    },
    nameContainer: {
      position: 'absolute',
      right: DeviceWidth > 500 ? "-85%" : "-105%",
      bottom: DeviceWidth > 500 ? "30%" : "15%",
      width: DeviceWidth > 500 ? "100%" : "120%",
      flexDirection: "row",
      alignItems: "center"
    },
    name: {
      color: '#CDCDE0',
      fontSize: "110%",
      fontFamily: 'Roboto',
      fontWeight: '500',
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.cameraEditBanner}>
        <Image style={styles.BannerImage} source={BannerUrl} />
        {isCamera && (
          <MaterialIcons
            style={{ position: 'absolute', right: 10, top: 2 }}
            onPress={onBannerPress}
            name='camera-enhance'
            size={size}
            color={color}
          />
        )}
      </View>

      <View style={styles.cameraEditProfile}>
        <Image style={styles.ProfileImage} source={imageUrl} />
        <View style={styles.nameContainer}>
          
           
            {
              currentUserData && currentUserData?.name && (
                <Text style={styles.name}>@{currentUserData?.name}</Text>
              )
              
            }
            {
              currentUserData && currentUserData?.verified && (
                <MaterialIcons name="verified" size={15} color="#9C27B0" />
              )
            }
        
        </View>
        {isCamera && (
          <MaterialIcons
            style={{ position: 'absolute', right: 10, top: 2 }}
            onPress={onImagePress}
            name='camera-enhance'
            size={size}
            color={color}
          />
        )}
      </View>
    </View>
  )
}

export default Avatar
