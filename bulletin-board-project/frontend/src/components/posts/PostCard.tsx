import React from 'react';

interface PostCardProps {
    title: string;
    content: string;
    author: string;
    date: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, author, date }) => {
    return (
        <div className="post-card">
            <h2>{title}</h2>
            <p>{content}</p>
            <p className="post-meta">
                <span>By {author}</span>
                <span>{date}</span>
            </p>
        </div>
    );
};

export default PostCard;