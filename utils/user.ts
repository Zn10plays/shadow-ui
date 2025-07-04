import { cookies } from 'next/headers';

interface User {
    id: string;
    username: string;
    password: string;
    is_authenticated: boolean;
    is_admin: boolean;
}

const anamousUser: User = {
    id: "",
    username: "",
    password: "",
    is_authenticated: false,
    is_admin: false,
};


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

async function getUser(): Promise<User> {
    // Placeholder for user retrieval logic
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;

    const user = validateJWT(jwt);
    return user;
}

export type { User };
export { anamousUser, getUser };