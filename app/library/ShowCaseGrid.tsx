import { listNovelsByLibrary } from "@/prisma/connector"
import ShowCaseItem from "./ShowCaseItem"

export default async function ShowcaseGrid() {
    const novels = await listNovelsByLibrary()
    return <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {novels ? (
            novels.map(novel => <ShowCaseItem novel={novel} key={novel.id}/>)) 
            : (
            <h1> No Novel found </h1>
        )}
    </div>
}


// disable lint no-empty-object-type
export const metadata = {
    title: "Shadow UI",
    description: "A user interface for Shadow",
    icons: {
        icon: "/icon_primary.jpg",
    }
};