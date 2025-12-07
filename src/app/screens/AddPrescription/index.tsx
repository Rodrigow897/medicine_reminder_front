import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import DropdownComponent from '@/src/components/InputSelect';
import TimeInput from '@/src/components/TimeInput';
import { useAuth } from '@/src/context/AuthContext';
import api from '@/src/services/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";

type PrescriptionData = {
    id: string;
    name: string;
    hours: string;
    recurrence: string;
    takenow: boolean;
}



export default function AddPrescription() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previous => {
            const newValue = !previous;
                setTakeNow(newValue); // sincroniza com takenow
            return newValue;
        });
    };
    const router = useRouter();

    
    //capturar os valores
    const { user } = useAuth();
    const [prescriptions, setPrescriptions] = useState<PrescriptionData[]>([]);
    const [name, setName] = useState('');
    const [hours, setHours] = useState<Date>(new Date());
    const [recurrence_id, setRecurrence_id] = useState<string>('');
    const [takeNow, setTakeNow] = useState(false);

    

    async function handleAddPrescription() {
        if (!name || !hours || !recurrence_id) {
            Alert.alert('Preencha todos os campos');
            return;
        }
        try {

        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado!");
            return;
        }


        const response = await api.post<PrescriptionData>('/prescriptions', {
            name,
            hours: hours.toISOString().slice(11, 16),// pega somente HH:mm
            recurrence_id,
            takenow: isEnabled,
            user_id: user.id,
        });

        console.log('Prescrição adicionada com sucesso:', response.data);
        } catch (error) {
            console.log('Erro ao adicionar prescrição:', error);
            Alert.alert('Erro ao adicionar prescrição. Tente novamente.');
            return;
        }

        //voltar para tela das listas
        router.navigate('/screens/Prescriptions');
    }




    return (
        <View className="flex-1 items-center">
            <View className='w-[85%] mt-20 gap-5'>
                <TouchableOpacity activeOpacity={0.4} onPress={() => router.navigate('/screens/HomePage')}>
                    <Ionicons name="arrow-back-sharp" size={32} color="black" />
                </TouchableOpacity>
                <Text className='text-[#C02636] text-[20px] font-[800] '>Nova receita</Text>
                <Text className='text-[15px] font-[400]'>Adicione a sua prescrição médica para receber{'\n'}lembretes de quando tomar seu medicamento</Text>
            </View>
            
            <View className='w-[85%] mt-10 gap-10 flex-1'>
                    {/*input medicamento*/}
                    <View className='w-full gap-3'>
                        <Text className='text-[14px] font-[600]' >Remédio</Text>
                        <Input 
                            value={name}
                            onChangeText={setName}
                            placeholder='Nome do medicamento'
                        />
                    </View>
                    {/*input horario*/}
                    <View className='w-full gap-3'>
                        <Text className='text-[14px] font-[600]' >Horário</Text>
                        <TimeInput
                            value={hours || new Date()} 
                            onChangeTime={(selectedTime) => setHours(selectedTime)}
                        />
                    </View>
                    {/*input recorrencia*/}
                    <View className='w-full gap-3'>
                        <Text className='text-[14px] font-[600]' >Recorrência</Text>
                        <DropdownComponent
                            value={recurrence_id}
                            onChange={(value) => setRecurrence_id(value)}
                        />
                    </View>

                    <View className='w-full items-center flex-row gap-3 '>
                        <Switch className=''
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#90ee90" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text className='text-[16px] font-[400]'>Tomar agora</Text>
                    </View>


                    <Button
                        onPress={handleAddPrescription}
                        icon={<Ionicons name="checkmark-sharp" size={24} color="white" />}
                        className='bg-[#C02636] flex-row gap-3 absolute bottom-14'
                        title='Adicionar'
                    />
            </View>
        </View>
    )
}