import { Button, Modal, TextInput } from 'react-native-paper'
import { useTheme } from 'react-native-paper'

function TextInputModal({
  visible,
  onDismiss,
  label,
  value,
  onChangeText,
  error,
  mode,
  onSave,
}: {
  visible: boolean
  onDismiss: () => void
  label: string
  value: string
  onChangeText: React.Dispatch<React.SetStateAction<string>>
  error: boolean
  mode: 'flat' | 'outlined' | undefined
  onSave: () => void
}) {
  const theme = useTheme()
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        backgroundColor: theme.colors.background,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        paddingBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 400,
        borderRadius: 8,
      }}
    >
      <TextInput
        label={label}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        mode={mode}
        error={error}
        textColor={theme.colors.secondary}
        autoFocus
      />
      <Button onPress={onSave}>Save</Button>
    </Modal>
  )
}

export default TextInputModal
