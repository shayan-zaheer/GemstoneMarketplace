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
        <div className={`w-1/2 md:w-36 mx-auto md:mx-0 flex flex-col h-full justify-center items-center rounded-lg p-4 p-[0.1rem] `}>
        <Button variant="outline" className="w-full text-xs sm:text-sm md:text-md bg-surface  font-bold hover:border-primary hover:border hover:text-primary text-gray-600">
        <MdSort className="text-black"/> {ddText}
        </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border bg-surface text-black border-primary">
        <DropdownMenuRadioGroup value={stateValue} onValueChange={setStateValue} className="text-black">
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
