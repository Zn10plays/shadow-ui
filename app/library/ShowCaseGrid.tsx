import { listNovelsByLibrary } from "@/prisma/connector"
import ShowCaseItem from "./ShowCaseItem"

interface ShowcaseGridProps {

}

export default async function ShowcaseGrid(props: ShowcaseGridProps) {
    const novels = await listNovelsByLibrary()

    return <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {novels ? (
            novels.map(novel => <ShowCaseItem novel={novel} key={novel.id}/>)) 
            : (
            <h1> No Novel found </h1>
        )}
    </div>
}