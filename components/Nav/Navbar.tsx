"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { navItems } from './config'
import { UserNav } from './UserNav';
import Image from 'next/image';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image src='/icon_secondary.jpg' height={24}  width={24} className='rounded-2xl' alt='goofy ass image'/>
              <span className="text-xl font-bold">Shadow TL</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* User Nav and Mobile Menu Button */}
          <div className="flex items-center">
            <div className="hidden md:block">
              <UserNav />
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMobileMenu} // Close menu on click
                className={`block px-3 py-2 rounded-md text-base font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700 px-4">
             <UserNav />
          </div>
        </div>
      )}
    </nav>
  );
}
