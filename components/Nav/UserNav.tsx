import Image from 'next/image';
import Link from 'next/link';

// --- DUMMY AUTH ---
// This is a placeholder. You'll replace this with your actual auth state.
// Try toggling this value to see the UI change!
const DUMMY_USER = {
  isLoggedIn: false,
};
// --- END DUMMY AUTH ---

export function UserNav() {
  const user = DUMMY_USER;

  if (user.isLoggedIn) {
    return (
      <button className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all">
        <Image
          src="/icon_primary.jpg"
          alt="User Profile"
          width={40}
          height={40}
          className="object-cover" // Ensures the image covers the circle
        />
        <span className="sr-only">User Profile</span>
      </button>
    );
  }

  return (
    <Link
      href="/login" // Or your sign-in page
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
    >
      <Image
        src="/user_icon.svg"
        alt="Login"
        width={20}
        height={20}
        // Tailwind class to invert the color of the SVG in dark mode if it's black
        className="invert dark:invert-0" 
      />
      <span className="text-sm font-medium text-white">Login</span>
    </Link>
  );
}