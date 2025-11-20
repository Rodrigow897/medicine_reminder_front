import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface TimeInputProps {
  value: Date;                     // horário vindo do pai
  onChangeTime: (time: Date) => void; // callback para enviar o horário pro pai
}

export default function TimeInput({ value, onChangeTime }: TimeInputProps) {
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShow(false);

    if (event.type === "set" && selectedTime) {
      onChangeTime(selectedTime);  // Envia o valor para o componente pai
    }
  };

  return (
    <View className="w-full h-[58px] pl-[10px] pr-[10px] border-[1px] rounded-2xl border-[#A2B9CD] bg-white text-[16px] text-[#17222B] justify-center">
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput
          editable={false}
          placeholder="Selecionar hora"
          placeholderTextColor="#999"
          value={
            value
              ? value.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          }
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
