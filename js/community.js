class CommunityHub {
    static init() {
        this.initModal();
        this.loadPosts();
        this.loadSetups();
        this.initVoting();
    }

    static initModal() {
        const modal = document.getElementById('postModal');
        const createBtn = document.getElementById('createPost');
        const cancelBtn = document.getElementById('cancelPost');
        const form = document.getElementById('postForm');

        createBtn?.addEventListener('click', () => modal?.showModal());
        cancelBtn?.addEventListener('click', () => modal?.close());

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewPost(form);
        });
    }

    static handleNewPost(form) {
        const title = form.querySelector('#postTitle').value;
        const content = form.querySelector('#postContent').value;
        
        // Here you would typically send to a backend
        console.log('New post:', { title, content });
        
        // Mock post creation
        this.addPostToDOM({
            title,
            content,
            author: 'Current User',
            date: new Date().toLocaleDateString(),
            votes: 0
        });

        form.reset();
        document.getElementById('postModal')?.close();
    }

    static addPostToDOM(post) {
        const posts = document.getElementById('forumPosts');
        const postEl = document.createElement('article');
        postEl.className = 'forum-post';
        postEl.innerHTML = `
            <div class="post-header">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span>${post.author}</span>
                    <span>${post.date}</span>
                    <div class="vote-buttons">
                        <button class="vote-up">↑</button>
                        <span class="vote-count">${post.votes}</span>
                        <button class="vote-down">↓</button>
                    </div>
                </div>
            </div>
            <p>${post.content}</p>
        `;
        posts?.prepend(postEl);
    }

    static initVoting() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.vote-up, .vote-down')) {
                const count = e.target.parentElement.querySelector('.vote-count');
                const current = parseInt(count.textContent);
                count.textContent = current + (e.target.matches('.vote-up') ? 1 : -1);
            }
        });
    }

    static loadPosts() {
        // Mock post data
        const mockPosts = [
            {
                title: "My Thoughts on the Logitech G Pro X Superlight",
                content: "I've been using the G Pro X Superlight for a few weeks now, and it's amazing! The lightweight design makes a huge difference in long gaming sessions.",
                author: "GamerX",
                date: "Jan 28, 2025",
                votes: 5
            },
            {
                title: "Best Keyboard for Programming and Gaming?",
                content: "I'm looking for a new keyboard that's good for both programming and gaming. Any recommendations? I'm considering a mechanical keyboard with Cherry MX Brown switches.",
                author: "DevGamer",
                date: "Jan 27, 2025",
                votes: 2
            },
            {
                title: "Need Help with My Gaming Setup",
                content: "I recently got a new monitor, but I'm having trouble getting it to run at 144Hz. Any tips on how to fix this?",
                author: "NewbieGamer",
                date: "Jan 26, 2025",
                votes: 0
            }
        ];

        mockPosts.forEach(post => this.addPostToDOM(post));
    }

    static loadSetups() {
        // Mock setup data
        const mockSetups = [
            {
                imageUrl: "https://placehold.co/300x169",
                title: "My Minimalist Setup",
                author: "MinimalistGamer"
            },
            {
                imageUrl: "https://placehold.co/300x169",
                title: "RGB Overload!",
                author: "RGBFanatic"
            },
            {
                imageUrl: "https://placehold.co/300x169",
                title: "Cozy Gaming Corner",
                author: "CozyGamer"
            }
        ];

        const setupsGrid = document.getElementById('setupGrid');
        mockSetups.forEach(setup => {
            const setupEl = document.createElement('div');
            setupEl.className = 'setup-card';
            setupEl.innerHTML = `
                <img src="${setup.imageUrl}" alt="${setup.title}">
                <div class="setup-info">
                    <h4>${setup.title}</h4>
                    <span>${setup.author}</span>
                </div>
            `;
            setupsGrid?.appendChild(setupEl);
        });
    }
}

// Initialize community features
document.addEventListener('DOMContentLoaded', () => {
    CommunityHub.init();
});