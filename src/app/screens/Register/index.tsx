import "@/global.css";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";

export default function Register() {
  const router = useRouter();

  // Altura da tela para garantir que a view comece totalmente fora da tela
  const screenHeight = Dimensions.get("window").height;

  const translateY = useSharedValue(screenHeight); // começa completamente fora da tela
  const scale = useSharedValue(0.9);
  const alreadyAnimated = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  const handleLayout = useCallback(() => {
    if (alreadyAnimated.value) return;
    alreadyAnimated.value = true;

    // animação de subida
    translateY.value = withTiming(0, { duration: 600 });

    // efeito de leve pingpong
    scale.value = withSequence(
      withTiming(1.03, { duration: 150 }),
      withSpring(1, { damping: 8 })
    );
  }, []);

  return (
    <View className="flex-1 flex-col items-center justify-end bg-[#C02636]">
      <View className="h-[200px] w-full items-center justify-center">
        <Image
          className="h-[48px] w-[204px]"
          source={require("@/src/app/assets/images/LogoM.png")}
        />
      </View>

      {/* View animada */}
      <Animated.View
        onLayout={handleLayout}
        style={animatedStyle}
        className="bg-white h-[650px] w-full justify-center items-center rounded-t-3xl flex-col"
      >
        <View className="w-[85%] h-[85%] gap-6">
          <Text className="text-[18px] mt-3 mb-3 Text-[#17222B] font-bold">
            Entre para acessar suas receitas
          </Text>

          <View className="w-full gap-3">
            <Text className="Text-[#17222B] font-[600]">E-mail</Text>
            <Input placeholder="email@exemplo.com" />
          </View>

          <View className="w-full gap-3">
            <Text className="Text-[#17222B] font-[600]">Senha</Text>
            <Input placeholder="Crie uma senha" />
          </View>

          <View className="w-full gap-3">
            <Text className="Text-[#17222B] font-[600]">Nome</Text>
            <Input placeholder="ex: Elias" />
          </View>

          {/* Buttons */}
          <View className="mt-7 gap-8">
            <Button className="bg-[#C02636]" 
              title="Salvar" 
            />
            <Button className="bg-[#162029]" title="Voltar"
              onPress={() => router.navigate('/screens/Login/App')}
           />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}