import { cookies } from 'next/headers';
import prisma from '@/prisma/global';
import { encrypt, decrypt } from './encript';

interface User {
    id: number;
    username: string;
    password: string;
    is_authenticated: boolean;
    is_admin: boolean;
}

const anamousUser: User = {
    id: -1,
    username: "",
    password: "",
    is_authenticated: false,
    is_admin: false,
};

function parseLoginData(username: string, password: string): string {
    const data = { username, password };
    return encrypt(JSON.stringify(data));
}

function unpackJWT(jwt: string): {username: string, password: string} {
    const decrypted = decrypt(jwt);
    const data = JSON.parse(decrypted);
    return {
        username: data.username,
        password: data.password
    };
}


async function validateJWT(jwt: string | undefined): Promise<User> {
    // Placeholder for JWT validation logic
    if (!jwt) {
        return anamousUser
    }

    const { username, password } = unpackJWT(jwt);

    const userData = await prisma.user.findFirst({
        where: {
            username,
            password
        }
    })
    
    if (!userData) {
        return anamousUser;
    }

    return {
        id: userData.id,
        username: userData.username,
        password: userData.password,
        is_authenticated: true,
        is_admin: false
    };
}

async function getUser(): Promise<User> {
    // Placeholder for user retrieval logic
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;

    const user = validateJWT(jwt);
    return user;
}

export type { User };
export { anamousUser, getUser, parseLoginData };