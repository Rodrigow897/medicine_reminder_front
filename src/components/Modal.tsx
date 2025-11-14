import '@/global.css';

import { Image, Modal, Text, View } from "react-native";


export default function ModalLogin(){
    return (
        <Modal transparent animationType="fade" visible={true}>
            {/* Fundo semitransparente para escurecer o resto da tela */}
            <View className="flex-1 flex-col justify-end items-center gap-20 bg-[#C02636]">
                <View className='mb-16 w-[100%] justify-center items-center'>
                    <Image className='h-[56px] w-[250px]' source={require("@/src/app/assets/images/LogoMedicine.png")}/>
                </View>
                {/* Conteúdo do modal — metade da altura da tela */}
                <View className="w-full h-[500px] bg-white rounded-t-3xl p-4 items-center">
                    <View className='w-[85%] pt-8 pb-8'>
                        <Text className="text-[16px] font-boldtext-[#17222B] font-[800] mb-4">Entre para acessar suas receitas</Text>
                        <Text>E-mail</Text>
                    </View>
                </View> 
            </View>
        </Modal>
    )
}