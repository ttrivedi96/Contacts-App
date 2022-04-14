import Link from 'next/link';
import React from 'react';
import classes from '../styles/MainNavigation.module.css';

const Navbar = () => {
    return (

        <header className={classes.header}>
            <div className={classes.logo}>Contacts App</div>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>All Contacts</Link>
                    </li>
                    <li>
                        <Link href='/register'>Add Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar