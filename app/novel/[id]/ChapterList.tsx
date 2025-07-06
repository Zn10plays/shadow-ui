import { novel } from "@/app/generated/prisma"
import { Bookmark, Check } from "lucide-react";
import ChapterListControls from "./ChaptersListControls";
import Link from "next/link";
import { getChaptersByNovelId } from "@/prisma/connector";
import { getUser } from "@/utils/user";

interface ChapterListProps {
	novel: novel,
	totalChapters: number
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ChapterList({totalChapters, searchParams, novel}: ChapterListProps) {
	const queryParams = await searchParams
	const user = await getUser()

	let page = 1
	if (queryParams.page && typeof queryParams.page === 'string'  && !Number.isNaN(parseInt(queryParams.page))) {
		page = parseInt(queryParams.page)
	}

	const chapters = await getChaptersByNovelId(novel.id, page, 100, user.is_authenticated ? user.id : -1, false)

	return <div className="flex flex-col h-full w-full text-white">
			<div className="bg-slate-700 rounded-md">
				{/* Header */}
				<div className="flex justify-between items-baseline mb-4 mx-2">
					<h3 className="text-xl font-semibold">Chapters</h3>
				</div>
				{/* Pagination Controls */}
				<ChapterListControls totalChapters={totalChapters} searchParams={searchParams} currentPage={page}  />
				<br className="mb-1" />
				{/* List of Chapters Container */}
				<div className="custom-scrollbar max-h-[30rem] flex-grow overflow-y-auto border border-slate-700 rounded-lg bg-slate-900/30">
					<ul className="divide-y divide-slate-700">
						{chapters.map((chapter) => (
							<li key={chapter.id}>
								<Link
									href={'/chapter/' + chapter.id} // In a real app, this would link to the chapter: `/novel/id/chapter/${chapter.chapterNumber}`
									className={`
										group flex items-center justify-between p-4 transition-colors duration-150
										${chapter.isRead
											? "text-gray-500" // Dim text if read, less interactive
											: "text-gray-300 hover:bg-slate-800/70 hover:text-white"
										}
									`}
								>
									{/* Chapter Number and Title */}
									<div className="truncate pr-4">
										<span className={chapter.isRead ? "" : "group-hover:text-white font-medium"}>
											Chapter {chapter.chapter_number}
										</span>
										<span className="text-gray-400 hidden sm:inline">: {chapter.title}</span>
									</div>

									{/* Icons for Bookmark and Read Status */}
									<div className="flex items-center space-x-3 shrink-0">
										{chapter.bookmarked && (
											<Bookmark
												className="h-5 w-5 text-indigo-500"
												aria-label="Bookmarked"
												fill="currentColor"
											/>
										)}
										{chapter.isRead && (
											<Check
												className="h-5 w-5"
												aria-label="Read"
											/>
										)}
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
				{/* Pagination Controls */}
				<ChapterListControls totalChapters={totalChapters} searchParams={searchParams} currentPage={page} />
				<div className="my-2"></div>
			</div>
		</div>
}