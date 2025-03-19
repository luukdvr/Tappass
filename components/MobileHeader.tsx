import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <button onClick={toggleMenu} className="menu-button">
                <Image src="/burger-bar.png" alt="Menu" width={30} height={30} />
            </button>
            {isMenuOpen && (
                <div className="menu-overlay">
                    <button onClick={toggleMenu} className="close-button">X</button>
                    <nav className="menu-links">
                        <Link href="/faq"><a>FAQ</a></Link>
                        <Link href="/design"><a>Ontwerp je pas</a></Link>
                        <Link href="/pricing"><a>Prijzen</a></Link>
                        <Link href="/contact"><a>Contact</a></Link>
                        <Link href="/auth/login"><a>Inloggen</a></Link>
                        <Link href="/auth/register"><a>Aanmelden</a></Link>
                    </nav>
                </div>
            )}
            <style jsx>{`
                .menu-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .close-button {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }
                .menu-links a {
                    margin: 10px 0;
                    font-size: 18px;
                    text-decoration: none;
                    color: black;
                }
            `}</style>
        </div>
    );
};

export default MobileHeader;
