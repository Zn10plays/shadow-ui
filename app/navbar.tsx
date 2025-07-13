import Link from "next/link";
import Image from "next/image";
import {getUser} from '../utils/user';

export async function Navbar() {
    const user = await getUser()

    return (
        <nav className="bg-gray-900 p-4 flex-none">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image src='/icon_primary.jpg' alt='Logo' width={40} height={40} className="rounded-full"/>
                    <Link href={'/'}>
                        <div className="text-white text-2xl font-bold">Shadow</div>
                    </Link>
                </div>
                <div className="items-center">
                    <nav className="flex items-center space-x-4">
                        <Link href="/library" className="text-gray-300 hover:text-white transition">
                            Library
                        </Link>
                        {!user.is_authenticated ? (
                            <Link href='/login' className="text-white">
                                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition">
                                    Login
                                </button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Image src='/icon_secondary.jpg' alt="User Icon" height={35} width={35} className="rounded-full"/>
                            </Link>
                        )}
                    </nav>
                    
                </div>
            </div>
        </nav>
    );
}