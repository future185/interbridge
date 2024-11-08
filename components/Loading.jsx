import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Loading = ({ size, color }) => {
  return (
    <View>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}
