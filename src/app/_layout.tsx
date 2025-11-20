import { Stack } from 'expo-router'
import { PrescriptionProvider } from '../context/PrescriptionContext'

export default function layout() {
  return (
    <PrescriptionProvider>
      <Stack screenOptions={{headerShown:false}}/>
    </PrescriptionProvider>
    )
}