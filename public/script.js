document.addEventListener('DOMContentLoaded', function() {
    // Load posts when the page loads
    fetchPosts();

    // Event listener for post form submission
    document.getElementById('post-form').addEventListener('submit', function(e) {
        e.preventDefault();
        createPost();
    });

    // Event listener for comment form submission
    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addComment();
    });

    // Close modal when clicking on X
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('post-detail-modal').style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('post-detail-modal')) {
            document.getElementById('post-detail-modal').style.display = 'none';
        }
    });
});

// Show status message
function showMessage(message, isError = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isError ? 'error' : 'success'}`;
    messageElement.textContent = message;
    
    // Add the message to the page
    document.querySelector('.container').prepend(messageElement);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Fetch all posts from the API
async function fetchPosts() {
    try {
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        showMessage('投稿の取得に失敗しました。', true);
    }
}

// Display posts in the UI
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    if (!posts || posts.length === 0) {
        postsContainer.innerHTML = '<p>投稿がありません。最初の投稿をしてみましょう！</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.dataset.id = post.id;
        
        // Handle potential null or undefined values
        const title = post.title || 'タイトルなし';
        const content = post.content || '';
        const author = post.author || '匿名';
        const createdAt = post.createdAt ? new Date(post.createdAt).toLocaleString() : '日時不明';
        const commentCount = post.Comments ? post.Comments.length : 0;
        
        postElement.innerHTML = `
            <h3>${title}</h3>
            <p>${content.length > 100 ? content.substring(0, 100) + '...' : content}</p>
            <div class="post-meta">
                <span>投稿者: ${author}</span> | 
                <span>投稿日: ${createdAt}</span> |
                <span>コメント: ${commentCount}件</span>
            </div>
        `;
        postElement.addEventListener('click', () => showPostDetail(post.id));
        postsContainer.appendChild(postElement);
    });
}

// Create a new post
async function createPost() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const content = document.getElementById('content').value.trim();
    
    // Basic validation
    if (!title || !author || !content) {
        showMessage('タイトル、名前、内容をすべて入力してください。', true);
        return;
    }

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, content })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '投稿に失敗しました。');
        }

        // Reset form and fetch updated posts
        document.getElementById('post-form').reset();
        showMessage('投稿が成功しました！');
        fetchPosts();
    } catch (error) {
        console.error('Error creating post:', error);
        showMessage(`投稿に失敗しました: ${error.message}`, true);
    }
}

// Show post detail in modal
async function showPostDetail(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const post = await response.json();
        
        // Handle potential null or undefined values
        const title = post.title || 'タイトルなし';
        const content = post.content || '';
        const author = post.author || '匿名';
        const createdAt = post.createdAt ? new Date(post.createdAt).toLocaleString() : '日時不明';
        const comments = post.Comments || [];

        const postDetail = document.getElementById('post-detail');
        postDetail.innerHTML = `
            <h2>${title}</h2>
            <div class="post-meta">
                <span>投稿者: ${author}</span> | 
                <span>投稿日: ${createdAt}</span>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="comments">
                <h3>コメント (${comments.length})</h3>
                ${comments.length === 0 ? '<p>コメントはまだありません。</p>' : ''}
                ${comments.map(comment => `
                    <div class="comment">
                        <p>${comment.text || ''}</p>
                        <div class="comment-meta">
                            <span>投稿者: ${comment.author || '匿名'}</span> | 
                            <span>投稿日: ${comment.createdAt ? new Date(comment.createdAt).toLocaleString() : '日時不明'}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Set post ID for the comment form
        document.getElementById('post-id').value = postId;
        
        // Show modal
        document.getElementById('post-detail-modal').style.display = 'block';
    } catch (error) {
        console.error('Error fetching post details:', error);
        showMessage('投稿の詳細を取得できませんでした。', true);
    }
}

// Add a comment to a post
async function addComment() {
    const postId = document.getElementById('post-id').value;
    const author = document.getElementById('comment-author').value.trim();
    const text = document.getElementById('comment-text').value.trim();
    
    // Basic validation
    if (!author || !text) {
        showMessage('名前とコメントを入力してください。', true);
        return;
    }

    try {
        const response = await fetch(`/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, text })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'コメントの投稿に失敗しました。');
        }

        // Reset form and update post detail
        document.getElementById('comment-form').reset();
        showMessage('コメントが投稿されました！');
        showPostDetail(postId);
    } catch (error) {
        console.error('Error adding comment:', error);
        showMessage(`コメントの投稿に失敗しました: ${error.message}`, true);
    }
}
