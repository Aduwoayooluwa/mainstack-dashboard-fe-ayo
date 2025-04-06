import { useState } from "react";
import ChevronLeftIcon from "@/assets/icons/chevron_left.svg";
import ChevronRightIcon from "@/assets/icons/chevron_right.svg";
import Image from "next/image";

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
  selectedDate?: string;
}

export function DatePicker({
  isOpen,
  onClose,
  onSelect,
  selectedDate,
}: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  if (!isOpen) return null;

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const formatDateString = (year: number, month: number, day: number) => {
    const monthStr = String(month + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${monthStr}-${dayStr}`;
  };

  const handleDateSelect = (day: number) => {
    const dateString = formatDateString(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onSelect(dateString);
    onClose();
  };

  return (
    <div className="absolute top-[12rem] left-4 mt-2 bg-white rounded-[12px] shadow-lg border border-[#EFF1F6] p-4 w-[calc(100%-32px)] mx-auto z-50">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-[#EFF1F6] rounded-full"
        >
          <Image src={ChevronLeftIcon} alt="chevron left" />
        </button>
        <span className="font-medium text-[13.48px]">
          {months[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </span>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-[#EFF1F6] rounded-full"
        >
          <Image src={ChevronRightIcon} alt="chevron right" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-[11.8px] text-[#56616B] font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-[11.8px] gap-1">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
        {days.map((day) => {
          const dateString = formatDateString(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          );
          const isSelected = dateString === selectedDate;

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className={`h-8 w-8 rounded-full grid place-items-center transition-colors
                                ${
                                  isSelected
                                    ? "bg-foreground text-white"
                                    : "hover:bg-[#EFF1F6]"
                                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
