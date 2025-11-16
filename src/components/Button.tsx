import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
};

export default function Button({ title, className, onPress, ...rest }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full h-[58px] rounded-full justify-center items-center shadow-[#C02636] elevation-md ${className}`}
      {...rest}
    >
      <Text className="text-white font-[800] text-[16px]">{title}</Text>
    </TouchableOpacity>
  );
}
