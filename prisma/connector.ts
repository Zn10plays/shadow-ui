import { chapter } from "@/app/generated/prisma";
import prisma from "./global";
import { getUser } from "@/utils/user";

async function listBookshelfNovelsByUserId(userId: number, page: number = 1, pageSize: number = 10) {
    const bookshelf = await prisma.bookshelf.findMany({
        where: { user: { id: userId } },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const novelIds = bookshelf.map(item => item.novel_id);

    return Promise.all(
        novelIds.map(id => getNovelById(id))
    );
}

async function listNovelsByLibrary(page: number = 1, pageSize: number = 10) {
    return prisma.novel.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
}

function getNovelById(id: number) {
    return prisma.novel.findUnique({
        where: { id },
    });
}


function listChaptersByNovelId(novelId: number, page: number = 1, pageSize: number = 10) {
    return prisma.chapter.findMany({
        where: { novel: { id: novelId } },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
}

function getChapterById(id: number) {
    return prisma.chapter.findUnique({
        where: { id },
    });
}

async function getReleventTermsByChapterId(chapterId: number) {
    const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
    });

    const character_bibles = await prisma.bibleinfo.findMany({
        where: { novel: { id: chapterId } },
    });

    const matches = [];
    const unmateched = [];

    // check for exact matches

    for (const bible of character_bibles) {
        if (chapter?.content.includes(bible?.name)) {
            matches.push(bible);
        } else {
            unmateched.push(bible);
        }
    }

    // second pass for partial matches (ie. "John" in "John Doe") was matched to 
    for (const bible of unmateched) {
        if (!bible.name.includes(" ")) {
            continue; // skip single-word names
        }

        const nameParts = bible.name.split(" ");
        let isPartialMatch = false;
        
        for (const part of nameParts) {
            if (chapter?.content.includes(part)) {
                isPartialMatch = true;
                break; // no need to check further if one part matches
            }
        }

        if (isPartialMatch) {
            matches.push(bible);
        }
    }

    return matches;
}

async function isNovelInBookshelf(novelId: number, userId: number) : Promise<boolean> {
    const result = await prisma.bookshelf.findFirst({
        where: {
            novel_id: novelId,
            user_id: userId,
        },
    });
    return result !== null;
}

async function getChaptersByNovelId(novelId: number, page: number = 1, pageSize: number = 100, userId: number, asending: boolean = false){
    // 1. Determine if we have a valid, logged-in user.
    // This flag will control whether we add the user-specific queries.
    const isUserLoggedIn = userId != null && userId > 0;

    const chaptersWithUserData = await prisma.chapter.findMany({
        where: {
            novel: { id: novelId },
        },
        // We conditionally include the _count block only if the user is logged in.
        // If isUserLoggedIn is false, the spread operator does nothing.
        // This is a clean way to build dynamic queries in Prisma.
        select: {
            // Select all the chapter fields you need
            id: true,
            title: true,
            chapter_number: true,
            // ... any other fields from the Chapter model

            // Conditionally add the _count for bookmarks and read status
            ...(isUserLoggedIn && {
                _count: {
                    select: {
                        // Count bookmarks for this chapter by this user
                        bookmarks: {
                            where: {
                                user: { id: userId! }, // The ! tells TS we know userId is not null here
                            },
                        },
                        // Count read status for this chapter by this user
                        chaptersread: {
                            where: {
                                user_id: userId!, // Based on your schema
                            },
                        },
                    },
                },
            }),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            chapter_number: asending ? 'asc' : 'desc',
        },
    });

    // 2. Map the results to the final desired format
    const chapters = chaptersWithUserData.map(chapter => {
        // Use default value destructuring for _count.
        // If the user wasn't logged in, `_count` won't exist on the chapter object.
        // This provides a safe fallback, preventing errors.
        const { _count = { bookmarks: 0, chaptersread: 0 }, ...chapterData } = chapter;

        return {
            ...chapterData,
            // Create the boolean fields based on the counts.
            // If the user was logged out, counts will be 0, so these will correctly be false.
            bookmarked: _count.bookmarks > 0,
            isRead: _count.chaptersread > 0,
        };
    });

    return chapters;
}

async function getTotalChaptersByNovelId(novelId: number): Promise<number> {
    const chapters = await prisma.chapter.count({
        where: { novel: { id: novelId } },
    });
    return chapters;
}

async function getTotalChaptersFilledByNovelId(novelId: number): Promise<number> {
    return prisma.chapter.count({
        where: {
            novel: { id: novelId },
            is_filled: true,
        }
    });
}

async function getTotalTranslatedChaptersByNovelId(novelId: number): Promise<number> {
    const chapters = await prisma.chapter.count({
        where: {
            novel: { id: novelId },
            is_translated: true,
        },
    });
    return chapters;
}

async function getFirstChapterIdByNovelId(novelId: number): Promise<number> {
    const chapter =  await prisma.chapter.findFirst({
        where: { novel: { id: novelId } },
        orderBy: { chapter_number: 'asc' },
    });

    return chapter ? chapter.id : -1;
}

async function getNextChapterByNovelIdAndUserId(novelId: number): Promise<number> {
    const user = await getUser()

    if (!user.is_authenticated)
        return getFirstChapterIdByNovelId(novelId)
    
    const readChapters = await prisma.chaptersread.findFirst({
        where: {
            user_id: user.id,
            chapter: { novel_id: novelId },
        },
        orderBy: { chapter: { chapter_number: 'asc' } },
    })

    return readChapters ? readChapters.chapter_id : getFirstChapterIdByNovelId(novelId);
}

export {
    listBookshelfNovelsByUserId,
    listNovelsByLibrary,
    isNovelInBookshelf,
    getNovelById,
    listChaptersByNovelId,
    getChapterById,
    getReleventTermsByChapterId,
    getChaptersByNovelId,
    getTotalChaptersByNovelId,
    getTotalChaptersFilledByNovelId,
    getTotalTranslatedChaptersByNovelId,
    getNextChapterByNovelIdAndUserId,
    getFirstChapterIdByNovelId
}