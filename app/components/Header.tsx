// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLikes } from "../context/LikesContext";
import { Heart, Menu, X, Search, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use the likes context
  const likesContext = useLikes();
  const likedIds = likesContext?.likedIds || [];

  // Or if useLikes is guaranteed to be defined, just:
  // const { likedIds } = useLikes();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // In Header.tsx, add to navItems:
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" }, // Add this
    { href: "/collections", label: "Collections" },
    { href: "/soldes", label: "Sales" },
    { href: "/offers", label: "Offers" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0b0b0b]/95 backdrop-blur-md border-b border-[#c4a962]/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-light text-white hover:text-[#c4a962] transition-colors tracking-tight"
          >
            Black<span className="font-bold text-[#c4a962]">Velvet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-[#c4a962] text-[#0b0b0b] font-medium"
                    : "text-gray-300 hover:text-[#c4a962] hover:bg-[#1a1a1a]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">

            <Link
              href="/liked"
              className="relative p-2.5 rounded-full hover:bg-[#1a1a1a] transition-colors group"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  pathname === "/liked"
                    ? "text-[#c4a962] fill-current"
                    : "text-gray-400 group-hover:text-[#c4a962]"
                }`}
              />
              {likedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c4a962] text-[#0b0b0b] text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {likedIds.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-[#1a1a1a] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-black py-6 border-t border-[#404040]">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-[#c4a962] text-[#0b0b0b] font-medium"
                      : "text-gray-300 hover:bg-[#1a1a1a]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-4">
               
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
