"use client"
import React, { useState } from 'react'
import styles from "./nav.module.css"
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

function Nav() {
    const { data: session } = useSession()
    const user = session?.user  
    const role = session?.user?.role
    
    // State to track if mobile menu is open
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
    ]

    // Helper to close menu when a link is clicked
    const closeMenu = () => setIsOpen(false)

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <h1>GTechSolutions</h1>
            </div>

            {/* Hamburger / Close Icon for Mobile */}
            <button 
                className={styles.menuTrigger} 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation"
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Navigation Links Container */}
            <div className={`${styles.links} ${isOpen ? styles.menuOpen : ''}`}>
                {links.map((link) => (
                    <Link 
                        href={link.href} 
                        key={link.name} 
                        onClick={closeMenu}
                    >
                        {link.name}
                    </Link>
                ))}

                {role === "admin" && (
                    <Link href="/admin" onClick={closeMenu}>Admin</Link>
                )}

                {user ? (
                    <button 
                        className={styles.authBtn}
                        onClick={() => {
                            closeMenu();
                            signOut({ callbackUrl: "/login" });
                        }}
                    >
                        Sign Out
                    </button>
                ) : (
                    <Link href="/login" onClick={closeMenu}>Sign In</Link>
                )}
            </div>
        </nav>
    )
}

export default Nav