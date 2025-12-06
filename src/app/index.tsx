import "@/global.css";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Dimensions, Image, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { useAuth } from "../context/authContext";
import api from "../services/api";

export function Index() {
  const { setUser } = useAuth();  // ← 👉 Pega a função do contexto
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await api.post("users/login", {
        email,
        password,
      });

      const loggedUser = response.data.user; // Ajuste conforme seu backend

      setUser(loggedUser);  // ← 👉 Salva no contexto
      await AsyncStorage.setItem("user", JSON.stringify(loggedUser)); // opcional

      Alert.alert("Login bem-sucedido!");
      router.navigate("/screens/HomePage");
      console.log("Login bem-sucedido:", response.data);

    } catch (error) {
      Alert.alert("Erro", "Erro ao fazer login. Verifique suas credenciais.");
      console.log("Erro ao fazer login:", error);
    }
  }


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
      <View className="h-[300px] w-full items-center justify-center">
        <Image
          className="h-[48px] w-[204px]"
          source={require("@/src/app/assets/images/LogoM.png")}
        />
      </View>

      {/* View animada */}
      <Animated.View
        onLayout={handleLayout}
        style={animatedStyle}
        className="bg-white h-[550px] w-full justify-center items-center rounded-t-3xl flex-col"
      >
        <View className="w-[85%] h-[85%] gap-6">
          <Text className="text-[18px] mt-3 mb-3 Text-[#17222B] font-bold">
            Entre para acessar suas receitas
          </Text>

          <View className="w-full gap-3">
            <Text className="Text-[#17222B] font-[600]">E-mail</Text>
            <Input placeholder="email@exemplo.com" 
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
          </View>

          <View className="w-full gap-3">
            <Text className="Text-[#17222B] font-[600]">Senha</Text>
            <Input placeholder="Digite sua senha" 
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </View>

          {/* Buttons */}
          <View className="mt-7 gap-8">
            <Button className="bg-[#C02636]"
              onPress={handleLogin}
             title="Entrar" />

            <Button className="bg-[#151f27]" title="Registrar"
              onPress={() => router.navigate('/screens/Register')}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

export default Index;