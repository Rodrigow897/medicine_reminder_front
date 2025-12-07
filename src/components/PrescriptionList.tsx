
import api from '@/src/services/api';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type Prescription = {
  id: string;
  name: string;
  hours: string;
  recurrence: string;
};

type ItemProps = Prescription & {
  onDelete: (id: string) => void;
};

const Item = ({ id, name, hours, recurrence, onDelete }: ItemProps) => (
  <View className={"bg-[#E8EEF3] h-[102px] p-4 gap-3 w-full rounded-2xl mt-4"}>
    <View className="w-full justify-between flex-row">
      <Text className="text-[19px] font-[800] text-[#293C4C]">{name}</Text>

      {/* ➕ Aqui apagamos o item */}
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>

    <View className="flex-row gap-3">
      <View className="w-[74px] h-[28px] bg-[#CAD7E2] flex-row items-center gap-2 px-2 rounded-full">
        <Ionicons name="time-outline" size={14} color="#5F6368" />
        <Text className="text-[#17222B] text-[13px]">{hours}</Text>
      </View>

      <View className="w-[140px] h-[28px] bg-[#CAD7E2] flex-row items-center gap-2 px-2 rounded-full">
        <Ionicons name="repeat-outline" size={15} color="#5F6368" />
        <Text className="text-[#17222B] text-[13px]">{recurrence}</Text>
      </View>
    </View>
  </View>
);

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get<Prescription[]>('/prescriptions');
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Erro ao buscar prescrições:", error);
      }
    };
    fetchPrescriptions();
  }, []);



  return (
    <FlatList
      className="w-full"
      data={prescriptions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          name={item.name}
          hours={item.hours.slice(0,5)}
          recurrence={item.recurrence}
          onDelete={async (id: string) => {
            try {
              await api.delete(`/prescriptions/${id}`);
              setPrescriptions((prev) =>
                prev.filter((prescription) => prescription.id !== id)
              );
            } catch (error) {
              console.error("Erro ao deletar prescrição:", error);
            }
          }}
        />
      )}
    />
  );
};

export default PrescriptionList;
