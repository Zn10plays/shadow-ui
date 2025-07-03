import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import {anamousUser, User} from '../../utils/user';

function validateJWT(jwt: string | undefined): User {
    // Placeholder for JWT validation logic
    if (!jwt) {
        return anamousUser
    }

    if (+jwt % 2 === 0) {
        return {
            id: "123",
            username: "john_doe",
            password: "hashed_password",
            is_authenticated: true,
            is_admin: false,
        }
    }

    return anamousUser
}

interface NavbarProps {
}   

export async function Navbar({}: NavbarProps) {
    const cookieStore = await cookies();

    const userCookie = cookieStore.get("JWT");

    const user: User = validateJWT(userCookie?.value);

    return (
        <nav className="bg-gray-900 p-4 flex-none">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image src='/icon_primary.jpg' alt='Logo' width={40} height={40} className="rounded-full"/>
                    <Link href={'/'}>
                        <div className="text-white text-lg font-semibold">Shadow</div>
                    </Link>
                </div>
                <div>
                    {user.is_authenticated ? (
                        <div className="text-white">
                            <Image src='/icon_secondary.jpg' alt="User Icon" height={30} width={30} />
                        </div>
                    ) : (
                        <Link href="/login">
                            <Image src='/user_icon.svg' alt="User Icon" height={30} width={30} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}