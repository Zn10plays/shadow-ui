import Link from "next/link";
import Image from "next/image";
import {getUser} from '../utils/user';
import { UserRound } from "lucide-react";

export async function Navbar() {
    const user = await getUser()

    return (
        <nav className="bg-gray-900 p-4 flex-none">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image src='/icon_primary.jpg' alt='Logo' width={40} height={40} className="rounded-full"/>
                    <Link href={'/'}>
                        <div className="text-white text-lg font-semibold">Shadow</div>
                    </Link>
                </div>
                <div className="items-center">
                    {user.is_authenticated ? (
                        <Link href='/login' className="text-white">
                            <Image src='/icon_secondary.jpg' alt="User Icon" height={35} width={35} className="rounded-full"/>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <UserRound />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}