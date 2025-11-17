import { TextInput, TextInputProps } from "react-native";

type props = TextInputProps &{
    placeholder: string;
    label?: string;
}

export default function Input({placeholder}: props){
    return(
        <TextInput className="h-[58px] pl-[10px] pr-[10px] border-[1px] rounded-2xl border-[#A2B9CD] bg-white text-[16px] text-[#17222B]"
            placeholder={placeholder}
            placeholderTextColor="#4D708F"
        />
    )
}