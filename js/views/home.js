export default {
    render() {
        return `
            <section class="hero">
                <div class="container">
                    <h1>TECHBOY Tools</h1>
                    <p>Free online tools for students and developers.</p>
                    <div class="hero-btns">
                        <a href="#document-tools" class="btn btn-primary">Explore Tools</a>
                        <a href="#resume-tools" class="btn btn-outline">Resume Builder</a>
                    </div>
                </div>
            </section>

            <div class="container">
                <div class="search-container">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" class="search-bar" id="tool-search" placeholder="Search tools... e.g. PDF, Resume, Password">
                </div>

                <h2 class="section-title">Tool Categories</h2>
                <div class="grid grid-3" id="category-grid">
                    <a href="#document-tools" class="card" style="--accent-color: var(--accent-doc);">
                        <i class="fa-solid fa-file-pdf card-icon"></i>
                        <h3>Document Tools</h3>
                        <p>Convert, merge and compress PDF files.</p>
                        <span class="card-link">Get Started <i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                    <a href="#image-tools" class="card" style="--accent-color: var(--accent-img);">
                        <i class="fa-solid fa-image card-icon"></i>
                        <h3>Image Tools</h3>
                        <p>Compress, resize and convert images.</p>
                        <span class="card-link">Get Started <i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                    <a href="#utilities" class="card" style="--accent-color: var(--accent-utils);">
                        <i class="fa-solid fa-screwdriver-wrench card-icon"></i>
                        <h3>Utilities</h3>
                        <p>Everyday tools for developers and students.</p>
                        <span class="card-link">Get Started <i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                    <a href="#resume-tools" class="card" style="--accent-color: var(--accent-resume);">
                        <i class="fa-solid fa-id-card card-icon"></i>
                        <h3>Resume Tools</h3>
                        <p>Build and analyze your resume.</p>
                        <span class="card-link">Get Started <i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                    <a href="#games" class="card" style="--accent-color: var(--accent-games);">
                        <i class="fa-solid fa-gamepad card-icon"></i>
                        <h3>Mini Games</h3>
                        <p>Play simple browser games.</p>
                        <span class="card-link">Play Now <i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                </div>

                <h2 class="section-title" style="margin-top: 8rem;">Featured Tools</h2>
                <div class="featured-grid">
                    <div class="card" style="cursor: pointer;" onclick="window.location.hash='#resume-tools'">
                        <i class="fa-solid fa-file-invoice" style="font-size: 2rem; color: var(--accent-resume); margin-bottom: 1rem; filter: drop-shadow(0 0 8px var(--accent-resume));"></i>
                        <h4>Resume Builder</h4>
                        <p>Professional resume in minutes.</p>
                    </div>
                    <div class="card" style="cursor: pointer;" onclick="window.location.hash='#document-tools'">
                        <i class="fa-solid fa-object-group" style="font-size: 2rem; color: var(--accent-doc); margin-bottom: 1rem; filter: drop-shadow(0 0 8px var(--accent-doc));"></i>
                        <h4>Merge PDF</h4>
                        <p>Combine multiple PDF files.</p>
                    </div>
                    <div class="card" style="cursor: pointer;" onclick="window.location.hash='#utilities'">
                        <i class="fa-solid fa-key" style="font-size: 2rem; color: var(--accent-utils); margin-bottom: 1rem; filter: drop-shadow(0 0 8px var(--accent-utils));"></i>
                        <h4>Password Generator</h4>
                        <p>Secure, random passwords.</p>
                    </div>
                    <div class="card" style="cursor: pointer;" onclick="window.location.hash='#image-tools'">
                        <i class="fa-solid fa-compress" style="font-size: 2rem; color: var(--accent-img); margin-bottom: 1rem; filter: drop-shadow(0 0 8px var(--accent-img));"></i>
                        <h4>Image Compressor</h4>
                        <p>Optimize images for web.</p>
                    </div>
                </div>

                <div class="stats-section">
                    <div class="stat-item">
                        <h4>20+</h4>
                        <p>Tools Available</p>
                    </div>
                    <div class="stat-item">
                        <h4>100%</h4>
                        <p>Free to Use</p>
                    </div>
                    <div class="stat-item">
                        <h4>Secure</h4>
                        <p>Client-side Processing</p>
                    </div>
                </div>
            </div>
        `;
    },
    postRender() {
        const searchBar = document.getElementById('tool-search');
        if (!searchBar) return;
        const cards = document.querySelectorAll('#category-grid .card');
        
        searchBar.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            cards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const desc = card.querySelector('p').innerText.toLowerCase();
                if (title.includes(term) || desc.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};
