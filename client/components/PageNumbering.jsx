import React from "react";
import { Button } from "@/components/ui/button";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PageNumbering = ({ currentPage, totalPages, setCurrentPage }) => {
  const router= useRouter();
  return (
    <div className="flex justify-center gap-4 mb-4">
      <Button
        className="h-12 shadow-2xl bg-transparent border border-2 hover:bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]"
        disabled={currentPage == 1}
        onClick={() => {setCurrentPage(currentPage - 1)
          router.push(`/products?page=${currentPage-1}`)
        }

        }
      >
        <FaCaretLeft />
      </Button>
      <Button
        className="h-12 w-12 shadow-2xl bg-transparent border border-2 "
        disabled
      >
        {currentPage}
      </Button>
      <Button
        className="h-12 shadow-2xl bg-transparent border border-2 hover:bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]"
        disabled={(currentPage + 1) > totalPages}
        onClick={() => {
          setCurrentPage(currentPage + 1)
          router.push(`/products?page=${currentPage+1}`)
        }

        }
      >
        <FaCaretRight />
      </Button>
    </div>
  );
};

export default PageNumbering;
