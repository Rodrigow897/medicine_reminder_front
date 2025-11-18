import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function TimeInput() {
  const [time, setTime] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShow(false);

    if (event.type === "set" && selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <View className="w-full h-[58px] pl-[10px] pr-[10px] border-[1px] rounded-2xl border-[#A2B9CD] bg-white text-[16px] text-[#17222B] justify-center items-cemter">
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput
          className=""
          editable={false}
          placeholder="Selecionar hora"
          placeholderTextColor="#999"
          value={time.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
