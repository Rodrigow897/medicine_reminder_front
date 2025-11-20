import Button from '@/src/components/Button';
import Input from '@/src/components/Input';
import DropdownComponent from '@/src/components/InputSelect';
import TimeInput from '@/src/components/TimeInput';
import { usePrescriptions } from "@/src/context/PrescriptionContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";

type PrescriptionData = {
    id: string;
    title: string;
    time: string;
    recurrence: string;
    takeNow: boolean;
}



export default function AddPrescription() {
    const { addPrescription } = usePrescriptions();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const router = useRouter();

    //capturar os valores
    const [prescriptions, setPrescriptions] = useState<PrescriptionData[]>([]);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState<Date>(new Date());
    const [recurrence, setRecurrence] = useState<string>('');
    const [takeNow, setTakeNow] = useState(false);

    const handleAddPrescription = () => {
        if (!title || !time || !recurrence) {
            Alert.alert('Preencha todos os campos');
            return;
        }

        const newPrescription: PrescriptionData = {
            id: new Date().toISOString(),
            title: title,
            time: time
            ? time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
            : "",
            recurrence: recurrence,
            takeNow: isEnabled
        };

        //adicionando na lista
        addPrescription(newPrescription);


        console.log("capturando dados", newPrescription)

        setTitle('');
        setTime(new Date());
        setRecurrence('');
        setTakeNow(false);

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
                            value={title}
                            onChangeText={setTitle}
                            placeholder='Nome do medicamento'
                        />
                    </View>
                    {/*input horario*/}
                    <View className='w-full gap-3'>
                        <Text className='text-[14px] font-[600]' >Horário</Text>
                        <TimeInput
                            value={time || new Date()} 
                            onChangeTime={(selectedTime) => setTime(selectedTime)}
                        />
                    </View>
                    {/*input recorrencia*/}
                    <View className='w-full gap-3'>
                        <Text className='text-[14px] font-[600]' >Recorrência</Text>
                        <DropdownComponent
                            value={recurrence}
                            onChange={(value) => setRecurrence(value)}
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