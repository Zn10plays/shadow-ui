'use server';

import { isChapterReadByUser, markChapterAsRead, markChapterAsUnRead } from "@/prisma/connector";
import { getUser } from "@/utils/user";
import Form from "next/form";
import { redirect, RedirectType } from 'next/navigation';

async function handleReadingDone(formData: FormData) {
  'use server';
  const user = await getUser();
  if (!user.is_authenticated) {
    redirect('/login');
  }

  const chapterId = formData.get('chapterId')?.toString()
  const nextChapterId = formData.get('nextId')?.toString()

  if (!chapterId || !nextChapterId) {
    console.log('Tracker:15; can not form chapter id, report to admin')
    return
  }

  await markChapterAsRead(parseInt(chapterId), user.id)
  
  // Logic to mark the chapter as read in the database
  // This is a placeholder, implement actual logic as needed
  console.log(`Chapter marked as read for user ${user.id}`);

  redirect('/chapter/'+nextChapterId)
}

async function handleUnread(formData: FormData) {
  'use server';
  const user = await getUser();
  if (!user.is_authenticated) {
    redirect('/login');
  }


  const chapterId = formData.get('chapterId')?.toString()
  const nextChapterId = formData.get('nextId')?.toString()

  if (!chapterId || !nextChapterId) {
    console.log('Tracker:45; can not form chapter id, report to admin')
    return
  }

  await markChapterAsUnRead(parseInt(chapterId), user.id)

  redirect('/chapter/'+chapterId)
}

export default async function Tracker(props: { nextChapterId: number | null, chapterId: number }) {
  const user = await getUser();

  const is_read = await isChapterReadByUser(props.chapterId, user.id)

  return (
    <div className="m-1"> 
      {
        user.is_authenticated ? (
          is_read ? (
            <>
              <Form action={handleUnread}>  
              <button className="h-16 w-full cursor-pointer bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition duration-300 ease-in-out">
                Chapter read, but you can change the marking (tap) 
                <input type="text" className="hidden" defaultValue={props.chapterId} name='chapterId'/>
                <input type="text" className="hidden" defaultValue={props.nextChapterId || '0'} name='nextId'/>
              </button>
            </Form>
            </>
          ) : (
            <Form action={handleReadingDone}>  
              <button className="h-16 w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white duration-300 ease-in-out rounded-md font-bold">
                Mark as read and Continue to next chapter
                <input type="text" className="hidden" defaultValue={props.chapterId} name='chapterId'/>
                <input type="text" className="hidden" defaultValue={props.nextChapterId || 0} name='nextId'/>
              </button>
            </Form>
            )
        ) : (
          <div className="py-2 my-2 bg-slate-950 rounded-md">
            <p className="text-center text-xl text-purple-400"> Please login to track progress </p>
          </div>
        )
      }
    </div>
  );
}