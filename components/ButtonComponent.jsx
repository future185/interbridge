import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Loading } from './Loading'
import { useWindowSize } from '../helper/WindowSize'
import { Icon } from '../constants/Icon'

export const ButtonComponent = ({
  title = 'default',
  onPress,
  loading = false,
  containerStyles,
  textStyles,
  facebook,
  instagram,
  model,
  officialcontainer,
  ...props
}) => {
  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize()
  const styles = StyleSheet.create({
    container: {
      width: wp(90),
      height: hp(6),
      alignItems: 'center',
      backgroundColor: '#9C27B0',
      borderRadius: 15,
      justifyContent: 'center',
    },
    text: {
      fontSize: DeviceWidth > 500 ? "12px" : wp(3),
      fontWeight: '900',
      color: '#CDCDE0',
    },
  })

  if (loading) {
    return <Loading size={35} color='#ffb703' />
  }
  return (
    <TouchableOpacity
      style={[
        {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        officialcontainer,
      ]}
      activeOpacity={0.6}
      onPress={onPress}
      {...props}
    >
      {model && <Image style={{ width: 30, height: 30 }} source={Icon.money} />}
      {facebook && (
        <Image style={{ width: 30, height: 30 }} source={Icon.facebook} />
      )}
      {instagram && (
        <Image style={{ width: 24, height: 24 }} source={Icon.instagram} />
      )}
      <View style={[styles.container, containerStyles]}>
        <Text style={[styles.text, textStyles]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}
