import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  useTheme,
} from '@react-navigation/native'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#696969',
    padding: 8,
  },
})

export default function ContentBox({
  title,
  actionBar,
  children,
}: {
  title: string
  actionBar?: React.ReactNode
  children: React.ReactNode
}) {
  const { colors } = useTheme()
  console.log('colors.background', colors.background)
  return (
    <View style={{ ...styles.wrapper, backgroundColor: '#2C2831' }}>
      <View style={styles.header}>
        <Text
          variant="titleSmall"
          style={{ ...styles.headerText, color: colors.text }}
        >
          {title}
        </Text>
        {actionBar}
      </View>
      <View style={{ marginTop: 2 }}>{children}</View>
    </View>
  )
}
