import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWindowSize } from '../helper/WindowSize'
import { ScrollView } from 'react-native'

export const WindowWraper = ({ children, bg, style }) => {
  const {wp} = useWindowSize()
  const { top } = useSafeAreaInsets()

  const paddingTop = top > 0 ? top + 1 : 3

  return (
    <View
      style={[{
        flex: 1,
        paddingTop: paddingTop + 5,
        backgroundColor: bg,
        paddingHorizontal: wp(1),
        alignItems: "center"
      }, style]}
    >
      {children}
      
    </View>
  )
}
