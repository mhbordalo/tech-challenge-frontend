interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage === 1) {
      return [1, 2, 3]
    }

    if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage - 1, currentPage, currentPage + 1]
  }

  const pages = getVisiblePages()

  return (
    <div className="flex justify-center items-center space-x-2 pb-20">
      <button
        className="px-4 py-2 txt-sm text-green-dark bg-white t rounded border-2 border-transparent shadow active:shadow-none hover:border-green-dark disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          className="h-5"
          src="/assets/icons/arrow_previous_ios.png"
          alt="Icon"
        />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`text-green-dark px-4 py-2 rounded shadow active:shadow-none ${
            page === currentPage
              ? 'bg-green-dark text-white'
              : 'bg-white border-2 border-transparent hover:border-green-dark'
          } active:shadow-none`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2 shadow active:shadow-none bg-white rounded border-2 border-transparent hover:border-green-dark disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img
          className="h-5"
          src="/assets/icons/arrow_forward_ios.png"
          alt="Icon"
        />
      </button>
    </div>
  )
}
