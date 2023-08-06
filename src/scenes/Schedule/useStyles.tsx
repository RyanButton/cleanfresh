import { StyleSheet } from 'react-native'
import { MD3Theme } from 'react-native-paper'
const useStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    checkbox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 8,
      padding: 2,
    },
    modal: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      color: 'black',
      backgroundColor: theme.colors.background,
      padding: 20,
      paddingBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 8,
    },
  })
}

export default useStyles
