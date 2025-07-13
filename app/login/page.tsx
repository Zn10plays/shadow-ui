import { Metadata } from "next";
import { cookies } from "next/headers";
import LoginFormCard from "./logincard";
import { getUser, parseLoginData } from "@/utils/user";
import AccountCard from "./accountcard";

async function handleLogin(formData: FormData) {
    'use server'

    const cookieStore = await cookies()

    const username = formData.get('username')
    const password = formData.get('password')

    if (!username || !password) {
        return
    }

    const encryptedData = parseLoginData(username.toString(), password.toString());

    cookieStore.set('jwt', encryptedData);
}

export default async function Login() {
    const user = await getUser()

    return (
        <div className="flex-1 grid grid-cols-1 place-content-center">
            <div className="m-auto">
                { user.is_authenticated ? 
                (
                    <AccountCard user={user} />
                ) : (
                    <LoginFormCard action={handleLogin} />
                )}
            </div>
        </div>
    );
}


export const metadata: Metadata = {
  title: "Login",
  description: "Login page for shadow users",
  icons: {
    icon: "/icon_primary.jpg",
  }
};