import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to the Bulletin Board</h1>
                <p>This is a multi-functional bulletin board application.</p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;