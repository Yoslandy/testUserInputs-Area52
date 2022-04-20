import React, { useState, useEffect } from 'react'
import { Keyboard, View, ScrollView, Dimensions, Platform } from 'react-native'
import { useKeyboard } from './myKeyboardHeight'

const { height } = Dimensions.get('screen')

const MyScollView = ({ children }) => {
  const keyboardHeight = useKeyboard()
  //console.log(keyboardHeight)
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <ScrollView>
      {children}
      {keyboardOpen && Platform.OS === 'ios' && (
        <View style={{ height: keyboardHeight - height * 0.08 }}></View>
      )}
    </ScrollView>
  )
}

export default MyScollView
