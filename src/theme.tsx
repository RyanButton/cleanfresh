import {
  DefaultTheme as NavLightTheme,
  DarkTheme as NavDarkTheme,
} from '@react-navigation/native'

export const LightTheme = {
  ...NavLightTheme,
  colors: {
    ...NavLightTheme.colors,
    primary: '#6200ee',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#e0e0e0',
    notification: '#ff3d00',
  },
}

export const DarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    primary: '#bb86fc',
    background: '#121212',
    card: '#2C2831',
    text: '#ffffff',
    border: '#2c2c2c',
    notification: '#ff3d00',
  },
}
