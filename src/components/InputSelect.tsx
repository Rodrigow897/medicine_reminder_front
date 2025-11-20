import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type Item = {
  label: string;
  value: string;
};

const data: Item[] = [
  { label: "A cada 3 horas", value: "1" },
  { label: "A cada 4 horas", value: "2" },
  { label: "A cada 6 horas", value: "3" },
  { label: "A cada 12 horas", value: "4" },
  { label: "A cada 1 dia", value: "5" },
  { label: "A cada 2 dias", value: "6" },
  { label: "A cada 3 dias", value: "7" },
  { label: "A cada 4 dias", value: "8" },
  { label: "A cada 5 dias", value: "9" },
  { label: "A cada 6 dias", value: "10" },
  { label: "A cada 7 dias", value: "11" },
  { label: "A cada 8 dias", value: "12" },
];

const DropdownComponent: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          className={`absolute left-[22px] top-[-8] z-50 px-2 bg-white text-[14px] ${
            isFocus ? "text-blue-600" : "text-black"
          }`}
        >
          Recorrência
        </Text>
      );
    }
    return null;
  };

  return (
    <View className="bg-white ">
      {renderLabel()}

      <Dropdown
        style={{
          borderWidth: 1,
          borderRadius: 8,
          height: 50,
          paddingHorizontal: 8,
          borderColor: isFocus ? "blue" : "gray",
        }}
        placeholderStyle={{ fontSize: 16, }}
        selectedTextStyle={{ fontSize: 16 }}
        inputSearchStyle={{ fontSize: 16, color:'#9ca3af', height: 40 }}
        iconStyle={{ width: 20, height: 20 }}
        data={data}
        search
        maxHeight={175}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Selecione" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: Item) => {
          setValue(item.value);
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
