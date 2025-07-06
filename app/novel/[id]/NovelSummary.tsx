import { novel } from "@/app/generated/prisma";
import Image from "next/image";
import { formatTitle } from "@/utils/strings";
import SummaryShortcuts from "./SummaryShortCuts";

interface NovelSummaryProps {
  novel: novel
  totalChapters: number
  totalFilled: number
  translatedChapters: number
}

export default function NovelSummary({novel, totalChapters, totalFilled, translatedChapters}: NovelSummaryProps) {
  return <div className="mx-1 lg:mx-2">
      <h1 className="text-4xl"> {formatTitle(novel.title)} </h1>
      <span className="text-sm text-slate-400"> {novel.title.includes('|') ? novel.title.split('|')[1] : novel.title} </span>
      <hr className="my-4" />
      <div className="block md:flex">
        <div className="aspect-2/3 relative h-96 w-max content-center mx-auto md:flex-none">
          <Image src='/cover.png' alt="cover" fill/>
        </div>
        <div className="hidden md:block mx-1 flex-none"></div>
        <div className="flex-auto min-w-0">
          <div>
            <p className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap text-slate-300 cursor-pointer">
              <span className="text-lg text-slate-500 cursor-text"> Source </span> 
              <br />
              {novel.url}
            </p>
          </div>
          <div>
            <p className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap text-slate-300 cursor-pointer">
              <span className="text-lg text-slate-500 cursor-text"> Update Cycle </span> 
              <br />
              Daily (last Update {novel.last_updated.getMonth()}/{novel.last_updated.getDate()})
            </p>
          </div>
          <div className="text-sm text-slate-600 hidden md:block">
            In rare cases the novel will not update due to some error, if notices, contact admin
          </div>
          <div>
            <p className="text-lg text-slate-500 cursor-text">Chapetrs</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 text-slate-300 m-1 text-sm">
            <span className="overflow-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">Total</span>
            <span className="overflow-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">Collected</span>
            <span className="overflow-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">Translated</span>
            <span className="text-gray-400">{totalChapters}</span>
            <span className="text-sky-400">{totalFilled}</span>
            <span className="text-emerald-600">{translatedChapters}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative mb-2">
            {/* Filled Chapter bar */}
            <div className="bg-sky-400 h-2.5 rounded-full left-0 absolute" style={{ width: (totalFilled / totalChapters * 100) + '%' }} /> 
            {/* Translated chapters bar */}
            <div className="bg-emerald-600 h-2.5 rounded-full left-0 absolute" style={{ width: (translatedChapters / totalChapters * 100) + '%' }} />
          </div>
          <div>
            <p className="text-sm text-slate-600 text-wrap hidden md:block">
              Chapters can only be translated once they have been collected. 
              <br />
              Translation is automatic if you are logged in.
            </p>
          </div>
        </div>
      </div>      
      <SummaryShortcuts novelId={novel.id}/>
    </div>
}