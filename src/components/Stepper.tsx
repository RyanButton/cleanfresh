import React from 'react'
import { IconButton, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'

type Props = {
  labels: string[]
  onChange: () => void
}

const styles = StyleSheet.create({
  stepper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default function Stepper({ labels }: Props) {
  const [current, setCurrent] = React.useState(0)
  const handleDecrement = React.useCallback(() => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }, [current, setCurrent])

  const handleIncrement = React.useCallback(() => {
    if (current <= labels.length) {
      setCurrent(current + 1)
    }
  }, [current, labels.length, setCurrent])

  return (
    <div className="stepper" style={styles.stepper}>
      <IconButton icon="chevron-left" size={30} onPress={handleDecrement} />
      <Text>{labels[current]}</Text>
      <IconButton icon="chevron-right" size={30} onPress={handleIncrement} />
    </div>
  )
}
