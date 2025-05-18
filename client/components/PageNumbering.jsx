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
        className="h-12 shadow-2xl btn-secondary hover:bg-[#7c3aed] hover:text-white"
        disabled={currentPage == 1}
        onClick={() => {setCurrentPage(currentPage - 1)
          router.push(`/products?page=${currentPage-1}`)
        }

        }
      >
        <FaCaretLeft />
      </Button>
      <Button
        className="h-12 w-12 shadow-2xl btn-primary hover:bg-[#7c3aed]/80 hover:text-white"
        disabled
      >
        {currentPage}
      </Button>
      <Button
        className="h-12 shadow-2xl btn-secondary hover:bg-[#7c3aed] hover:text-white "
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
