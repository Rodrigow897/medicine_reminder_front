import PrescriptionList from '@/src/components/PrescriptionList';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';







export default function Prescriptions(){
    const router = useRouter();

    return(
        <View className='flex-1 items-center bg-[#D7E1EA] gap-14'>
            <View className='mt-20 w-[85%] gap-10'>
                <View className='w-full justify-between items-center flex-row'>
                    <TouchableOpacity
                    onPress={() => router.back()}>
                    <Ionicons name="arrow-back-sharp" size={32} color="black"/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.navigate('/screens/AddPrescription')}
                        className='w-12 h-12 bg-[#334FDC] rounded-full justify-center items-center'>
                        <Ionicons name="add-sharp" size={32} color="white"/>
                    </TouchableOpacity>
                </View>

                <View className='w-full gap-3'>
                    <Text className='text-[20px] font-[800] text-[#334FDC]'>Minhas receitas</Text>
                    <Text className='text-[14px] font-[400]'>Acompanhe seus medicamentos cadastrados e{'\n'}gerencie lembretes</Text>
                </View>
            </View>

            <View className='flex-1 bg-white w-full rounded-t-[30px] items-center py-12'>
                <View className='w-[85%] items-center'>
                    <PrescriptionList/>
                </View>


            </View>
        </View>
    )
}