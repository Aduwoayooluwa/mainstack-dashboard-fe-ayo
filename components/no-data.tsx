import Image from "next/image";
import ReceiptLongIcon from "@/assets/icons/receipt_long.svg";

export function NoData( { onClearFilter }: { onClearFilter: () => void }) {
    return (
        <div className="flex items-start flex-col  max-w-md w-full mx-auto space-y-5 justify-center h-full">
            
            <Image src={ReceiptLongIcon} alt="receipt long" />

            <h2 className="text-foreground font-bold text-[28px]">
                {"No matching transaction found for the selected filter"}
            </h2>
            <p className="text-[#56616B]">
                {'Change your filters to see more results, or add a new product.'}
            </p>

            <button onClick={onClearFilter} className="hover:bg-[#EFF1F6]/60 transition-all ease-in-out duration-300 cursor-pointer text-foreground bg-[#EFF1F6] w-[117px] h-[48px] font-medium rounded-full">
                {"Clear Filter"}
            </button>
        </div>
    )
}