import React from "react";
export function Pagination({
  handlePageChange,
  page,
  totalPages,
  items,
}) {
  return <div className="flex justify-center mt-6">
              <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className={`px-4 py-2 border rounded-md mr-2 ${page === 1 ? "cursor-not-allowed opacity-50" : "bg-button hover:bg-buttonHover text-white"}`}>
                Previous
              </button>
              <span className="px-4 py-2">{page}</span>
              <button onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages || items.length === 0} 
              className={`px-4 py-2 border rounded-md ml-2
               ${page === totalPages ? "cursor-not-allowed opacity-50" : "bg-button hover:bg-buttonHover text-white"}`}>
                Next
              </button>
            </div>;
}
  