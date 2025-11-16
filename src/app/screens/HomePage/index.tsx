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

            <View className='bg-white flex-1 w-full self-end rounded-t-[30px]'></View>
        </View>
    )
}