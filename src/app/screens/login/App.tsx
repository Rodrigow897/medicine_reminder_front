import "@/global.css";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Image, Text, View } from "react-native";

 
export default function App() {
  return (
    <View className="flex-1 flex-col items-center justify-end bg-[#C02636]">
      <View className="h-[300px] w-full items-center justify-center">
        <Image className="h-[48px] w-[204px]" source={require("@/src/app/assets/images/LogoM.png")}/>
      </View>

      <View className="bg-white h-[550px] w-full justify-center items-center rounded-t-3xl flex-col">
        <View className="w-[85%] h-[85%] gap-6">
          <Text className="text-[18px] mt-3 mb-3 Text-[#17222B] font-bold">Entre para acessar suas receitas</Text>

          <View className="w-full gap-3">
            <Text className="Text-[#17222B] font-[600]">E-mail</Text>
            <Input placeholder="email@exemplo.com"/>
          </View>

          <View className="w-full gap-3">
            <Text className="Text-[#17222B] font-[600]">Senha</Text>
            <Input placeholder="Digite sua senha"/>
          </View>
          
          {/*Buttons*/}
          <View className="mt-7 gap-8">
            <Button  
              title="Entrar"
            />
            <Button className="bg-[#17222B]"
              title="Registrar"
            />
          </View>
          
        </View>
      </View>
    </View>
  );
}