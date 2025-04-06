'use client'

import ProductIcon1 from "@/assets/icons/product_icon_1.svg";
import ProductIcon2 from "@/assets/icons/product_icon_2.svg";
import ProductIcon3 from "@/assets/icons/product_icon_3.svg";
import ProductIcon4 from "@/assets/icons/product_icon_4.svg";
import Image from "next/image";

const appButtons = [
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
    }
];

function Tooltip({ children, content }: { children: React.ReactNode; content: { title: string; description: string } }) {
    return (
        <div className="group relative flex items-center">
            {children}
            <div className="absolute left-full ml-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-foreground rounded-lg shadow-lg p-3 relative">
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-foreground transform -translate-y-1/2 rotate-45"></div>
                    <h3 className="font-medium text-background text-sm text-nowrap">{content.title}</h3>
                </div>
            </div>
        </div>
    );
}

export default function AppBar() {
    return (
        <div className="fixed hidden lg:block left-6 top-1/2 -translate-y-1/2 z-50">
            <div className="flex flex-col gap-4 bg-white rounded-full p-1 shadow-lg">
                {appButtons.map((button, index) => (
                    <Tooltip key={index} content={{ title: button.title, description: button.description }}>
                        <button className="rounded-full cursor-pointer hover:bg-gray-100 transition-colors w-10 h-10 grid place-items-center duration-200">
                            <Image 
                                src={button.icon} 
                                alt={button.title.toLowerCase()}
                                className="grayscale hover:grayscale-0 transition-all duration-200"
                            />
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}