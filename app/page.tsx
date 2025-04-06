"use client";
import AppBar from "@/components/app-bar";
import Chart from "@/components/chart";
import Image from "next/image";
import InfoIcon from "@/assets/icons/info.svg";
import Transactions from "@/components/transactions";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/config/api.service";
import {
  WalletBalanceSkeleton,
  AvailableBalanceSkeleton,
} from "@/components/skeletons/wallet-skeleton";
import { TransactionsListSkeleton } from "@/components/skeletons/transaction-skeleton";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";

const Walletbalance = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-start gap-2 w-full justify-between">
    <div>
      <p className="text-sm text-[#56616B]">{label}</p>
      <p className="text-[24px] lg:text-[28px] font-bold">
        {"USD "}
        {value?.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
    <Image src={InfoIcon} alt="info" />
  </div>
);

export default function Home() {
  const { data: walletData, isLoading: isLoadingWallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: ApiService.getWallet,
  });

  const { data: transactionsData, isLoading: isLoadingTransactions } = useQuery(
    {
      queryKey: ["transactions"],
      queryFn: ApiService.getTransactions,
    }
  );

  return (
    <div className="max-w-[75rem] mx-auto px-4 md:px-6">
      <div className="absolute left-0 md:left-8 top-20 md:top-52">
        <AppBar />
      </div>

      <div className="flex flex-col md:flex-row md:gap-20 pt-10 mb-20">
        <div className="w-full md:min-w-3xl">
          {isLoadingWallet ? (
            <AvailableBalanceSkeleton />
          ) : (
            <section className="flex flex-col md:flex-row md:items-center md:gap-20 gap-4 mb-8">
              <div>
                <p className="text-sm text-[#56616B]">Available Balance</p>
                <p className="text-[24px] lg:text-[28px] font-bold">
                  {"USD"}{" "}
                  {walletData?.balance?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
                </p>
              </div>
              <button className="bg-foreground w-full md:w-[167px] h-[52px] grid place-items-center text-background font-semibold rounded-full">
                Withdraw
              </button>
            </section>
          )}
          {isLoadingTransactions ? <ChartSkeleton /> : <Chart chartData={transactionsData ?? []} />}
        </div>

        <div className="w-full md:w-[456px] flex flex-col mt-8 md:mt-0">
          {isLoadingWallet ? (
            <>
              <WalletBalanceSkeleton />
              <WalletBalanceSkeleton />
              <WalletBalanceSkeleton />
              <WalletBalanceSkeleton />
            </>
          ) : (
            <div className="flex flex-col gap-8 md:gap-13">
              <Walletbalance
                label="Ledger Balance"
                value={walletData?.ledger_balance ?? 0}
              />
              <Walletbalance
                label="Total Payout"
                value={walletData?.total_payout ?? 0}
              />
              <Walletbalance
                label="Total Revenue"
                value={walletData?.total_revenue ?? 0}
              />
              <Walletbalance
                label="Pending Payout"
                value={walletData?.pending_payout ?? 0}
              />
            </div>
          )}
        </div>
      </div>

      {/* transactions */}
      {isLoadingTransactions ? (
        <TransactionsListSkeleton />
      ) : (
        <Transactions data={transactionsData ?? []} />
      )}
    </div>
  );
}
