import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type Item = {
  label: string;
  value: string;
};

const data: Item[] = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          className={`absolute left-[22px] top-2 z-50 px-2 bg-white text-[14px] ${
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
        placeholderStyle={{ fontSize: 16 }}
        selectedTextStyle={{ fontSize: 16 }}
        inputSearchStyle={{ fontSize: 16, height: 40 }}
        iconStyle={{ width: 20, height: 20 }}
        data={data}
        search
        maxHeight={175}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
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
