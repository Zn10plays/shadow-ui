import Link from 'next/link'

interface ChapterListControlsProps {
    totalChapters: number
    searchParams:  Promise<{ [key: string]: string | string[] | undefined }>
    currentPage: number
}

export default async function ChapterListControls ({totalChapters, currentPage}: ChapterListControlsProps) {
    const totalPages = Math.ceil(totalChapters / 100)

    let tab_names = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            tab_names.push(i)
        }
    } else {
        tab_names.push(1)

        if (currentPage < 4) {
            tab_names.push(2,3,4,5, '...')
        } else if (currentPage == totalPages - 1) {
            tab_names.push('...', currentPage-3, currentPage-2, currentPage-1, currentPage)
        } else if (currentPage == totalPages) {
            tab_names.push('...', currentPage-3, currentPage-2, currentPage-1)
        } else {
            tab_names.push('...', currentPage-1, currentPage, currentPage + 1, '...')
        }
        tab_names.push(totalPages)
    }


    return <div className="flex items-center justify-center space-x-1 sm:space-x-2 pt-6">
        {currentPage === 1 ? (
            <button 
                    className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
        ) : (
            <Link href={'?page=' + (currentPage - 1)}>
                <button 
                    className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
            </Link>
        )}
        
        {tab_names.length > 0 && tab_names.map((item, index) => {
            if (item === '...') {
                return <span className="text-gray-500 self-end pb-1 px-1" key={index}>...</span>
            } else {
                return <Link href={'?page=' + item}  key={index}>
                    <button className={"px-4 py-2 rounded-md text-gray-300 hover:bg-slate-700 transition-colors text-sm " + (currentPage == item ? 'bg-indigo-600' : 'bg-slate-800' )}>
                        {item}
                    </button>
                </Link>
            }
        })}
        
        {currentPage === totalPages ? (
            <button 
                className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        ) : (
            <Link href={'?page=' + (currentPage + 1)}>
                <button 
                className="px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </Link>
        )}
    </div>
}