import { User } from "@/utils/user"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

async function handleLogout() {
    'use server'

    const cookieStore = await cookies()

    cookieStore.delete('jwt')
}

interface AccountCardProps {
  user: User
}

export default async function AccountCard({user}: AccountCardProps) {
  return <>
    <div className="bg-gray-900 text-white w-full max-w-lg p-8 rounded-xl shadow-lg">
    
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold">Account Info</h1>
    </div>

    <div>
      <Image src='/icon_secondary.jpg' alt="user icon" height={100} width={100} className="m-auto rounded-2xl"/>
      <br className="py-1" />
      <h3 className="text-xl text-center"> {user.username} </h3>
    </div>

    <div className="mt-10">
      <Link href={'/library'} >
        <button className="mb-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition duration-300 ease-in-out">
          Home 
        </button>
      </Link>
      <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 transition duration-300 ease-in-out">
        LogOut 
      </button>
    </div>

    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

    {/* Footer */}
    <div className="text-center mt-6">
      <p className="text-gray-400 mt-2"></p>
      <p className="text-sm text-gray-400">
        Changes can only be made by admin, message him to reqest changes 
      </p>
    </div>
  </div>

  </>
}