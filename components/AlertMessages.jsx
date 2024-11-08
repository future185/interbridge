import { StyleSheet, Text, View, Modal, Button } from 'react-native'
import React from 'react'
import { useWindowSize } from '../helper/WindowSize'
import { color } from '@rneui/themed/dist/config'
import { TouchableOpacity } from 'react-native'

export const AlertMessages = ({
  show=false,
  title = 'citame',
  message,
  onPress,
  onCancel,
  cancelMsg,
  onPressMgs,
}) => {
  const { wp, hp, DeviceWidth, DeviceHeight } = useWindowSize()

  const styles = StyleSheet.create({})

  return (
    <View>
      <Modal visible={show} transparent={true} animationType='slide'>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <View
            style={{
              width: DeviceWidth > 500 ? '250px' : wp(80),
              backgroundColor: '#161622',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text style={{ color: '#3A82A7', fontWeight: "bold" }}>{title}</Text>
            <View style={{marginTop: 10}}>
              <Text style={{ color: 'white' }}>{message}</Text>
            </View>
            <View style={[{}]}>
              <TouchableOpacity
                style={{
                  color: '#161622',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
                onPress={onCancel}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    backgroundColor: '#3A82A7',
                    height: '22px',
                    borderRadius: 20
                  }}
                >
                  <Text
                    style={{ color: 'white', padding: 10, fontWeight: 'bold', fontSize: "90%" }}
                  >
                    {cancelMsg}
                  </Text>
                </View>
              </TouchableOpacity>
              {onPress && (
                <TouchableOpacity onPress={onPress}>
                  {onPressMgs}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
