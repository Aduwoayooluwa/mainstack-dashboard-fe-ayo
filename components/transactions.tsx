'use client';
import ExpandMoreIcon from "@/assets/icons/expand_more.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import CallMadeIcon from "@/assets/icons/call_made.svg";
import CallReceivedIcon from "@/assets/icons/call_received.svg";

import Image from "next/image";
import { useState, useMemo } from "react";
import { FilterTransactions } from "./dialog/filter-transactions";
import { NoData } from "./no-data";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'successful':
      return 'text-[#0EA163]';
    case 'pending':
      return 'text-[#A77A07]';
    case 'failed':
      return 'text-[#961100]';
    default:
      return 'text-[#56616B]';
  }
};

interface Transaction {
  amount: number;
  metadata?: {
    name?: string;
    type?: string;
    email?: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  };
  payment_reference?: string;
  status: string;
  type: string;
  date: string;
}

export default function Transactions({ data }: { data: Transaction[] }) {
  const [filterModal, setFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: { startDate: "", endDate: "" },
    types: [] as string[],
    status: [] as string[],
    filterDay: ""
  });

  const filteredTransactions = useMemo(() => {
    let filtered = [...data];

    // Filter by transaction type
    if (filters.types.length > 0) {
      filtered = filtered.filter(t => filters.types.includes(t.type));
    }

    // Filter by status
    if (filters.status.length > 0) {
      filtered = filtered.filter(t => filters.status.includes(t.status));
    }

    // Filter by date range or filter day
    if (filters.filterDay) {
      const today = new Date();
      
      switch (filters.filterDay.toLowerCase()) {
        case 'today':
          filtered = filtered.filter(t => {
            const date = new Date(t.date);
            return date.toDateString() === today.toDateString();
          });
          break;
        case 'last 7 days':
          const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
          filtered = filtered.filter(t => {
            const date = new Date(t.date);
            return date >= sevenDaysAgo;
          });
          break;
        case 'this month':
          filtered = filtered.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === today.getMonth() && 
                   date.getFullYear() === today.getFullYear();
          });
          break;
        case 'last 3 months':
          const threeMonthsAgo = new Date(today.setMonth(today.getMonth() - 3));
          filtered = filtered.filter(t => {
            const date = new Date(t.date);
            return date >= threeMonthsAgo;
          });
          break;
      }
    } else if (filters.dateRange.startDate || filters.dateRange.endDate) {
      const startDate = filters.dateRange.startDate ? new Date(filters.dateRange.startDate) : null;
      if (startDate) startDate.setHours(0, 0, 0, 0);
      
      const endDate = filters.dateRange.endDate ? new Date(filters.dateRange.endDate) : null;
      if (endDate) endDate.setHours(23, 59, 59, 999);
      
      filtered = filtered.filter(t => {
        const date = new Date(t.date);
        date.setHours(0, 0, 0, 0);
        
        if (startDate && endDate) {
          return date >= startDate && date <= endDate;
        } else if (startDate) {
          return date >= startDate;
        } else if (endDate) {
          return date <= endDate;
        }
        return true;
      });
    }

    return filtered;
  }, [data, filters]);

  const onCloseFilterModal = () => {
    setFilterModal(false);
  }

  const onOpenFilterModal = () => {
    setFilterModal(true);
  }

  const handleApplyFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
  }

  const clearFilters = () => {
    setFilters({
      dateRange: { startDate: "", endDate: "" },
      types: [],
      status: [],
      filterDay: ""
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    
    if (filters.filterDay || (filters.dateRange.startDate && filters.dateRange.endDate)) {
      count += 1;
    }
  
    if (filters.types.length > 0) {
      count += 1;
    }
    
    if (filters.status.length > 0) {
      count += 1;
    }
    
    return count;
  };

  const getDateRangeText = () => {
    if (filters.filterDay) {
      return filters.filterDay;
    }

    if (filters.dateRange.startDate) {
      if (filters.dateRange.endDate) {
        const start = new Date(filters.dateRange.startDate);
        const end = new Date(filters.dateRange.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `Your transactions from ${start.toLocaleDateString()} to ${end.toLocaleDateString()} (${days} days)`;
      }

      const start = new Date(filters.dateRange.startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - start.getTime());
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Your transactions for the last ${days} days`;
    }

    return "Your transactions for All Time";
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 justify-between">
        <div className="flex flex-col leading-none">
          <p className="text-[20px] md:text-[24px] font-semibold text-foreground">
            {filteredTransactions.length} transactions
          </p>
          <p className="text-sm text-[#56616B]">
            {getDateRangeText()}
          </p>
        </div>
 
        <div className="flex gap-2 justify-between w-full lg:w-fit">
          <button onClick={onOpenFilterModal} className="bg-[#EFF1F6] text-foreground font-semibold rounded-full w-[48%] lg:w-fit lg:min-w-[107px] h-[48px] flex items-center justify-center gap-2 px-4">
            {"Filter"} {getActiveFiltersCount() > 0 && (<span className="text-background w-[20px] h-[20px] bg-foreground font-medium rounded-full text-xs grid place-items-center">{getActiveFiltersCount()}</span>)}
            <Image src={ExpandMoreIcon} alt="expand more" />
          </button>

          <button className="bg-[#EFF1F6] text-foreground font-semibold rounded-full w-[48%] lg:w-[107px] h-[48px] flex items-center justify-center gap-2">
            {"Export"}
            <Image src={DownloadIcon} alt="download" />
          </button>
        </div>
      </div>

      <div className='w-full h-[1px] bg-[#EFF1F6] mt-5 mb-8' />

      

      <div className="flex flex-col gap-6">
        { filteredTransactions?.length === 0 ? (
          <NoData onClearFilter={clearFilters} />
        ) : (
          filteredTransactions?.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className={`${transaction.type === "deposit" ? "bg-[#E3FCF2]" : "bg-[#FEE3E3]"} w-[48px] h-[48px] rounded-full flex items-center justify-center`}>
                  {
                    transaction.type !== "deposit" ? (
                      <Image src={CallMadeIcon} alt="call made" />
                    ) : (
                      <Image src={CallReceivedIcon} alt="call received" />
                    )
                  }
                </span>

                <div>
                  <p className="text-sm text-foreground font-medium">
                    {transaction?.metadata?.product_name ?? (transaction.type === "withdrawal" ? "Cash Withdrawal" : "Transaction")}
                  </p>
                  <p className={`text-sm ${transaction?.metadata?.name ? 'text-[#56616B]' : getStatusColor(transaction.status)}`}>
                    {transaction.metadata?.name ?? transaction.status}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-bold text-end text-foreground">
                  {"USD"} {transaction.amount?.toLocaleString('en-US', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>

                <p className="text-sm font-medium text-[#56616B]">
                  {new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>


        {filterModal && (
          <FilterTransactions 
            onClose={onCloseFilterModal} 
            onApplyFilter={handleApplyFilter} 
            currentFilters={filters}
            onClearFilter={clearFilters}
          />
        )}
    </div>
  );
}
