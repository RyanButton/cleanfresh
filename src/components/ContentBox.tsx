import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(73, 69, 79, 0.3)',
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
    color: '#fff',
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
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text variant="titleSmall" style={styles.headerText}>
          {title}
        </Text>
        {actionBar}
      </View>
      <View style={{ marginTop: 2 }}>{children}</View>
    </View>
  )
}
