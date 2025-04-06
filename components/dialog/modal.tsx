import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import CloseIcon from "@/assets/icons/close.svg";

export function Modal({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 pr-5 bg-opacity-50"
          onClick={handleClose}
          data-testid="modal-background"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="max-w-[456px] shadow w-full bg-white rounded-[20px] py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4">
              <div>
                <p className="text-foreground font-semibold text-[24px]">
                  {title}
                </p>
              </div>
              <button
                className="cursor-pointer hover:opacity-70 transition-opacity"
                onClick={handleClose}
                aria-label="close"
              >
                <Image src={CloseIcon} alt="close" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
