import { Metadata } from "next";
import ShowcaseGrid from "./ShowCaseGrid";

interface LibraryProps {

}

export default function Library (props: LibraryProps) {
  return <div className="p-1 md:p-5"> 
    <h1 className="text-2xl"> Library </h1>
    <span className="text-sm"> Read all books you want, new ones can be added anytime </span>
    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    <ShowcaseGrid />
  </div>
}

export const metadata: Metadata = {
  title: "Library",
  description: "Place to view the whole catalogue of novels",
};