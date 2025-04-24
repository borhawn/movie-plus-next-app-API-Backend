import Link from "next/link";

export default function Pagination({link, currentPage, totalPages}:any) {

  let previous = null;
  let next = null;
  if(currentPage <= 1){previous = 1}else{
    previous = currentPage - 1
  }
  if(currentPage >= totalPages){next = totalPages}else{
    next = currentPage + 1
  }


  return (
    <nav
      className="flex items-center gap-x-1 mx-auto justify-center"
      aria-label="Pagination"
    >
      <Link
        href={link + previous}
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        aria-label="Previous"
      >
        <svg
          aria-hidden="true"
          className="hidden shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span>قبلی</span>
      </Link>

      <div className="flex items-center gap-x-1">
        {Array.from(Array(totalPages)).map((i, index) => {
          return (
            <Link
              href={link + (index + 1)}
              key={index}
              type="button"
              className={
                index + 1 == currentPage
                  ? "bg-white/10 min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                  : "min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              }
              aria-current="page"
            >
              {index + 1}
            </Link>
          );
        })}
      </div>
      <Link
        href={link + next}
        type="button"
        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        aria-label="Next"
      >
        <span>بعدی</span>
        <svg
          aria-hidden="true"
          className="hidden shrink-0 size-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </Link>
    </nav>
  );
}
