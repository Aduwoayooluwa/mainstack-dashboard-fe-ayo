import { useState } from 'react';
import ExpandMoreIcon from "@/assets/icons/expand_more.svg";
import CheckIcon from "@/assets/icons/check.svg";
import Image from "next/image";

interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export function MultiSelect({ options, value, onChange, placeholder = "Select" }: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter(v => v !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    const getDisplayText = () => {
        if (value.length === 0) return placeholder;
        const selectedLabels = options
            .filter(opt => value.includes(opt.value))
            .map(opt => opt.label);
        return selectedLabels.join(", ");
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-[56px] bg-[#EFF1F6] rounded-[12px] px-4 flex items-center justify-between text-left"
            >
                <span className="text-foreground font-medium truncate max-w-[90%]">
                    {getDisplayText()}
                </span>
                <Image 
                    src={ExpandMoreIcon} 
                    alt="expand" 
                    className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-[12px] shadow-lg border border-[#EFF1F6] py-4 z-50">
                    {options.map((option) => (
                        <div 
                            key={option.value}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#EFF1F6]"
                            onClick={() => toggleOption(option.value)}
                        >
                            <div className="w-[17px] h-[17px] border border-[#EFF1F6] rounded mr-3 flex items-center justify-center">
                                {value.includes(option.value) && (
                                    <div className="w-[17px] h-[17px] bg-foreground grid place-items-center rounded-sm">
                                        <Image src={CheckIcon} alt="selected" className="w-2.5 h-2.5" />
                                    </div>
                                )}
                            </div>
                            <span className="text-sm text-foreground">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 