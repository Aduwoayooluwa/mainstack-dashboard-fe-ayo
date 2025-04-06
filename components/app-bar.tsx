import ProductIcon1 from "@/assets/icons/product_icon_1.svg";
import ProductIcon2 from "@/assets/icons/product_icon_2.svg";
import ProductIcon3 from "@/assets/icons/product_icon_3.svg";
import ProductIcon4 from "@/assets/icons/product_icon_4.svg";
import Image from "next/image";

export default function AppBar() {
    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
            <div className="flex flex-col gap-4 bg-white rounded-full p-1 shadow-lg">
                <button className="rounded-full cursor-pointer hover:bg-gray-100 transition-colors w-10 h-10 grid place-items-center duration-200">
                    <Image 
                        src={ProductIcon1} 
                        alt="product icon 1" 
                        className="grayscale hover:grayscale-0 transition-all duration-200"
                        
                    />
                </button>
                <button className="rounded-full cursor-pointer hover:bg-gray-100 w-10 h-10 grid place-items-center transition-colors duration-200">
                    <Image 
                        src={ProductIcon2} 
                        alt="product icon 2" 
                        className="grayscale hover:grayscale-0 transition-all duration-200"
                        
                    />
                </button>
                <button className="rounded-full cursor-pointer hover:bg-gray-100 w-10 h-10 grid place-items-center transition-colors duration-200">
                    <Image 
                        src={ProductIcon3} 
                        alt="product icon 3" 
                        className="grayscale hover:grayscale-0 transition-all duration-200"
                        
                    />
                </button>
                <button className="rounded-full cursor-pointer hover:bg-gray-100 w-10 h-10 grid place-items-center transition-colors duration-200">
                    <Image 
                        src={ProductIcon4} 
                        alt="product icon 4" 
                        className="grayscale hover:grayscale-0 transition-all duration-200"
                    />
                </button>
            </div>
        </div>
    )
}