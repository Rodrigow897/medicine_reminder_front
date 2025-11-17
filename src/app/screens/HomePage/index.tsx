import Button from '@/src/components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";




export default function HomePage(){
    const router = useRouter();

    return(
        <View className="flex-1 bg-[#D7E1EA] items-center gap-14 pt-20">
            <View className="w-[85%] gap-7 items-start">
                <View className="flex justify-between flex-row items-center w-full">
                    <View className="bg-white h-20 w-20 rounded-full flex items-center">
                        {/*jaja eu coloco a imagem aqui*/}
                    </View>
                    <TouchableOpacity
                        onPress={() => router.navigate('/screens/Login/App')}>
                        <MaterialIcons name="logout" size={30} color="red" />
                    </TouchableOpacity>
                </View>

                <View className="flex flex-col items-start w-full gap-2">
                    <Text className='text-[#293C4C] text-[16px] font-[400]'>Boas vindas</Text>
                    <Text className='text-[#17222B] text-[20px] font-[800]'>Rodrigo Wesley</Text>
                </View>
            </View>

            <View className='bg-white flex-1 w-full flex-col items-center rounded-t-[30px]'>

                
                    <View className='w-[326px] h-[112px] bg-[#E8EEF3] flex-row elevation-md mt-14 rounded-2xl p-4 gap-7'>
                        <View className='h-[88px] w-[80px] bg-[#D7E1EA] elevation-sm rounded-xl justify-center items-center'>
                            <MaterialIcons name="receipt-long" size={38} color="blue" />
                        </View>

                        <TouchableOpacity>
                            <View className='gap-3 mt-2 relative'>
                                <AntDesign className='absolute top-0 right-0' name="right" size={20} color="#8dbbe3" />
                                <Text className='text-[#17222B] font-[800] text-[16px]'>Minhas receitas</Text>
                                <Text>Acompanhe os medicamentos {'\n'}e gerencie lembretes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                <View className='w-[326px] h-[112px] bg-[#E8EEF3] flex-row elevation-md mt-6 rounded-2xl p-4 gap-7'>
                    <View className='h-[88px] w-[80px] bg-[#D7E1EA] elevation-sm rounded-xl justify-center items-center'>
                        <Fontisto name="pills" size={36} color="#C02636" />
                    </View>

                    <TouchableOpacity onPress={() => router.navigate('/screens/AddReceipt')}>
                        <View className='gap-3 mt-2 relative'>
                            <AntDesign className='absolute top-0 right-0' name="right" size={20} color="#8dbbe3" />
                            <Text className='text-[#17222B] font-[800] text-[16px]'>Nova r eceita</Text>
                            <Text>Cadastre novos lembretes de{'\n'}receitas</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View className='w-[327px] absolute bottom-12 '>
                    <Button className='flex-row gap-2 bg-[#17222B]'
                        activeOpacity={0.6  }
                        icon={<FontAwesome name="star-o" size={24} color="white" />}
                        title='Avaliar'
                    />
                </View>

            </View>
        </View>
    )
}