import { getNovelById } from "@/prisma/connector"
import { formatTitle } from "@/utils/strings"
import { Metadata } from "next"

interface NovelInfoPageProps {
  params: Promise<{novelId: string}>
}

export default async function NovelInfoPage(props: NovelInfoPageProps) {
  const {novelId} = await props.params
  const novel = await getNovelById(parseInt(novelId))

  if (!novel) {
    return <> Novel Does Not Exist </>
  }

  return <>
    novel page for {formatTitle(novel.title)}
  </>
}

export const metadata: Metadata = {
  title: "Shadow UI",
  description: "Novel Summary",
  icons: {
    icon: "/icon_primary.jpg",
  }
};