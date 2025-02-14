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

export function DropdownMenuRadioGroupDemo({ ddText, valuesText, values, position, setPosition }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-36 text-md font-bold bg-transparent text-white">
        <MdSort/> {ddText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border bg-[#212226] text-white border-white">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="text-white">
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
