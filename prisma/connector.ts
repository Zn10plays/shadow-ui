import { chapter } from "@/app/generated/prisma";
import prisma from "./global";

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

async function getChaptersByNovelId(novelId: number, page: number = 1, pageSize: number = 100, asending: boolean = false): Promise<chapter[]> {
    return prisma.chapter.findMany({
        where: { novel: { id: novelId } },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
            chapter_number: asending ? 'asc' : 'desc',
        },
    });
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
}