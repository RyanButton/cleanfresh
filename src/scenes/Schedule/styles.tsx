import { StyleSheet } from 'react-native'
import { getTheme } from 'react-native-paper/lib/typescript/src/core/theming'
const theme = getTheme()
const styles = StyleSheet.create({
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
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 8,
  },
})

export default styles
