import { AuthProvider } from '@/src/context/AuthContext'
import { Stack } from 'expo-router'


export default function layout() {
  return (
    <AuthProvider>
        <Stack screenOptions={{headerShown:false}}/>
    </AuthProvider>
    )
}