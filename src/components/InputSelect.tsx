import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import api from "../services/api";

type RecurrenceFromDB = {
  id: string;
  title: string;
};

type Item = {
  id: string;
  label: string;
};

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const DropdownComponent: React.FC<Props> = ({ onChange, value }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [recurrences, setRecurrences] = useState<Item[]>([]);

  useEffect(() => {
    const fetchRecurrences = async () => {
      try {
        const response = await api.get<RecurrenceFromDB[]>("/recurrence");
        
        // Converter name → label porque o dropdown precisa de labelField
        const mapped = response.data.map((item) => ({
          id: item.id.toString(),
          label: item.title,
        }));

        setRecurrences(mapped);
      } catch (error) {
        console.error("Erro ao buscar recorrências:", error);
      }
    };

    fetchRecurrences();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text className={`absolute left-[22px] z-10 top-[-10] px-2 bg-white text-[14px] ${
          isFocus ? "text-blue-600" : "text-black"
        }`}>
          Recorrência
        </Text>
      );
    }
    return null;
  };

  return (
    <View className="bg-white">
      {renderLabel()}
      <Dropdown
        style={{
          borderWidth: 1,
          borderRadius: 8,
          height: 50,
          paddingHorizontal: 8,
          borderColor: isFocus ? "blue" : "gray",
        }}
        data={recurrences}
        labelField="label"
        valueField="id" // Envia o id para o back-end ✔️
        placeholder={!isFocus ? "Selecione" : "..."}
        value={value}
        maxHeight={175}
        search
        searchPlaceholder="Pesquisar..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.id);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            name="safety"
            size={20}
            color={isFocus ? "blue" : "black"}
            style={{ marginRight: 5 }}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;
