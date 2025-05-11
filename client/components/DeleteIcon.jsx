import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const DeleteIcon = ({ gemID, onDelete }) => {

    const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="absolute w-10 h-10 text-white top-2 right-[-5] bg-red-500 rounded-full flex justify-center items-center text-3xl hover:scale-105 ease-in-out duration-200 hover:cursor-pointer z-10" onClick={()=>setOpen(true)} >
          <MdDelete />
      </div>
      <DialogContent className="sm:max-w-[450px] max-sm:w-11/12  overflow-x-auto bg-[#1a1c1ff8] text-white border- border-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Do you really want to delete this gemstone? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={()=>{
                onDelete(gemID);
                setOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteIcon;
