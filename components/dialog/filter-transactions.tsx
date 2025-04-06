import Image from "next/image";
import { Modal } from "./modal";
import { motion } from "framer-motion";
import { useState } from "react";
import { DatePicker } from "../date-picker";
import ExpandMoreIcon from "@/assets/icons/expand_more.svg";
import { MultiSelect } from "../multi-select";

const transactionTypes = [
  { label: "Deposit", value: "deposit" },
  { label: "Withdrawal", value: "withdrawal" },
];

const transactionStatus = [
  { label: "Successful", value: "successful" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

interface FilterTransactionsProps {
  onClose: () => void;
  onApplyFilter: (filters: {
    dateRange: { startDate: string; endDate: string };
    types: string[];
    status: string[];
    filterDay: string;
  }) => void;
  currentFilters: {
    dateRange: { startDate: string; endDate: string };
    types: string[];
    status: string[];
    filterDay: string;
  };
  onClearFilter: () => void;
}

export function FilterTransactions({
  onClose,
  onApplyFilter,
  currentFilters,
  onClearFilter,
}: FilterTransactionsProps) {
  const [dateRange, setDateRange] = useState(currentFilters.dateRange);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    currentFilters.types
  );
  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    currentFilters.status
  );
  const [openPicker, setOpenPicker] = useState<"start" | "end" | null>(null);
  const [selectFilterDay, setSelectFilterDay] = useState<string>(
    currentFilters.filterDay
  );

  const disableApplyFilterButton = !dateRange.startDate && !dateRange.endDate && !selectedTypes.length && !selectedStatus.length && !selectFilterDay;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
  };

  const onSelectFilterDay = (day: string) => {
    setSelectFilterDay(day);
    setDateRange({ startDate: "", endDate: "" });
  };

  const handleApplyFilter = () => {
    onApplyFilter({
      dateRange,
      types: selectedTypes,
      status: selectedStatus,
      filterDay: selectFilterDay,
    });
    onClose();
  };

  const handleClearFilter = () => {
    setDateRange({
      startDate: "",
      endDate: "",
    });
    setSelectedTypes([]);
    setSelectedStatus([]);
    setSelectFilterDay("");
    onClearFilter();
    onClose();
  };

  return (
    <Modal onClose={onClose} title={"Filter"}>
      <motion.div className="max-w-[456px] relative min-h-[600px] lg:min-h-[calc(100dvh-100px)] w-full bg-white rounded-lg">
        {/* filter days */}
        <div className="flex flex-wrap lg:flex-nowrap gap-3 bg-white mt-5 items-center w-full justify-between px-4">
          {["Today", "last 7 days", "This month", "Last 3 months"].map(
            (day) => (
              <button
                onClick={() => onSelectFilterDay(day)}
                key={day}
                className={`px-4 py-2 w-full font-medium h-[44px] text-nowrap grid place-items-center border border-[#EFF1F6] rounded-full  hover:bg-[#EFF1F6] transition-all ease-in-out duration-300 cursor-pointer text-sm
                                    ${
                                      selectFilterDay === day
                                        ? "bg-[#EFF1F6]"
                                        : "bg-white"
                                    }`}
              >
                {day}
              </button>
            )
          )}
        </div>

        {/* date range */}
        <div className="px-4 mt-6">
          <p className="font-medium mb-2">Date Range</p>
          <div className="flex flex-wrap w-full items-center gap-3">
            <div className="flex-1">
              <label className="block">
                <button
                  onClick={() =>
                    setOpenPicker(openPicker === "start" ? null : "start")
                  }
                  className="text-foreground font-medium text-sm w-full lg:w-[203px] h-[48px] rounded-[12px] active:border-foreground focus:border-foreground focus:border-2 active:border-2 flex items-center justify-around transition-all ease-in-out duration-300 active:bg-white bg-[#EFF1F6]"
                >
                  <p>
                    {" "}
                    {dateRange.startDate
                      ? formatDate(dateRange.startDate)
                      : "Start Date"}{" "}
                  </p>
                  <Image src={ExpandMoreIcon} alt="arrow down" />
                </button>
              </label>
              <DatePicker
                isOpen={openPicker === "start"}
                onClose={() => setOpenPicker(null)}
                onSelect={(date) => {
                  setDateRange((prev) => ({ ...prev, startDate: date }));
                  setSelectFilterDay("");
                }}
                selectedDate={dateRange.startDate}
              />
            </div>
            <div className="flex-1 ">
              <label className="block">
                <button
                  onClick={() =>
                    setOpenPicker(openPicker === "end" ? null : "end")
                  }
                  className="text-foreground font-medium text-sm w-full lg:w-[203px] h-[48px] flex items-center justify-around rounded-[12px] active:border-foreground focus:border-foreground focus:border-2 active:border-2 transition-all ease-in-out duration-300 active:bg-white bg-[#EFF1F6]"
                >
                  <p>
                    {" "}
                    {dateRange.endDate
                      ? formatDate(dateRange.endDate)
                      : "End Date"}{" "}
                  </p>
                  <Image src={ExpandMoreIcon} alt="arrow down" />
                </button>
              </label>
              <DatePicker
                isOpen={openPicker === "end"}
                onClose={() => setOpenPicker(null)}
                onSelect={(date) => {
                  setDateRange((prev) => ({ ...prev, endDate: date }));
                  setSelectFilterDay("");
                }}
                selectedDate={dateRange.endDate}
              />
            </div>
          </div>
        </div>

        {/* transaction type */}
        <div className="px-4 mt-6">
          <p className="font-medium mb-2">Transaction Type</p>
          <MultiSelect
            options={transactionTypes}
            value={selectedTypes}
            onChange={setSelectedTypes}
            placeholder="Select Transaction Type"
          />
        </div>

        {/* transaction status */}
        <div className="px-4 mt-6">
          <p className="font-medium mb-2">Transaction Status</p>
          <MultiSelect
            options={transactionStatus}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Select Transaction Status"
          />
        </div>

        <div className="flex items-center gap-6 lg:gap-0 justify-around absolute bottom-0 left-0 right-0 px-4 py-6">
          <button
            onClick={handleClearFilter}
            className="bg-white hover:bg-[#EFF1F6] transition-all ease-in-out duration-300 cursor-pointer text-foreground border border-[#EFF1F6] w-[198px] h-[52px] font-medium rounded-full"
          >
            {"Clear"}
          </button>

          <button
            onClick={handleApplyFilter}
            disabled={disableApplyFilterButton}
            className={`bg-foreground hover:bg-foreground/80 transition-all ease-in-out duration-300 text-background w-[198px] h-[52px] font-medium rounded-full ${disableApplyFilterButton ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {"Apply"}
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
