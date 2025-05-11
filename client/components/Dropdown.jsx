"use client"
import { MdSort } from "react-icons/md";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuRadioGroupDemo({ ddText, valuesText, values, stateValue, setStateValue }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={`w-1/2 md:w-36 mx-auto md:mx-0 flex flex-col h-full justify-center items-center rounded-lg p-4 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient p-[0.1rem] `}>
        <Button variant="outline" className="w-full text-xs sm:text-sm md:text-md bg-[#1b1c20] border-none font-bold hover:shadow-[0_0_8px_0.01rem_#00E8FC] hover:bg-[#1b1c20] hover:text-white text-white">
        <MdSort className="text-white "/> {ddText}
        </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border bg-[#212226] text-white border-white">
        <DropdownMenuRadioGroup value={stateValue} onValueChange={setStateValue} className="text-white">
          {values.map((val, index) => (
            <DropdownMenuRadioItem key={val} value={valuesText[index]}>
              {val}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
