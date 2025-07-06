'use client'

import { bibleinfo, chapter } from "@/app/generated/prisma"
import { JSX, useMemo } from "react"

interface OrginizerProps {
    chapter: chapter
    bibleInfo: bibleinfo[]
}

export default function Organizer({ chapter, bibleInfo }: OrginizerProps) {
    const mapChapterContent = (content: string, bible: bibleinfo[]): (string | JSX.Element)[] => {
        if (!bible || bible.length === 0) {
            return [content];
        }
        // 1. Create a list of all names to search for (full and first names).
        const allNameVariations = bible.flatMap(character => {
            const fullName = character.name;
            const firstName = fullName.split(' ')[0];
            // Avoid duplicates if the full name is just one word
            return fullName === firstName ? [fullName] : [fullName, firstName];
        });

        // 2. Remove duplicates and sort by length descending.
        // This is CRITICAL to match longer names first (e.g., "Kim Dokja" before "Kim").
        const uniqueNames = [...new Set(allNameVariations)];
        
        // For fast O(1) lookups later
        const nameSet = new Set(uniqueNames);

        // 3. Create a dynamic regular expression.
        // The `\b` ensures we match whole words only (e.g., "Han" in "Han Sooyoung" but not in "handsome").
        // The `|` acts as an "OR".
        // The `()` creates a capturing group, which is key for the split() method's behavior.
        const regex = new RegExp(`\\b(${uniqueNames.join('|')})\\b`, 'g'); 

        // 4. Split the content string by the regex.
        // e.g., ["...Then ", "Dokja", " said..."]
        const parts = content.split(regex);

        // 5. Map the parts to either strings or JSX spans.
        return parts.map((part, index) => {
            if (part && nameSet.has(part)) {
                // This is a name, wrap it in a styled span
                return (
                    <span key={index} className="underline decoration-slate-600 hover:decoration-sky-400 cursor-pointer">
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    // useMemo ensures the expensive mapping only runs when chapter or bible info changes.
    const processedContent = useMemo(
        () => mapChapterContent(chapter.translated_content? chapter.translated_content : chapter.content, bibleInfo),
        [chapter, bibleInfo]
    );

    return (
        <div className="p-4 prose lg:prose-xl">
            <h1 className="text-xl">{chapter.translated_title || chapter.title}</h1>
            <hr className="my-1" />
            {/* The pre-wrap style preserves whitespace and newlines like in the original text */}
            <p style={{ whiteSpace: 'pre-wrap' }} className="text-lg">
                {processedContent}
            </p>
        </div>
    );
}