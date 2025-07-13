import { Metadata } from "next";
import Link from "next/link";
import { Book, Sparkles, Languages } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <hr className="bg-gray-400 text-gray-400" />
      <main className="container mx-auto px-6 py-16 text-center">
        {/* Hero Section */}
        <section className="mb-16">
          <h2 className="text-5xl font-extrabold mb-4">Unlock Worlds of Korean Webnovels</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Experience your favorite Korean stories, seamlessly translated into English by our advanced AI. Dive into new adventures without waiting.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/library" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition">
              Start Reading Now
            </Link>
            <Link href="#features" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition">
              Learn More
            </Link>
          </div>
        </section>

        {/* Featured Novel Section */}
        <section className="mb-16">
          <Link href={'/library'}>
            <h3 className="text-3xl font-bold mb-8">Popular on Shadow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Example Book Cover */}
              <div className="bg-gray-800 rounded-lg overflow-hidden group">
                <img src="/cover.png" alt="Necromancer Academy's Genius Summoner" className="w-full h-auto object-cover group-hover:opacity-80 transition" />
                <div className="p-4">
                  <h4 className="font-bold text-lg">Necromancer Academy's Genius Summoner</h4>
                  <p className="text-sm text-gray-400">1465 Chapters</p>
                </div>
              </div>
              {/* Add more featured books here */}
            </div>
          </Link>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <h3 className="text-3xl font-bold mb-12">Why You'll Love Shadow</h3>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-purple-600/20 p-4 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">AI-Powered Translations</h4>
              <p className="text-gray-400">
                Our cutting-edge LLMs provide high-quality, nuanced translations that capture the spirit of the original work.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-600/20 p-4 rounded-full mb-4">
                <Book className="h-8 w-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">Instant Access to New Chapters</h4>
              <p className="text-gray-400">
                Read the latest chapters as soon as they are released in Korea. No more waiting for manual translations.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-600/20 p-4 rounded-full mb-4">
                <Languages className="h-8 w-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold mb-2">A Growing Library</h4>
              <p className="text-gray-400">
                Explore a vast and expanding collection of webnovels across all your favorite genres. New titles added regularly.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Shadow. All rights reserved.</p>
        <p className="text-sm">Read your favorite Korean novels in English.</p>
      </footer>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Shadow | AI-Powered Korean Webnovel Translations",
  description: "Read Korean webnovels seamlessly translated into English with our advanced AI. Access the latest chapters instantly and explore a vast library of stories.",
  icons: {
    icon: "/icon_primary.jpg",
  }
};