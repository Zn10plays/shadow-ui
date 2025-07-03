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

export type { User };
export { anamousUser };