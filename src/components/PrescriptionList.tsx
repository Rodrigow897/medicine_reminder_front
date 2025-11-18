import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";


const DATA = [
    {
        id: '1',
        title: 'azulzinho',
        time: '12:00',
        recurrence: 'A cada 7 dias'
    },
    {
        id: '2',
        title: 'tadala',
        time: '12:00',
        recurrence: 'A cada 3 horas'
    },
    {
        id: '3',
        title: 'trembo',
        time: '12:00',
        recurrence: 'A cada 12 horas'
    }
]

type Prescription = {
    id: string;
    title: string;
    time: string;
    recurrence: string;
}

const Item = ({title, time, recurrence } : Prescription) => (
    <View className={"bg-[#E8EEF3] h-[102px] p-4 gap-3 w-full rounded-2xl mt-4"}>
        <View className="w-full justify-between flex-row">
            <Text className="text-[19px] font-[800] text-[#293C4C]">{title}</Text>
            <TouchableOpacity><Ionicons name="trash-outline" size={20} color="red" /> </TouchableOpacity>
        </View>
        <View className="flex-row gap-3">
            <View className="w-[74px] h-[28px] bg-[#CAD7E2] flex-row items-center gap-2 px-2 rounded-full">
                <Ionicons name="time-outline" size={14} color="#5F6368" />
                <Text className="text-[#17222B] text-[13px]">{time}</Text>
            </View>

            <View className="w-[140px] h-[28px] bg-[#CAD7E2] flex-row items-center gap-2 px-2 rounded-full">
                <Ionicons name="repeat-outline" size={15} color="#5F6368" />
                <Text className="text-[#17222B] text-[13px]">{recurrence}</Text>
            </View>
        </View>
    </View>
)

const PrescriptionList = () => {  
    return(
            <FlatList className="w-full"
                data={DATA}
                renderItem={({item}) => <Item title={item.title} id={item.id} time={item.time} recurrence={item.recurrence} />}
                keyExtractor={item => item.id}
            />
    )
}

export default PrescriptionList;

