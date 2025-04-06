import Image from "next/image";
import ProductIcon1 from "@/assets/icons/product_icon_1.svg";
import ProductIcon2 from "@/assets/icons/product_icon_2.svg";
import ProductIcon3 from "@/assets/icons/product_icon_3.svg";
import ProductIcon4 from "@/assets/icons/product_icon_4.svg";
import ChevronRightIcon from "@/assets/icons/chevron_right.svg";

interface AppMenuItem {
    icon: string;
    title: string;
    description: string;
}

const appMenuItems: AppMenuItem[] = [
    {
        icon: ProductIcon1,
        title: "Link in Bio",
        description: "Manage your Link in Bio"
    },
    {
        icon: ProductIcon2,
        title: "Store",
        description: "Manage your Store activities"
    },
    {
        icon: ProductIcon3,
        title: "Media Kit",
        description: "Manage your Media Kit"
    },
    {
        icon: ProductIcon4,
        title: "Invoicing",
        description: "Manage your Invoices"
    },
    {
        icon: ProductIcon1, 
        title: "Bookings",
        description: "Manage your Bookings"
    }
];

export function AppsMenu() {
    return (
        <div className="w-[384px] bg-white rounded-[20px] p-4 shadow-lg">
            <div className="flex flex-col gap-4">
                {appMenuItems.map((item, index) => (
                    <button 
                        key={index}
                        className="flex items-center group cursor-pointer justify-between gap-4 w-full text-left hover:border border-[#EFF1F6] transition-all ease-in-out duration-300 hover:shadow-xs p-2 rounded-lg"
                    >
                       <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-[12px] bg-white border border-[#EFF1F6] flex items-center justify-center">
                            <Image 
                                src={item.icon} 
                                alt={item.title}
                                width={24}
                                height={24}
                            />
                        </div>
                        <div>
                            <h3 className="text-[16px] font-semibold text-[#131316]">
                                {item.title}
                            </h3>
                            <p className="text-[14px] text-[#56616B]">
                                {item.description}
                            </p>
                        </div>
                       </div>

                       <div className="hidden group-hover:block">
                        <Image src={ChevronRightIcon} alt="chevron right" />
                       </div>
                    </button>
                ))}
            </div>
        </div>
    );
}