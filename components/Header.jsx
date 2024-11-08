import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WindowWraper } from './WindowWraper'
import Ionicons from '@expo/vector-icons/Ionicons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Input } from './Input'
import { useWindowSize } from '../helper/WindowSize'
import { Icon } from '../constants/Icon'
import { getUserImageUrl } from '../services/ImageService'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'expo-router'

export const Header = ({ onChangeText, onSearchGo }) => {
  const { currentUserData } = useAuth()

  const userProfile = getUserImageUrl(currentUserData?.Image)

  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize()

  const router = useRouter()
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      width: '100%',
      height: DeviceWidth > 500 ? hp(6) : '32px',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 20,
    },
    input: {
      width: '95%',
      height: DeviceWidth > 500 ? hp(5) : '28px',
      backgroundColor: '#ffffff',
    },
  })

  return (
    <WindowWraper bg='#161622'>
      <View style={styles.container}>
        <Pressable onPress={() => router.push('/')}>
          <View>
            <AntDesign name='home' size={24} color='white' />
          </View>
        </Pressable>

        <Pressable onPress={onSearchGo} style={{ width: '70%' }}>
          <Input
            title='search'
            inputStyles={styles.input}
            containerStyles={styles.inputContainer}
            placeholder='search models, by price, name, description'
            onChangeText={onChangeText}
          />
        </Pressable>
        <Pressable onPress={() => router.push('welcome')}>
          <Ionicons name='bag-handle-outline' size={24} color='white' />
        </Pressable>
        <Pressable
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => router.push('profile')}
        >
          {!currentUserData && DeviceWidth > 700? (
            <>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 4,
                  borderWidth: 1,
                  borderColor: '#9C27B0',
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  borderRadius: 20,
                  
                }}
              >
                <Image
                  style={{ width: '26px', height: '26px', borderRadius: 20 }}
                  source={userProfile}
                />
                <Text style={{ color: 'white' }}>Login</Text>
              </View>
            </>
          ) : (
            <>
              <Image
                style={{ width: '26px', height: '26px', borderRadius: 20 }}
                source={userProfile}
              />
            </>
          )}
        </Pressable>
      </View>
    </WindowWraper>
  )
}
