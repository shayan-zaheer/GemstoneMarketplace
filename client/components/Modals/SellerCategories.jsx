import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function SellerCategories({categories, showModal, setShowModal }) {
  useEffect(() => {
    const timer = setTimeout(() => { // to ensure that it always run after component mounts
        setShowModal(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[450px] max-sm:w-11/12 sm:h-[500px] max-sm:h-[500px] overflow-x-auto bg-secondary border-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Seller Categories</DialogTitle>
          <DialogDescription className="text-center text-black">
            {`The entered wallet address holds permission to sell the following gem categories as per approval by the Government.`}
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc list-inside space-y-2">
            {categories.map((gem, index) => <li key={index}>{gem}</li>)}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default SellerCategories;
