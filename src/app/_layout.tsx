import { Stack } from 'expo-router'
import { PrescriptionProvider } from '../context/PrescriptionContext'
import { AuthProvider } from '../context/authContext'

export default function layout() {
  return (
    <AuthProvider>
      <PrescriptionProvider>
        <Stack screenOptions={{headerShown:false}}/>
      </PrescriptionProvider>
    </AuthProvider>
    )
}