export default {
    render() {
        return `
            <div class="hero">
                <h1>TECHBOY Tools</h1>
                <p>Free online tools for students and developers. Convert files, compress images, build resumes, and use helpful utilities.</p>
                <a href="#document-tools" class="btn btn-primary">Explore Tools</a>
            </div>

            <div class="container">
                <div class="grid grid-3">
                    <!-- Document Tools -->
                    <a href="#document-tools" class="card" style="--accent-color: var(--accent-doc);">
                        <i class="fa-solid fa-file-pdf card-icon"></i>
                        <h2 class="card-title">Document Tools</h2>
                        <p class="card-desc">Convert, merge and compress PDF files.</p>
                        <span class="card-link">Try Document Tools <i class="fa-solid fa-arrow-right"></i></span>
                    </a>

                    <!-- Image Tools -->
                    <a href="#image-tools" class="card" style="--accent-color: var(--accent-img);">
                        <i class="fa-solid fa-image card-icon"></i>
                        <h2 class="card-title">Image Tools</h2>
                        <p class="card-desc">Compress, resize and convert images.</p>
                        <span class="card-link">Try Image Tools <i class="fa-solid fa-arrow-right"></i></span>
                    </a>

                    <!-- Utilities -->
                    <a href="#utilities" class="card" style="--accent-color: var(--accent-utils);">
                        <i class="fa-solid fa-wrench card-icon"></i>
                        <h2 class="card-title">Utilities</h2>
                        <p class="card-desc">Useful everyday tools for students and developers.</p>
                        <span class="card-link">Try Utilities <i class="fa-solid fa-arrow-right"></i></span>
                    </a>

                    <!-- Resume Tools -->
                    <a href="#resume-tools" class="card" style="--accent-color: var(--accent-resume);">
                        <i class="fa-solid fa-file-invoice card-icon"></i>
                        <h2 class="card-title">Resume Tools</h2>
                        <p class="card-desc">Build, analyze and improve your resume.</p>
                        <span class="card-link">Try Resume Tools <i class="fa-solid fa-arrow-right"></i></span>
                    </a>

                    <!-- Mini Games -->
                    <a href="#games" class="card" style="--accent-color: var(--accent-games);">
                        <i class="fa-solid fa-gamepad card-icon"></i>
                        <h2 class="card-title">Mini Games</h2>
                        <p class="card-desc">Play simple browser games.</p>
                        <span class="card-link">Play Games <i class="fa-solid fa-arrow-right"></i></span>
                    </a>
                </div>
            </div>
        `;
    }
};
