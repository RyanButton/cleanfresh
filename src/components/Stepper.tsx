import React from 'react'
import { IconButton } from 'react-native-paper'
import { StyleSheet, View, Text } from 'react-native'
import {
  useTheme,
} from '@react-navigation/native'

type Props = {
  labels: string[]
  current: number
  setCurrent: (newCurrent: number) => void
}

const styles = StyleSheet.create({
  stepper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default function Stepper({ labels, current, setCurrent }: Props) {
  const { colors } = useTheme()
  const handleDecrement = React.useCallback(() => {
    if (current > 0) {
      setCurrent(current - 1)
    } else {
      setCurrent(6)
    }
  }, [current, setCurrent])

  const handleIncrement = React.useCallback(() => {
    if (current < 6) {
      setCurrent(current + 1)
    } else {
      setCurrent(0)
    }
  }, [current, setCurrent])

  return (
    <View style={styles.stepper}>
      <IconButton icon="chevron-left" size={30} onPress={handleDecrement} />
      <Text style={{ color: colors.text }}>{labels[current]}</Text>
      <IconButton icon="chevron-right" size={30} onPress={handleIncrement} />
    </View>
  )
}
