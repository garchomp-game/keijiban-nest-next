import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>Bulletin Board</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/posts">Posts</a></li>
                    <li><a href="/auth/login">Login</a></li>
                    <li><a href="/auth/register">Register</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;