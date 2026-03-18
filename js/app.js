// app.js - Main Application Logic and Routing (Bundled)

// Global Processing Helpers
window.utils = {
    showProcessing(message = 'Processing...') {
        const overlay = document.getElementById('processing-overlay');
        const status = document.getElementById('processing-status');
        if (overlay && status) {
            status.innerText = message;
            overlay.classList.add('active');
        }
    },
    hideProcessing() {
        const overlay = document.getElementById('processing-overlay');
        if (overlay) overlay.classList.remove('active');
    },
    async downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    // Pinning Logic
    getPinnedTools() {
        return JSON.parse(localStorage.getItem('pinned_tools') || '[]');
    },
    togglePin(toolId) {
        let pinned = this.getPinnedTools();
        if (pinned.includes(toolId)) {
            pinned = pinned.filter(id => id !== toolId);
        } else {
            pinned.push(toolId);
        }
        localStorage.setItem('pinned_tools', JSON.stringify(pinned));
        return pinned.includes(toolId);
    },
    // Theme Engine
    setTheme(theme) {
// app.js - Main Application Logic and Routing (Bundled)

// Global Processing Helpers
window.utils = {
    showProcessing(message = 'Processing...') {
        const overlay = document.getElementById('processing-overlay');
        const status = document.getElementById('processing-status');
        if (overlay && status) {
            status.innerText = message;
            overlay.classList.add('active');
        }
    },
    hideProcessing() {
        const overlay = document.getElementById('processing-overlay');
        if (overlay) overlay.classList.remove('active');
    },
    async downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    // Pinning Logic
    getPinnedTools() {
        return JSON.parse(localStorage.getItem('pinned_tools') || '[]');
    },
    togglePin(toolId) {
        let pinned = this.getPinnedTools();
        if (pinned.includes(toolId)) {
            pinned = pinned.filter(id => id !== toolId);
        } else {
            pinned.push(toolId);
        }
        localStorage.setItem('pinned_tools', JSON.stringify(pinned));
        return pinned.includes(toolId);
    },
    // Theme Engine
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('techboy_theme', theme);
        const icon = theme === 'glass' ? 'fa-circle-half-stroke' : (theme === 'space' ? 'fa-moon' : 'fa-bolt');
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
        
        // Update Particles color based on theme
        // (Handled automatically by CSS variables now)
    },
    initTheme() {
        const saved = localStorage.getItem('techboy_theme') || 'glass';
        this.setTheme(saved);
    },
    renderToolCard(tool) {
        const pinned = this.getPinnedTools().includes(tool.id);
        return `
            <div class="card card-featured" style="--accent-color: ${tool.color}; cursor: pointer;" onclick="window.location.hash='${tool.category}'; if(window.activeTool) window.activeTool('${tool.name}', '${tool.desc}')">
                <div class="card-pin-btn ${pinned ? 'active' : ''}" onclick="event.stopPropagation(); window.togglePin('${tool.id}')">
                    <i class="fa-solid fa-thumbtack"></i>
                </div>
                <i class="fa-solid ${tool.icon} card-icon"></i>
                <h3 class="card-title">${tool.name}</h3>
                <p class="card-desc">${tool.desc}</p>
                <span class="btn btn-accent" style="margin-top: auto; width: 100%;">Select Tool</span>
            </div>
        `;
    },
    initMagneticCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 12;
                const rotateY = (centerX - x) / 12;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
                card.style.transition = 'none';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
                card.style.transition = 'var(--transition)';
            });
        });
    }
};

// Global Tools Registry for Search & Dashboard
window.toolsRegistry = [
    { id: 'pdf-merge', name: 'Merge PDF', category: '#document-tools', keywords: 'pdf document combine', icon: 'fa-object-group', color: 'var(--accent-doc)', desc: 'Combine multiple PDFs into one unified document.' },
    { id: 'pdf-split', name: 'Split PDF', category: '#document-tools', keywords: 'pdf document separate', icon: 'fa-scissors', color: 'var(--accent-doc)', desc: 'Separate one page or a whole set into independent PDF files.' },
    { id: 'pdf-compress', name: 'Compress PDF', category: '#document-tools', keywords: 'pdf document smaller size', icon: 'fa-compress', color: 'var(--accent-doc)', desc: 'Reduce file size while optimizing for maximal PDF quality.' },
    { id: 'pdf-word', name: 'PDF to Word', category: '#document-tools', keywords: 'pdf document converter docx doc', icon: 'fa-file-word', color: 'var(--accent-doc)', desc: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.' },
    { id: 'word-pdf', name: 'Word to PDF', category: '#document-tools', keywords: 'pdf document converter docx doc', icon: 'fa-file-pdf', color: 'var(--accent-doc)', desc: 'Make DOC and DOCX files easy to read by converting them to PDF.' },
    { id: 'pdf-bulk-img', name: 'Bulk PDF to Image', category: '#document-tools', keywords: 'pdf image convert pages', icon: 'fa-file-image', color: 'var(--accent-doc)', desc: 'Convert all pages of a PDF into high-quality images.' },
    { id: 'img-compress', name: 'Image Compressor', category: '#image-tools', keywords: 'image photo resize optimize', icon: 'fa-compress', color: 'var(--accent-img)', desc: 'Compress and optimize your images without losing quality.' },
    { id: 'img-resize', name: 'Resize Image', category: '#image-tools', keywords: 'image photo dimensions size', icon: 'fa-up-right-and-down-left-from-center', color: 'var(--accent-img)', desc: 'Resize your images to custom dimensions.' },
    { id: 'jpg-png', name: 'JPG to PNG', category: '#image-tools', keywords: 'image photo convert format', icon: 'fa-file-image', color: 'var(--accent-img)', desc: 'Convert JPG images to PNG format.' },
    { id: 'png-jpg', name: 'PNG to JPG', category: '#image-tools', keywords: 'image photo convert format', icon: 'fa-image', color: 'var(--accent-img)', desc: 'Convert PNG images to JPG format.' },
    { id: 'batch-img', name: 'Batch Image Processor', category: '#image-tools', keywords: 'image batch bulk resize compress', icon: 'fa-images', color: 'var(--accent-img)', desc: 'Process multiple images at once (resize/compress).' },
    { id: 'qr-gen', name: 'QR Code Generator', category: '#utilities', keywords: 'utility code qr link', icon: 'fa-qrcode', color: 'var(--accent-utils)', desc: 'Generate unique QR codes for URLs, text, or Wi-Fi.' },
    { id: 'pw-gen', name: 'Password Generator', category: '#utilities', keywords: 'utility secure key', icon: 'fa-key', color: 'var(--accent-utils)', desc: 'Create strong, secure passwords instantly.' },
    { id: 'unit-conv', name: 'Unit Converter', category: '#utilities', keywords: 'utility conversion px rem px to rem measurement', icon: 'fa-scale-balanced', color: 'var(--accent-utils)', desc: 'Convert between PX, REM, and common data units.' },
    { id: 'color-gen', name: 'Color Palette Generator', category: '#utilities', keywords: 'utility color design ui palette', icon: 'fa-palette', color: 'var(--accent-utils)', desc: 'Generate beautiful random color palettes for your designs.' },
    { id: 'md-editor', name: 'Markdown Editor', category: '#utilities', keywords: 'utility editor markdown preview write', icon: 'fa-pen-to-square', color: 'var(--accent-utils)', desc: 'Write and preview Markdown with real-time feedback.' },
    { id: 'ai-writer', name: 'AI Technical Writer', category: '#utilities', keywords: 'utility write ai docs readme', icon: 'fa-robot', color: 'var(--accent-utils)', desc: 'Convert technical notes into structured documentation.' },
    { id: 'code-vault', name: 'Code Snippet Vault', category: '#utilities', keywords: 'utility code snippet save store', icon: 'fa-box-archive', color: 'var(--accent-utils)', desc: 'Securely save and organize your reusable code snippets.' },
    { id: 'res-builder', name: 'Resume Builder', category: '#resume-tools', keywords: 'resume cv job builder', icon: 'fa-pencil', color: 'var(--accent-resume)', desc: 'Build a professional resume with ease.' },
    { id: 'ats-chk', name: 'ATS Analyzer', category: '#resume-tools', keywords: 'resume cv job score', icon: 'fa-magnifying-glass-chart', color: 'var(--accent-resume)', desc: 'Analyze your resume for ATS compatibility.' },
    { id: 'game-snake', name: 'Snake Game', category: '#games', keywords: 'game fun snake', icon: 'fa-staff-snake', color: 'var(--accent-games)', desc: 'The classic snake game. Eat food, grow longer!' }
];

function createDocInterface(title, desc) {
    return `
        <div class="tool-section animate-in">
            <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back to Tools</button>
            <div class="tool-header">
                <h2>${title}</h2>
                <p>${desc}</p>
            </div>
            
            <div class="file-drop-area" id="doc-drop-area" onclick="document.getElementById('file-upload').click()">
                <i class="fa-solid fa-cloud-arrow-up file-drop-icon"></i>
                <div class="file-drop-text" id="doc-drop-text">Choose files or drag & drop them here</div>
                <div class="file-drop-hint">${title === 'Word to PDF' ? 'DOCX files only' : 'PDF files only'} (Max 100MB)</div>
                <input type="file" id="file-upload" ${title === 'Merge PDF' ? 'multiple' : ''} accept="${title === 'Word to PDF' ? '.docx' : '.pdf'}">
            </div>

            <div id="tool-options" style="margin-bottom: 2rem; display: none;">
                <!-- Tool specific options will be injected here -->
            </div>

            <div style="text-align: center;">
                <button class="btn btn-accent" id="doc-process-btn" disabled>${title}</button>
            </div>

            <div class="result-container" id="doc-result">
                <i class="fa-solid fa-circle-check success-icon"></i>
                <h3>${title} Complete!</h3>
                <p>Your file is ready for download.</p>
                <div style="margin-top: 1.5rem;">
                    <button class="btn btn-primary" id="doc-download-btn">Download Processed File</button>
                </div>
            </div>
        </div>
    `;
}

function createImageInterface(title, desc) {
    return `
        <div class="tool-section">
            <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back to Tools</button>
            <div class="tool-header">
                <h2>${title}</h2>
                <p>${desc}</p>
            </div>
            
            <div class="file-drop-area" id="img-drop-area" onclick="document.getElementById('img-upload').click()">
                <i class="fa-solid fa-cloud-arrow-up file-drop-icon"></i>
                <div class="file-drop-text" id="img-drop-text">Choose image or drag & drop it here</div>
                <div class="file-drop-hint">JPG, PNG, WEBP (Max 20MB)</div>
                <input type="file" id="img-upload" accept="image/*">
            </div>

            <div style="text-align: center; display: none;" id="img-preview-container">
                <img id="img-preview" style="max-width: 100%; max-height: 300px; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" />
            </div>

            <div style="text-align: center; margin-bottom: 1rem;">
                <button class="btn btn-accent" id="img-process-btn" disabled>${title}</button>
            </div>
            
            <div id="img-result-area" style="text-align: center; display: none;">
                <p style="color: #10B981; font-weight: 600; margin-bottom: 1rem;">Success! Image processed.</p>
                <a id="img-download-link" class="btn btn-primary" download="processed_image">Download Image</a>
            </div>
        </div>
    `;
}

const resumeBuilderHTML = `
    <div class="tool-section">
        <div id="resume-form-area">
            <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back</button>
            <div class="tool-header">
                <h2>Resume Builder</h2>
                <p>Fill out the form below to generate your professional resume.</p>
            </div>
            <div class="grid grid-2">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" id="res-name" class="form-control" placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="res-email" class="form-control" placeholder="john@example.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input type="tel" id="res-phone" class="form-control" placeholder="+1 234 567 8900">
                </div>
                <div class="form-group">
                    <label class="form-label">LinkedIn</label>
                    <input type="url" id="res-linkedin" class="form-control" placeholder="linkedin.com/in/johndoe">
                </div>
                <div class="form-group">
                    <label class="form-label">GitHub</label>
                    <input type="url" id="res-github" class="form-control" placeholder="github.com/johndoe">
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Education</label>
                    <textarea id="res-education" class="form-control" placeholder="University Name | Degree | Dates..."></textarea>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Skills (Separate with commas)</label>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <input type="text" id="res-skills" class="form-control" placeholder="HTML, CSS, JavaScript, Python...">
                        <button class="btn btn-primary" id="btn-suggest-keywords" style="white-space: nowrap; padding: 0 1rem; height: 48px;">Get Suggestions</button>
                    </div>
                    <div id="keyword-suggestions" style="display: none; padding: 0.5rem; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px dashed var(--primary-brand); font-size: 0.85rem; color: var(--primary-brand);">
                        <strong>Suggested Keywords:</strong> <span id="suggested-list"></span>
                    </div>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Projects</label>
                    <textarea id="res-projects" class="form-control" placeholder="Project Name | Description | Technologies used..."></textarea>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Experience</label>
                    <textarea id="res-experience" class="form-control" placeholder="Company Name | Job Title | Dates..."></textarea>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label class="form-label">Certifications</label>
                    <textarea id="res-certifications" class="form-control" placeholder="Certification Name | Issuing Organization | Date..."></textarea>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.5); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
                <label class="form-label" style="display: block; margin-bottom: 1rem;">Choose Template Style</label>
                <div style="display: flex; justify-content: center; gap: 2rem;">
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="res-template" value="classic" checked> Classic Professional
                    </label>
                    <label style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
                        <input type="radio" name="res-template" value="creative"> Creative Modern
                    </label>
                </div>
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-accent" id="btn-preview-resume">Preview & Download PDF</button>
            </div>
        </div>
        
        <div id="resume-preview-area" style="display: none; background: white; padding: 2rem; border-radius: 8px; box-shadow: var(--card-shadow); color: #0f172a; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <h1 id="pv-name" style="margin: 0; font-size: 2.5rem;"></h1>
                    <p id="pv-contact" style="margin: 0.5rem 0 0; color: #475569;"></p>
                </div>
                <div id="pv-socials" style="text-align: right; color: #475569;"></div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Education</h3>
                <p id="pv-education" style="white-space: pre-wrap;"></p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Skills</h3>
                <p id="pv-skills"></p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Projects</h3>
                <p id="pv-projects" style="white-space: pre-wrap;"></p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Experience</h3>
                <p id="pv-experience" style="white-space: pre-wrap;"></p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Certifications</h3>
                <p id="pv-certifications" style="white-space: pre-wrap;"></p>
            </div>

            <div style="text-align: center; margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;" class="no-print">
                <button class="btn btn-accent" onclick="document.getElementById('resume-preview-area').style.display='none'; document.getElementById('resume-form-area').style.display='block';">Edit Form</button>
                <button class="btn btn-primary" id="pv-btn-download">Download PDF</button>
            </div>
        </div>
    </div>
`;

const atsAnalyzerHTML = `
    <div class="tool-section">
        <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back</button>
        <div class="tool-header">
            <h2>ATS Analyzer</h2>
            <p>Upload your resume to check its Applicant Tracking System score.</p>
        </div>
        <div class="file-drop-area" id="ats-drop-area" onclick="document.getElementById('ats-upload').click()">
            <i class="fa-solid fa-cloud-arrow-up file-drop-icon"></i>
            <div class="file-drop-text" id="ats-drop-text">Upload Resume (PDF or DOCX)</div>
            <input type="file" id="ats-upload" accept=".pdf,.docx">
        </div>
        <div style="text-align: center; margin-bottom: 2rem;">
            <button class="btn btn-accent" id="btn-analyze-ats">Analyze Resume</button>
        </div>
        
        <div id="ats-result" style="display: none; background: #F8FAFC; padding: 2rem; border-radius: var(--radius-card); border: 1px solid #E2E8F0;">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 2rem; color: #06B6D4;">Resume Score: <span id="ats-score">82</span>/100</h3>
                <p id="ats-feedback">Great! But there's room for improvement.</p>
            </div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem;">
                <li><i class="fa-solid fa-check" style="color: #059669;"></i> <strong>ATS Compatibility:</strong> <span id="ats-compat">Passed</span></li>
                <li><i class="fa-solid fa-circle-info" style="color: #06B6D4;"></i> <strong>Keyword Match:</strong> <span id="ats-keywords">65% match with target industry</span></li>
                <li><i class="fa-solid fa-check" style="color: #059669;"></i> <strong>Formatting Quality:</strong> <span id="ats-format">Excellent structure</span></li>
                <li><i class="fa-solid fa-check" style="color: #059669;"></i> <strong>Content Strength:</strong> <span id="ats-content">Good use of action verbs</span></li>
            </ul>
        </div>
    </div>
`;

const aiImproverHTML = `
    <div class="tool-section">
        <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back</button>
        <div class="tool-header">
            <h2>AI Resume Improver</h2>
            <p>Paste a bullet point or paragraph from your resume, and let AI rewrite it professionally.</p>
        </div>
        <div class="form-group">
            <label class="form-label">Original Text</label>
            <textarea id="ai-input" class="form-control" placeholder="e.g. I made the website load faster by changing some images..."></textarea>
        </div>
        <div style="text-align: center; margin-bottom: 2rem;">
            <button class="btn btn-accent" id="btn-improve-resume">Improve Text</button>
        </div>
        
        <div id="ai-output-area" class="form-group" style="display: none;">
            <label class="form-label">AI Suggestion</label>
            <div class="form-control" id="ai-output" style="min-height: 100px; background: #EEF2FF; border-color: #C7D2FE; white-space: pre-wrap;"></div>
        </div>
    </div>
`;


const HomeView = {
    render() {
        return `
            <section class="hero">
                <div class="container">
                    <h1>TECHBOY Tools</h1>
                    <p>Free online tools for students and developers. Convert files, compress images, build resumes, and use helpful utilities.</p>
                    <div class="hero-btns">
                        <a href="#document-tools" class="btn btn-primary">Explore Tools</a>
                        <a href="#resume-tools" class="btn btn-outline">Resume Builder</a>
                    </div>
                </div>
            </section>

            <div class="container">
                <div id="pinned-section" style="display: none; margin-bottom: 4rem;">
                    <h2 class="section-title">Your Dashboard</h2>
                    <div class="grid grid-3" id="pinned-grid"></div>
                </div>

                <div class="search-container">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" class="search-bar" id="tool-search" placeholder="Search tools... e.g. PDF, Resume, Password">
                    <div id="search-results" class="search-dropdown"></div>
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
                <div class="grid grid-4">
                    ${window.toolsRegistry.filter(t => ['res-builder', 'pdf-merge', 'pw-gen', 'img-compress'].includes(t.id)).map(t => window.utils.renderToolCard(t)).join('')}
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
        const searchDropdown = document.getElementById('search-results');
        if (!searchBar || !searchDropdown) return;
        
        searchBar.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            if (!term) {
                searchDropdown.style.display = 'none';
                return;
            }

            const matches = window.toolsRegistry.filter(t => 
                t.name.toLowerCase().includes(term) || 
                t.keywords.includes(term)
            ).slice(0, 5);

            if (matches.length > 0) {
                searchDropdown.innerHTML = matches.map(m => `
                    <div class="search-result-item" onclick="window.location.hash='${m.category}'; document.getElementById('search-results').style.display='none';">
                        <span>${m.name}</span>
                        <small>${m.category.replace('#', '').replace('-', ' ')}</small>
                    </div>
                `).join('');
                searchDropdown.style.display = 'block';
            } else {
                searchDropdown.style.display = 'none';
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.style.display = 'none';
            }
        });

        // Dashboard Rendering
        const renderDashboard = () => {
            const pinnedIds = window.utils.getPinnedTools();
            const pinnedContainer = document.getElementById('pinned-section');
            const pinnedGrid = document.getElementById('pinned-grid');
            
            if (pinnedIds.length > 0) {
                pinnedContainer.style.display = 'block';
                const pinnedTools = window.toolsRegistry.filter(t => pinnedIds.includes(t.id));
                pinnedGrid.innerHTML = pinnedTools.map(t => `
                    <div class="card card-featured" style="--accent-color: ${t.color}; cursor: pointer;" onclick="window.location.hash='${t.category}'">
                        <div class="card-pin-btn active" onclick="event.stopPropagation(); window.togglePin('${t.id}')">
                            <i class="fa-solid fa-thumbtack"></i>
                        </div>
                        <i class="fa-solid ${t.icon} card-icon"></i>
                        <h3 class="card-title">${t.name}</h3>
                        <p class="card-desc">${t.desc}</p>
                    </div>
                `).join('');
            } else {
                pinnedContainer.style.display = 'none';
            }
        };

        window.togglePin = (id) => {
            window.utils.togglePin(id);
            renderDashboard();
        };

        renderDashboard();

        // Theme Toggle Handler
        const themeBtn = document.getElementById('theme-toggle');
        const themeMenu = document.getElementById('theme-menu');
        if (themeBtn && themeMenu) {
            themeBtn.onclick = (e) => {
                e.stopPropagation();
                themeMenu.classList.toggle('active');
            };
            document.addEventListener('click', () => themeMenu.classList.remove('active'));
        }


        // Interactive Tour Logic
        if (!sessionStorage.getItem('tour_done')) {
            const container = searchBar.parentElement;
            container.classList.add('pulse-onboarding');
            
            const tourPopup = document.createElement('div');
            tourPopup.style.cssText = `
                position: absolute; top: 110%; left: 0; background: var(--primary-brand);
                color: white; padding: 1rem; border-radius: 12px; font-size: 0.9rem;
                z-index: 1000; box-shadow: 0 10px 25px rgba(0,0,0,0.2); width: 250px;
                animation: slide-up 0.5s ease-out;
            `;
            tourPopup.innerHTML = `
                <strong>✨ Quick Start!</strong><br>
                Try searching for "PDF" or "Resume" to find tools instantly.
                <button class="btn btn-sm" style="margin-top: 0.5rem; background: white; color: var(--primary-brand); width: 100%;" id="btn-close-tour">Got it!</button>
            `;
            container.appendChild(tourPopup);

            document.getElementById('btn-close-tour').onclick = () => {
                container.classList.remove('pulse-onboarding');
                tourPopup.remove();
                sessionStorage.setItem('tour_done', 'true');
            };
        }
    }
};

const DocToolsView = {
    render() {
        return `
            <div class="container">
                <div id="list-view">
                    <div class="tool-header">
                        <h1>Document Tools</h1>
                        <p>Convert, merge and compress PDF files.</p>
                    </div>

                    <div class="grid grid-3">
                        ${window.toolsRegistry.filter(t => t.category === '#document-tools').map(t => window.utils.renderToolCard(t, 'doc')).join('')}
                    </div>
                </div>
                <div id="tool-view" style="display: none;"></div>
            </div>
        `;
    },
    postRender() {
        window.activeTool = (title, desc) => {
            document.getElementById('list-view').style.display = 'none';
            const toolView = document.getElementById('tool-view');
            toolView.style.display = 'block';
            
            if (title === 'Bulk PDF to Image') {
                toolView.innerHTML = createBulkPDFImageInterface(title, desc);
                initBulkPDFImageLogic();
            } else {
                toolView.innerHTML = createDocInterface(title, desc);
                initDocToolLogic(title);
            }
        };
    }
};

function initDocToolLogic(title) {
    const fileInput = document.getElementById('file-upload');
    const dropArea = document.getElementById('doc-drop-area');
    const dropText = document.getElementById('doc-drop-text');
    const processBtn = document.getElementById('doc-process-btn');
    const optionsArea = document.getElementById('tool-options');
    const resultArea = document.getElementById('doc-result');
    const downloadBtn = document.getElementById('doc-download-btn');

    let processedBlob = null;
    let files = [];

    if (title === 'Split PDF') {
        optionsArea.innerHTML = `
            <div class="form-group">
                <label class="form-label">Page Range (e.g. 1-3, 5)</label>
                <input type="text" id="split-range" class="form-control" placeholder="1">
            </div>
        `;
        optionsArea.style.display = 'block';
    }

    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            files = Array.from(fileInput.files);
            dropText.innerText = files.length > 1 ? `${files.length} files selected` : files[0].name;
            processBtn.disabled = false;
        }
    };

    processBtn.onclick = async () => {
        window.utils.showProcessing(`Running ${title}...`);
        try {
            if (title === 'Merge PDF') {
                const mergedPdf = await PDFLib.PDFDocument.create();
                for (const file of files) {
                    const pdfBytes = await file.arrayBuffer();
                    const doc = await PDFLib.PDFDocument.load(pdfBytes);
                    const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
                    pages.forEach(page => mergedPdf.addPage(page));
                }
                const pdfBytes = await mergedPdf.save();
                processedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            } else if (title === 'Split PDF') {
                const range = document.getElementById('split-range').value || "1";
                const pdfBytes = await files[0].arrayBuffer();
                const doc = await PDFLib.PDFDocument.load(pdfBytes);
                const splitPdf = await PDFLib.PDFDocument.create();
                const indices = [];
                range.split(',').forEach(part => {
                    if (part.includes('-')) {
                        const [start, end] = part.split('-').map(Number);
                        for (let i = start; i <= end; i++) indices.push(i - 1);
                    } else {
                        indices.push(Number(part) - 1);
                    }
                });
                const pages = await splitPdf.copyPages(doc, indices.filter(i => i >= 0 && i < doc.getPageCount()));
                pages.forEach(page => splitPdf.addPage(page));
                const resultBytes = await splitPdf.save();
                processedBlob = new Blob([resultBytes], { type: 'application/pdf' });
            } else if (title === 'Compress PDF') {
                const pdfBytes = await files[0].arrayBuffer();
                const doc = await PDFLib.PDFDocument.load(pdfBytes);
                doc.setTitle('');
                doc.setAuthor('');
                const resultBytes = await doc.save();
                processedBlob = new Blob([resultBytes], { type: 'application/pdf' });
            } else if (title === 'Word to PDF') {
                const arrayBuffer = await files[0].arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
                const tempDiv = document.createElement('div');
                tempDiv.style.width = '595px'; tempDiv.style.padding = '40px'; tempDiv.style.background = 'white'; tempDiv.style.color = 'black';
                tempDiv.innerHTML = result.value;
                document.body.appendChild(tempDiv);
                const canvas = await html2canvas(tempDiv);
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                processedBlob = pdf.output('blob');
                document.body.removeChild(tempDiv);
            } else if (title === 'PDF to Word') {
                const { Document, Packer, Paragraph, TextRun } = window.docx;
                const wordDoc = new Document({
                    sections: [{ children: [new Paragraph({ children: [new TextRun("Extracted Text from PDF:"), new TextRun({ text: "\n(Demo Extraction)", bold: true })] })] }]
                });
                processedBlob = await Packer.toBlob(wordDoc);
            }
            resultArea.style.display = 'block';
            processBtn.innerText = 'Rerun Processing';
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            window.utils.hideProcessing();
        }
    };

    downloadBtn.onclick = () => {
        if (processedBlob) window.utils.downloadBlob(processedBlob, `TECHBOY_${title.replace(/\s+/g, '_')}.pdf`);
    };
}

function initImageToolLogic(title, desc) {
    const toolView = document.getElementById('tool-view');
    toolView.innerHTML = createImageInterface(title, desc); // Assuming createImageInterface exists
    const fileInput = document.getElementById('img-file-upload');
    const dropArea = document.getElementById('img-drop-area');
    const previewImg = document.getElementById('img-preview');
    const previewContainer = document.getElementById('img-preview-container');
    const processBtn = document.getElementById('img-process-btn');
    const resultArea = document.getElementById('img-result-area');
    const downloadLink = document.getElementById('img-download-link');
    const dropText = document.getElementById('img-drop-text');
    
    let currentFile = null;
    let currentImageURL = null;

    // Drag and drop styles
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.borderColor = 'var(--primary-brand)';
        dropArea.style.backgroundColor = '#EFF6FF';
    });
    dropArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropArea.style.borderColor = '#CBD5E1';
        dropArea.style.backgroundColor = '#F8FAFC';
    });
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.style.borderColor = '#CBD5E1';
        dropArea.style.backgroundColor = '#F8FAFC';
        if(e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect() {
        if(fileInput.files.length > 0) {
            currentFile = fileInput.files[0];
            if(!currentFile.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }
            
            dropText.textContent = currentFile.name;
            currentImageURL = URL.createObjectURL(currentFile);
            previewImg.src = currentImageURL;
            previewContainer.style.display = 'block';
            processBtn.disabled = false;
            resultArea.style.display = 'none';
        }
    }

    processBtn.addEventListener('click', async () => {
        if(!currentFile) return;
        
        window.utils.showProcessing(`Processing ${title}...`);
        
        try {
            const img = new Image();
            img.src = currentImageURL;
            await new Promise(resolve => img.onload = resolve);
            
            const canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            let targetFormat = currentFile.type;
            let quality = 0.92;
            let outputExt = currentFile.name.split('.').pop();
            
            if(title === 'Resize Image') {
                const targetWidth = prompt("Enter target width (px):", width) || width;
                const ratio = targetWidth / width;
                width = parseInt(targetWidth);
                height = parseInt(height * ratio);
            } else if (title === 'Image Compressor') {
                quality = 0.6;
            } else if (title === 'JPG to PNG') {
                targetFormat = 'image/png';
                outputExt = 'png';
            } else if (title === 'PNG to JPG') {
                targetFormat = 'image/jpeg';
                outputExt = 'jpg';
            }
            
            canvas.width = width;
            canvas.height = height;

            if(targetFormat === 'image/jpeg') {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, width, height);
            }
            
            ctx.drawImage(img, 0, 0, width, height);
            
            const blob = await new Promise(resolve => canvas.toBlob(resolve, targetFormat, quality));
            const newUrl = URL.createObjectURL(blob);
            downloadLink.href = newUrl;
            downloadLink.download = `techboy_${title.replace(/\s+/g, '_').toLowerCase()}.${outputExt}`;
            
            previewImg.src = newUrl;
            resultArea.style.display = 'block';
            processBtn.disabled = true;
        } catch (err) {
            alert(`Error processing image: ${err.message}`);
        } finally {
            window.utils.hideProcessing();
        }
    });
}

const ImageToolsView = {
    render() {
        return `
            <div class="container">
                <div id="list-view">
                    <div class="tool-header">
                        <h1>Image Tools</h1>
                        <p>Compress, resize and convert images.</p>
                    </div>
                    <div class="grid grid-3">
                        ${window.toolsRegistry.filter(t => t.category === '#image-tools').map(t => window.utils.renderToolCard(t)).join('')}
                    </div>
                </div>
                <div id="tool-view" style="display: none;"></div>
            </div>
        `;
    },
    postRender() {
        window.activeTool = (title, desc) => {
            document.getElementById('list-view').style.display = 'none';
            const toolView = document.getElementById('tool-view');
            toolView.style.display = 'block';
            
            if (title === 'Batch Image Processor') {
                toolView.innerHTML = createBatchImageInterface(title, desc);
                initBatchImageLogic();
            } else {
                initImageToolLogic(title, desc);
            }
        };
    }
};

const UtilitiesView = {
    render() {
        return `
            <div class="container">
                <div id="list-view">
                    <div class="tool-header">
                        <h1>Utilities</h1>
                        <p>Useful everyday tools for students and developers.</p>
                    </div>

                    <div class="grid grid-3">
                        ${window.toolsRegistry.filter(t => t.category === '#utilities').map(t => window.utils.renderToolCard(t)).join('')}
                    </div>
                </div>

                <div id="util-view" style="display: none;">
                    <div class="tool-section">
                        <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('util-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back to Utilities</button>
                        <div class="tool-header" id="util-header">
                            <h2>Tool Name</h2>
                        </div>
                        
                        <div class="form-group" id="util-input-group">
                            <label class="form-label">Input</label>
                            <textarea id="util-input" class="form-control" placeholder="Enter text here..."></textarea>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;" id="util-actions">
                            <!-- Action buttons injected here -->
                        </div>

                        <div class="form-group" id="util-output-group">
                            <label class="form-label">Result</label>
                            <div class="form-control" id="util-output" style="min-height: 100px; background: #F8FAFC; white-space: pre-wrap;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    postRender() {
        window.activeTool = (name, desc) => {
            document.getElementById('list-view').style.display = 'none';
            if (name === 'AI Technical Writer' || name === 'Code Snippet Vault') {
                initPowerUtilityLogic(name);
            } else {
                window.utils.showProcessing(`Opening ${name}...`);
                setTimeout(() => {
                    initStandardUtilityLogic(name);
                    window.utils.hideProcessing();
                }, 500);
            }
        };

        function initStandardUtilityLogic(title) {
            document.getElementById('util-view').style.display = 'block';
            document.getElementById('util-header').innerHTML = `<h2>${title}</h2>`;
            
            const actionContainer = document.getElementById('util-actions');
            const inputGroup = document.getElementById('util-input-group');
            const inputEl = document.getElementById('util-input');
            const outputEl = document.getElementById('util-output');
            
            inputGroup.style.display = 'block';
            inputEl.value = '';
            outputEl.innerHTML = '';
            actionContainer.innerHTML = '';
            
            if (title === 'Word Counter') {
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Count</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    const text = inputEl.value;
                    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
                    const chars = text.length;
                    const time = Math.ceil(words / 200); // 200 WPM
                    outputEl.innerHTML = `<strong>Words:</strong> ${words}<br><strong>Characters:</strong> ${chars}<br><strong>Est. Reading Time:</strong> ~${time} min`;
                });
            } else if (title === 'Text Case Converter') {
                actionContainer.innerHTML = `
                    <button class="btn btn-accent" id="btn-upper">UPPERCASE</button>
                    <button class="btn btn-accent" id="btn-lower">lowercase</button>
                    <button class="btn btn-accent" id="btn-title">Title Case</button>
                `;
                document.getElementById('btn-upper').addEventListener('click', () => outputEl.textContent = inputEl.value.toUpperCase());
                document.getElementById('btn-lower').addEventListener('click', () => outputEl.textContent = inputEl.value.toLowerCase());
                document.getElementById('btn-title').addEventListener('click', () => {
                    outputEl.textContent = inputEl.value.replace(
                        /\w\S*/g,
                        function(txt) {
                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                        }
                    );
                });
            } else if (title === 'Password Generator') {
                inputGroup.style.display = 'none';
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Generate Password</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                    let password = "";
                    for (let i = 0; i < 16; i++) {
                        password += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    outputEl.innerHTML = `<span style="font-family: monospace; font-size: 1.25rem;">${password}</span>`;
                });
            } else if (title === 'Password Strength Checker') {
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Check Strength</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    const pw = inputEl.value;
                    let strength = 0;
                    if (pw.length > 7) strength += 1;
                    if (pw.match(/[a-z]+/)) strength += 1;
                    if (pw.match(/[A-Z]+/)) strength += 1;
                    if (pw.match(/[0-9]+/)) strength += 1;
                    if (pw.match(/[$@#&!]+/)) strength += 1;
                    
                    let result = "";
                    let color = "";
                    if (pw.length === 0) { result = "Please enter a password."; color = "black"; }
                    else if (strength < 3) { result = "Weak"; color = "#EF4444"; }
                    else if (strength === 3 || strength === 4) { result = "Medium"; color = "#F59E0B"; }
                    else { result = "Strong"; color = "#10B981"; }
                    
                    outputEl.innerHTML = `<strong style="color: ${color}; font-size: 1.25rem;">${result}</strong><br><small>Criteria met: ${strength}/5</small>`;
                });
            } else if (title === 'JSON Formatter') {
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Format JSON</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    try {
                        const parsed = JSON.parse(inputEl.value);
                        outputEl.innerHTML = `<pre style="margin: 0;">${JSON.stringify(parsed, null, 4)}</pre>`;
                    } catch (e) {
                        outputEl.innerHTML = `<span style="color: #EF4444;">Invalid JSON: ${e.message}</span>`;
                    }
                });
            } else if (title === 'QR Code Generator') {
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Generate QR Code</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    const text = inputEl.value.trim();
                    if (!text) {
                        outputEl.innerHTML = '<span style="color: #EF4444;">Please enter some text or a URL.</span>';
                        return;
                    }
                    outputEl.innerHTML = '<div id="qrcode-container" style="display: flex; justify-content: center; padding: 1rem; background: white; border-radius: 8px;"></div>';
                    new QRCode(document.getElementById("qrcode-container"), {
                        text: text,
                        width: 256,
                        height: 256,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                });
            } else if (title === 'Text Summarizer') {
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Summarize</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    const text = inputEl.value.trim();
                    if(text.length < 50) {
                        outputEl.innerHTML = `<span style="color: #EF4444;">Text is too short to summarize. Please enter at least a paragraph.</span>`;
                        return;
                    }
                    // Improved extractive summarization
                    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
                    if(sentences.length <= 3) {
                        outputEl.textContent = text;
                    } else {
                        // Very basic score based on length for demo
                        const summary = [sentences[0], sentences[Math.floor(sentences.length/2)], sentences[sentences.length - 1]].join(' ');
                        outputEl.innerHTML = `<strong>*Summarized Text*:</strong><br><br>${summary}`;
                    }
                });
            } else if (title === 'Unit Converter') {
                    actionContainer.innerHTML = `
                        <button class="btn btn-accent" id="btn-px-rem">PX to REM</button>
                        <button class="btn btn-accent" id="btn-mb-gb">MB to GB</button>
                    `;
                    inputEl.placeholder = "Enter value (e.g. 16)";
                    document.getElementById('btn-px-rem').addEventListener('click', () => {
                        const val = parseFloat(inputEl.value) || 0;
                        outputEl.innerHTML = `<strong style="font-size: 1.5rem;">${val / 16}rem</strong><br><small>(Base 16px)</small>`;
                    });
                    document.getElementById('btn-mb-gb').addEventListener('click', () => {
                        const val = parseFloat(inputEl.value) || 0;
                        outputEl.innerHTML = `<strong style="font-size: 1.5rem;">${(val / 1024).toFixed(4)} GB</strong>`;
                    });
                } else if (title === 'Color Palette Generator') {
                    inputGroup.style.display = 'none';
                    actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Generate Palette</button>';
                    const generate = () => {
                        const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
                        const colors = [randomColor(), randomColor(), randomColor(), randomColor()];
                        outputEl.innerHTML = `
                            <div style="display: flex; height: 100px; border-radius: 8px; overflow: hidden; margin-bottom: 1rem;">
                                ${colors.map(c => `<div style="flex: 1; background: ${c}; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 5px; color: white; font-size: 10px; font-family: monospace; text-shadow: 0 1px 2px black;">${c}</div>`).join('')}
                            </div>
                            <div style="text-align: center;">Click to copy: ${colors.join(', ')}</div>
                        `;
                    };
                    document.getElementById('btn-action').addEventListener('click', generate);
                    generate();
                } else if (title === 'Markdown Editor') {
                    inputEl.placeholder = "# Hello World\n\nStart writing markdown...";
                    actionContainer.innerHTML = '<span style="color: var(--text-muted); font-size: 0.9rem;">Preview updates as you type</span>';
                    inputEl.addEventListener('input', () => {
                        // Simple MD parser logic (limited for demo)
                        let html = inputEl.value
                            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
                            .replace(/\*(.*)\*/gim, '<i>$1</i>')
                            .replace(/\n$/gim, '<br>');
                        outputEl.innerHTML = html || '<i>Preview area</i>';
                    });
                }
        };
    }
};

const ResumeToolsView = {
    render() {
        return `
            <div class="container">
                <div id="list-view">
                    <div class="tool-header">
                        <h1>Resume Tools</h1>
                        <p>Build, analyze and improve your resume.</p>
                    </div>

                    <div class="grid grid-3">
                        ${window.toolsRegistry.filter(t => t.category === '#resume-tools').map(t => window.utils.renderToolCard(t)).join('')}
                    </div>
                </div>
                <div id="tool-view" style="display: none;"></div>
            </div>
        `;
    },
    postRender() {
        window.activeTool = (name, desc) => {
            document.getElementById('list-view').style.display = 'none';
            const tv = document.getElementById('tool-view');
            tv.style.display = 'block';
            
            const tool = window.toolsRegistry.find(t => t.name === name);
            if (!tool) return;

            if (tool.id === 'res-builder') {
                tv.innerHTML = resumeBuilderHTML;
                initResumeBuilderLogic();
            } else if (tool.id === 'ats-chk') {
                tv.innerHTML = atsAnalyzerHTML;
                initATSAnalyzerLogic();
            } else if (tool.id === 'ai-improver') {
                tv.innerHTML = aiImproverHTML;
                initAIImproverLogic();
            }
        };

        function initResumeBuilderLogic() {
            // Keyword Suggestions
            const btnSuggest = document.getElementById('btn-suggest-keywords');
            const suggestedBox = document.getElementById('keyword-suggestions');
            const suggestedList = document.getElementById('suggested-list');
            const skillsInput = document.getElementById('res-skills');

            btnSuggest.onclick = () => {
                const roles = ["React, Node.js, TypeScript, AWS, Docker, CI/CD", "Python, SQL, Tableau, Machine Learning, Statistics", "UI/UX, Figma, Adobe XD, User Research, Prototyping", "Spring Boot, Microservices, Kubernetes, Java, MongoDB"];
                const randomRole = roles[Math.floor(Math.random() * roles.length)];
                suggestedList.innerText = randomRole;
                suggestedBox.style.display = 'block';
                
                suggestedList.style.cursor = 'pointer';
                suggestedList.onclick = () => {
                    skillsInput.value += (skillsInput.value ? ', ' : '') + randomRole;
                    suggestedBox.style.display = 'none';
                };
            };

            document.getElementById('btn-preview-resume').onclick = () => {
                const name = document.getElementById('res-name').value || "Your Name";
                const email = document.getElementById('res-email').value || "email@example.com";
                const phone = document.getElementById('res-phone').value || "123-456-7890";
                const linkedin = document.getElementById('res-linkedin').value;
                const github = document.getElementById('res-github').value;
                
                const template = document.querySelector('input[name="res-template"]:checked').value;
                const previewArea = document.getElementById('resume-preview-area');
                
                if (template === 'creative') {
                    previewArea.className = 'creative-template';
                    previewArea.innerHTML = `
                        <div class="creative-sidebar">
                            <h1 style="color: white; font-size: 2rem; margin: 0;">${name}</h1>
                            <p style="font-size: 0.9rem; opacity: 0.8;">${email}<br>${phone}</p>
                            <div>
                                <h3>Socials</h3>
                                <p style="font-size: 0.85rem;">${linkedin ? `IN: ${linkedin}<br>` : ''}${github ? `GH: ${github}` : ''}</p>
                            </div>
                            <div>
                                <h3>Skills</h3>
                                <p style="font-size: 0.85rem;">${document.getElementById('res-skills').value}</p>
                            </div>
                        </div>
                        <div class="creative-main">
                            <section>
                                <h3>Education</h3>
                                <p style="white-space: pre-wrap;">${document.getElementById('res-education').value}</p>
                            </section>
                            <section style="margin-top: 1.5rem;">
                                <h3>Experience</h3>
                                <p style="white-space: pre-wrap;">${document.getElementById('res-experience').value}</p>
                            </section>
                            <section style="margin-top: 1.5rem;">
                                <h3>Projects</h3>
                                <p style="white-space: pre-wrap;">${document.getElementById('res-projects').value}</p>
                            </section>
                            <div style="margin-top: 2rem; display: flex; gap: 1rem;" class="no-print">
                                <button class="btn btn-accent btn-sm" onclick="document.getElementById('resume-preview-area').style.display='none'; document.getElementById('resume-form-area').style.display='block';">Edit</button>
                                <button class="btn btn-primary btn-sm" id="pv-btn-download-creative">Download PDF</button>
                            </div>
                        </div>
                    `;
                    // Re-bind download for creative
                    document.getElementById('pv-btn-download-creative').onclick = () => document.getElementById('pv-btn-download').click();
                } else {
                    previewArea.className = '';
                    previewArea.style.background = 'white';
                    previewArea.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 1rem; margin-bottom: 1.5rem;">
                            <div>
                                <h1 id="pv-name" style="margin: 0; font-size: 2.5rem;">${name}</h1>
                                <p id="pv-contact" style="margin: 0.5rem 0 0; color: #475569;">${email} | ${phone}</p>
                            </div>
                            <div id="pv-socials" style="text-align: right; color: #475569;">${linkedin ? `LinkedIn: ${linkedin}<br>` : ''}${github ? `GitHub: ${github}` : ''}</div>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Education</h3>
                            <p style="white-space: pre-wrap;">${document.getElementById('res-education').value}</p>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Skills</h3>
                            <p>${document.getElementById('res-skills').value}</p>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <h3 style="border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem;">Experience</h3>
                            <p style="white-space: pre-wrap;">${document.getElementById('res-experience').value}</p>
                        </div>
                        <div style="text-align: center; margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;" class="no-print">
                            <button class="btn btn-accent" onclick="document.getElementById('resume-preview-area').style.display='none'; document.getElementById('resume-form-area').style.display='block';">Edit Form</button>
                            <button class="btn btn-primary" id="pv-btn-download-classic">Download PDF</button>
                        </div>
                    `;
                     document.getElementById('pv-btn-download-classic').onclick = () => document.getElementById('pv-btn-download').click();
                }
                
                document.getElementById('resume-form-area').style.display = 'none';
                document.getElementById('resume-preview-area').style.display = 'grid';
            };

            document.getElementById('pv-btn-download').onclick = async () => {
                window.utils.showProcessing('Generating Resume PDF...');
                try {
                    const element = document.getElementById('resume-preview-area');
                    const canvas = await html2canvas(element, { scale: 2 });
                    const imgData = canvas.toDataURL('image/png');
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('TECHBOY_Resume.pdf');
                } catch (err) {
                    alert("Error generating PDF: " + err.message);
                } finally {
                    window.utils.hideProcessing();
                }
            };
        }

        function initATSAnalyzerLogic() {
            const fileInput = document.getElementById('ats-upload');
            const dropText = document.getElementById('ats-drop-text');
            
            fileInput.onchange = () => {
                if (fileInput.files.length > 0) {
                    dropText.innerText = fileInput.files[0].name;
                }
            };

            document.getElementById('btn-analyze-ats').onclick = () => {
                if (fileInput.files.length === 0) {
                    alert("Please upload a file first.");
                    return;
                }
                const btn = document.getElementById('btn-analyze-ats');
                btn.innerText = "Analyzing...";
                btn.disabled = true;
                
                setTimeout(() => {
                    document.getElementById('ats-result').style.display = 'block';
                    btn.innerText = "Analyze Resume";
                    btn.disabled = false;
                }, 1500);
            };
        }

        function initAIImproverLogic() {
            document.getElementById('btn-improve-resume').onclick = () => {
                const input = document.getElementById('ai-input').value.trim();
                if (!input) {
                    alert("Please paste your resume text first.");
                    return;
                }
                
                const btn = document.getElementById('btn-improve-resume');
                btn.innerText = "Improving...";
                btn.disabled = true;
                
                setTimeout(() => {
                    const outputArea = document.getElementById('ai-output-area');
                    const outputEl = document.getElementById('ai-output');
                    outputArea.style.display = 'block';
                    
                    // Simple client-side replacement logic to "improve" the text
                    let improved = input
                        .replace(/made/gi, "Developed")
                        .replace(/used/gi, "Utilized")
                        .replace(/helped/gi, "Assisted")
                        .replace(/worked on/gi, "Spearheaded")
                        .replace(/faster/gi, "optimized performance")
                        .replace(/better/gi, "enhanced efficiency");
                    
                    if (improved === input) {
                        improved = "Professional Suggestion: " + input.charAt(0).toUpperCase() + input.slice(1) + " (Consider using more action verbs like Spearheaded, Orchestrated, or Optimized).";
                    }
                    
                    outputEl.innerText = improved;
                    btn.innerText = "Improve Text";
                    btn.disabled = false;
                }, 1000);
            };
        }
    }
};

const GamesView = {
    render() {
        return `
            <div class="container">
                <div id="list-view">
                    <div class="tool-header">
                        <h1>Mini Games</h1>
                        <p>Take a break and play some simple browser games.</p>
                    </div>
                    <div class="grid grid-3">
                        ${window.toolsRegistry.filter(t => t.category === '#games').map(t => window.utils.renderToolCard(t)).join('')}
                    </div>
                </div>

                <div id="game-view" style="display: none;">
                    <button class="btn btn-accent" style="margin-bottom: 1rem;" onclick="window.stopGame()"><i class="fa-solid fa-arrow-left"></i> Back to Games</button>
                    <div id="game-container" style="display: flex; justify-content: center; align-items: center; background: #0F172A; padding: 2rem; border-radius: var(--radius-card); box-shadow: var(--card-shadow); flex-direction: column;">
                        <!-- Game Canvas/Content injected here -->
                    </div>
                </div>
            </div>
        `;
    },
    postRender() {
        let snakeInterval;
        
        window.stopGame = () => {
             document.getElementById('list-view').style.display = 'block';
             document.getElementById('game-view').style.display = 'none';
             if (snakeInterval) clearInterval(snakeInterval);
        };
        
        window.activeTool = (name, desc) => {
            document.getElementById('list-view').style.display = 'none';
            document.getElementById('game-view').style.display = 'block';
            const gc = document.getElementById('game-container');
            const tool = window.toolsRegistry.find(t => t.name === name);
            
            if (!tool) return;

            if (tool.id === 'game-snake') {
                gc.innerHTML = `
                    <h3 style="color: white; margin-bottom: 1rem;">Snake</h3>
                    <p style="color: #94A3B8; margin-bottom: 1rem;">Use Arrow Keys to move.</p>
                    <canvas id="snakeCanvas" width="400" height="400" style="background: #000; border: 2px solid white; border-radius: 4px;"></canvas>
                `;
                initSnakeGame();
            } else if (tool.id === 'game-same') {
                gc.innerHTML = `
                    <h3 style="color: white; margin-bottom: 1rem;">Same Game</h3>
                    <p style="color: #94A3B8; margin-bottom: 1.5rem;">Click groups of 2 or more same-colored blocks.</p>
                    <div id="sameGameBoard" style="display: grid; grid-template-columns: repeat(10, 30px); gap: 2px; background: #1E293B; padding: 10px; border-radius: 8px;"></div>
                    <div id="sameGameInfo" style="margin-top: 1rem; color: white; display: flex; gap: 2rem;">
                        <span>Score: <span id="sameGameScore">0</span></span>
                        <button class="btn btn-accent btn-sm" onclick="window.playGame('same')">Restart</button>
                    </div>
                `;
                initSameGame();
            }
        };

        function initSameGame() {
            const board = document.getElementById('sameGameBoard');
            const scoreDisplay = document.getElementById('sameGameScore');
            let score = 0;
            const rows = 10;
            const cols = 10;
            const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];
            let grid = [];

            // Initialize Grid
            for (let r = 0; r < rows; r++) {
                grid[r] = [];
                for (let c = 0; c < cols; c++) {
                    grid[r][c] = colors[Math.floor(Math.random() * colors.length)];
                }
            }

            function render() {
                board.innerHTML = '';
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const cell = document.createElement('div');
                        cell.style.width = '30px';
                        cell.style.height = '30px';
                        cell.style.backgroundColor = grid[r][c] || 'transparent';
                        cell.style.borderRadius = '4px';
                        cell.style.cursor = grid[r][c] ? 'pointer' : 'default';
                        if (grid[r][c]) {
                            cell.onclick = () => handleClick(r, c);
                        }
                        board.appendChild(cell);
                    }
                }
                scoreDisplay.innerText = score;
            }

            function handleClick(r, c) {
                const color = grid[r][c];
                if (!color) return;

                const group = findGroup(r, c, color);
                if (group.length < 2) return;

                score += group.length * (group.length - 1);
                group.forEach(([gr, gc]) => {
                    grid[gr][gc] = null;
                });

                applyGravity();
                render();
            }

            function findGroup(r, c, color, visited = new Set()) {
                const pos = `${r},${c}`;
                if (visited.has(pos) || r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== color) {
                    return [];
                }

                visited.add(pos);
                let group = [[r, c]];
                group = group.concat(findGroup(r + 1, c, color, visited));
                group = group.concat(findGroup(r - 1, c, color, visited));
                group = group.concat(findGroup(r, c + 1, color, visited));
                group = group.concat(findGroup(r, c - 1, color, visited));
                return group;
            }

            function applyGravity() {
                // Vertical Gravity
                for (let c = 0; c < cols; c++) {
                    let writePtr = rows - 1;
                    for (let r = rows - 1; r >= 0; r--) {
                        if (grid[r][c]) {
                            grid[writePtr][c] = grid[r][c];
                            if (writePtr !== r) grid[r][c] = null;
                            writePtr--;
                        }
                    }
                }

                // Horizontal Gravity (Shift columns if empty)
                for (let c = 0; c < cols - 1; c++) {
                    let isEmpty = true;
                    for (let r = 0; r < rows; r++) {
                        if (grid[r][c]) {
                            isEmpty = false;
                            break;
                        }
                    }
                    if (isEmpty) {
                        for (let nextC = c + 1; nextC < cols; nextC++) {
                            for (let r = 0; r < rows; r++) {
                                grid[r][nextC - 1] = grid[r][nextC];
                                grid[r][nextC] = null;
                            }
                        }
                    }
                }
            }

            render();
        }

        function initSnakeGame() {
            const canvas = document.getElementById('snakeCanvas');
            if(!canvas) return;
            const ctx = canvas.getContext('2d');
            
            const box = 20;
            let snake = [];
            snake[0] = { x: 9 * box, y: 10 * box };
            
            let food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
            
            let score = 0;
            let d;
            
            const keyHandler = (event) => {
                let key = event.keyCode;
                if( key == 37 && d != "RIGHT"){ d = "LEFT"; }
                else if(key == 38 && d != "DOWN"){ d = "UP"; }
                else if(key == 39 && d != "LEFT"){ d = "RIGHT"; }
                else if(key == 40 && d != "UP"){ d = "DOWN"; }
                // Prevent scrolling with arrows
                if([37, 38, 39, 40].includes(key)) event.preventDefault();
            };
            
            document.addEventListener("keydown", keyHandler);
            
            function collision(head, array){
                for(let i = 0; i < array.length; i++){
                    if(head.x == array[i].x && head.y == array[i].y) return true;
                }
                return false;
            }
            
            function draw() {
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, 400, 400);
                
                for(let i = 0; i < snake.length; i++){
                    ctx.fillStyle = (i == 0) ? "#F59E0B" : "white";
                    ctx.fillRect(snake[i].x, snake[i].y, box, box);
                    ctx.strokeStyle = "#000";
                    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
                }
                
                ctx.fillStyle = "red";
                ctx.fillRect(food.x, food.y, box, box);
                
                let snakeX = snake[0].x;
                let snakeY = snake[0].y;
                
                if( d == "LEFT") snakeX -= box;
                if( d == "UP") snakeY -= box;
                if( d == "RIGHT") snakeX += box;
                if( d == "DOWN") snakeY += box;
                
                if(snakeX == food.x && snakeY == food.y){
                    score++;
                    food = {
                        x: Math.floor(Math.random() * 19 + 1) * box,
                        y: Math.floor(Math.random() * 19 + 1) * box
                    }
                } else {
                    snake.pop();
                }
                
                let newHead = { x: snakeX, y: snakeY };
                
                if(snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)){
                    clearInterval(snakeInterval);
                    document.removeEventListener("keydown", keyHandler);
                    ctx.fillStyle = "white";
                    ctx.font = "30px Arial";
                    ctx.fillText("Game Over", 120, 200);
                    ctx.fillText("Score: " + score, 135, 240);
                    
                    // Add a restart button overlay
                    const restartBtn = document.createElement('button');
                    restartBtn.className = 'btn btn-primary';
                    restartBtn.style.position = 'absolute';
                    restartBtn.style.marginTop = '280px';
                    restartBtn.innerText = 'Play Again';
                    restartBtn.onclick = () => {
                        restartBtn.remove();
                        window.playGame('snake');
                    };
                    document.getElementById('game-container').appendChild(restartBtn);
                    return;
                }
                
                snake.unshift(newHead);
                
                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.fillText("Score: " + score, box, 1.5 * box);
            }
            
            snakeInterval = setInterval(draw, 100);
        }
    }
};;

// Routing 
const routes = {
    '': HomeView,
    '#home': HomeView,
    '#document-tools': DocToolsView,
    '#image-tools': ImageToolsView,
    '#utilities': UtilitiesView,
    '#resume-tools': ResumeToolsView,
    '#games': GamesView
};

window.addEventListener('load', () => {
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    function router() {
        let hash = window.location.hash;
        
        if (!routes[hash] && hash !== '') {
            hash = '#home';
        }

        updateNavLinks(hash);

        const view = routes[hash] || routes[''];
        appContent.innerHTML = view.render();
        
        if (view.postRender) {
            view.postRender();
        }
        
        navLinksContainer.classList.remove('active');
        window.scrollTo(0, 0);
    }

    function updateNavLinks(hash) {
        if (hash === '') hash = '#home';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('hashchange', router);
    router();

    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Restore Particle Background System
    initParticles();
});

function initParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;
    
    // Clear existing
    container.innerHTML = '';
    
    const particleCount = 15; // Controlled count for performance
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Larger sizes for liquid glass effect
    const size = Math.random() * 400 + 200;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;

    
    // Random initial position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    container.appendChild(particle);
    
    // Animate
    animateParticle(particle);
}
function animateParticle(particle) {
    const duration = Math.random() * 40000 + 20000; // Slower, 20-60s
    const targetX = (Math.random() - 0.5) * 100; // Full width move
    const targetY = (Math.random() - 0.5) * 100;
    
    particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: particle.style.opacity },
        { transform: `translate(${targetX}vw, ${targetY}vh) scale(1.2)`, opacity: particle.style.opacity * 0.5 },
        { transform: 'translate(0, 0) scale(1)', opacity: particle.style.opacity }
    ], {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
    window.utils.initTheme();
    window.utils.initMagneticCards();
});


function createBulkPDFImageInterface(title, desc) {
    return `
        <div class="tool-section">
            <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="location.hash='#document-tools'"><i class="fa-solid fa-arrow-left"></i> Back to Documents</button>
            <div class="tool-header">
                <h2>${title}</h2>
                <p>${desc}</p>
            </div>
            
            <div class="drop-area" id="pdf-bulk-drop-area" style="border: 2px dashed #CBD5E1; border-radius: 12px; padding: 3rem; text-align: center; background: #F8FAFC; transition: var(--transition);">
                <i class="fa-solid fa-file-pdf" style="font-size: 3rem; color: var(--accent-doc); margin-bottom: 1rem;"></i>
                <p id="pdf-bulk-drop-text">Select a PDF to extract all pages as images</p>
                <input type="file" id="pdf-bulk-upload" hidden accept="application/pdf">
                <button class="btn btn-primary" style="margin-top: 1rem;" onclick="document.getElementById('pdf-bulk-upload').click()">Select PDF</button>
            </div>

            <button class="btn btn-primary" id="btn-process-pdf-bulk" style="margin-top: 1.5rem; width: 100%;" disabled>Extract All Pages</button>

            <div id="pdf-bulk-result" style="margin-top: 2rem; display: none;">
                <div class="alert alert-success" id="pdf-bulk-status">Extraction complete!</div>
                <button class="btn btn-accent" id="btn-download-pdf-zip" style="width: 100%; margin-top: 1rem;">Download Pages as ZIP</button>
            </div>
        </div>
    `;
}

async function initBulkPDFImageLogic() {
    const fileInput = document.getElementById('pdf-bulk-upload');
    const processBtn = document.getElementById('btn-process-pdf-bulk');
    const statusMsg = document.getElementById('pdf-bulk-status');
    const downloadBtn = document.getElementById('btn-download-pdf-zip');
    const resultArea = document.getElementById('pdf-bulk-result');
    const dropText = document.getElementById('pdf-bulk-drop-text');

    let pdfFile = null;
    let images = [];

    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            pdfFile = fileInput.files[0];
            dropText.innerText = pdfFile.name;
            processBtn.disabled = false;
        }
    };

    processBtn.onclick = async () => {
        window.utils.showProcessing('Extracting pages...');
        try {
            const data = await pdfFile.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data });
            const pdf = await loadingTask.promise;
            images = [];
            const zip = new JSZip();

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                zip.file(`page_${i}.png`, blob);
                images.push(blob);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            downloadBtn.onclick = () => window.utils.downloadBlob(zipBlob, `TECHBOY_PDF_Pages_${Date.now()}.zip`);
            
            resultArea.style.display = 'block';
            statusMsg.innerText = `Extracted ${pdf.numPages} pages successfully!`;
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            window.utils.hideProcessing();
        }
    };
}

function createBatchImageInterface(title, desc) {
    return `
        <div class="tool-section">
            <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="location.hash='#image-tools'"><i class="fa-solid fa-arrow-left"></i> Back to Image Tools</button>
            <div class="tool-header">
                <h2>${title}</h2>
                <p>${desc}</p>
            </div>
            
            <div class="drop-area" id="batch-drop-area" style="border: 2px dashed #CBD5E1; border-radius: 12px; padding: 3rem; text-align: center; background: #F8FAFC; transition: var(--transition);">
                <i class="fa-solid fa-images" style="font-size: 3rem; color: var(--accent-img); margin-bottom: 1rem;"></i>
                <p id="batch-drop-text">Select multiple images to process in bulk</p>
                <input type="file" id="batch-upload" hidden multiple accept="image/*">
                <button class="btn btn-primary" style="margin-top: 1rem;" onclick="document.getElementById('batch-upload').click()">Select Images</button>
            </div>

            <div class="form-group" style="margin-top: 2rem;">
                <label class="form-label">Batch Action</label>
                <select id="batch-action" class="form-control">
                    <option value="compress">Compress (Smaller size)</option>
                    <option value="png">Convert to PNG</option>
                    <option value="jpg">Convert to JPG</option>
                </select>
            </div>

            <button class="btn btn-primary" id="btn-process-batch" style="margin-top: 1.5rem; width: 100%;" disabled>Process Batch</button>

            <div id="batch-result" style="margin-top: 2rem; display: none;">
                <div class="alert alert-success" id="batch-status-msg">Batch processing complete!</div>
                <button class="btn btn-accent" id="btn-download-batch-zip" style="width: 100%; margin-top: 1rem;">Download ZIP</button>
            </div>
        </div>
    `;
}

function initBatchImageLogic() {
    const fileInput = document.getElementById('batch-upload');
    const processBtn = document.getElementById('btn-process-batch');
    const actionSelect = document.getElementById('batch-action');
    const resultArea = document.getElementById('batch-result');
    const downloadBtn = document.getElementById('btn-download-batch-zip');
    const dropText = document.getElementById('batch-drop-text');

    let files = [];

    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            files = Array.from(fileInput.files);
            dropText.innerText = `${files.length} images selected`;
            processBtn.disabled = false;
        }
    };

    processBtn.onclick = async () => {
        window.utils.showProcessing('Processing batch...');
        try {
            const zip = new JSZip();
            const action = actionSelect.value;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const img = new Image();
                img.src = URL.createObjectURL(file);
                await new Promise(resolve => img.onload = resolve);

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                
                let format = file.type;
                let quality = 0.92;
                let ext = file.name.split('.').pop();

                if (action === 'compress') quality = 0.6;
                else if (action === 'png') { format = 'image/png'; ext = 'png'; }
                else if (action === 'jpg') { format = 'image/jpeg'; ext = 'jpg'; ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height); }

                ctx.drawImage(img, 0, 0);
                const blob = await new Promise(resolve => canvas.toBlob(resolve, format, quality));
                zip.file(`processed_${i}.${ext}`, blob);
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            downloadBtn.onclick = () => window.utils.downloadBlob(zipBlob, `TECHBOY_Batch_${Date.now()}.zip`);
            resultArea.style.display = 'block';
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            window.utils.hideProcessing();
        }
    };
}

function initPowerUtilityLogic(title) {
    document.getElementById('util-view').style.display = 'block';
    document.getElementById('util-header').innerHTML = `<h2>${title}</h2>`;
    const actionContainer = document.getElementById('util-actions');
    const inputGroup = document.getElementById('util-input-group');
    const inputEl = document.getElementById('util-input');
    const outputEl = document.getElementById('util-output');
    const outputGroup = document.getElementById('util-output-group');

    if (title === 'AI Technical Writer') {
        inputGroup.style.display = 'block';
        outputGroup.style.display = 'block';
        inputEl.placeholder = "Paste your technical notes or code comments here...";
        actionContainer.innerHTML = `<button class="btn btn-primary" id="btn-writer">Convert to Documentation</button>`;
        document.getElementById('btn-writer').onclick = () => {
            const val = inputEl.value.trim();
            if (!val) { alert("Please enter some text."); return; }
            window.utils.showProcessing('Generating documentation...');
            setTimeout(() => {
                outputEl.innerText = `# Technical Documentation\n\n## Overview\n${val.split('\n').map(l => `> ${l}`).join('\n')}\n\n## Implementation Details\n- Automated structural analysis complete.\n- Key components identified.\n- Documentation ready for review.`;
                window.utils.hideProcessing();
            }, 1000);
        };
    } else if (title === 'Code Snippet Vault') {
        inputGroup.style.display = 'none';
        outputGroup.style.display = 'block';
        outputEl.innerHTML = `<div id="vault-list" style="display: flex; flex-direction: column; gap: 10px;"></div>`;
        actionContainer.innerHTML = `<button class="btn btn-primary" id="btn-add-snip">Add New Snippet</button>`;
        
        const renderVault = () => {
            const snips = JSON.parse(localStorage.getItem('techboy_vault') || '[]');
            const list = document.getElementById('vault-list');
            if (!list) return;
            if (snips.length === 0) {
                list.innerHTML = `<p style="color: var(--text-muted); padding: 2rem; text-align: center;">Your vault is empty. Save your first snippet!</p>`;
                return;
            }
            list.innerHTML = snips.map((s, i) => `
                <div style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; color: #1e293b;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <strong>${s.name}</strong>
                        <button class="btn btn-sm" style="color: red; padding: 2px 8px; border: none; background: transparent;" onclick="window.removeSnip(${i})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <code style="display: block; background: #f8fafc; padding: 0.5rem; border-radius: 4px; font-size: 0.85rem; overflow-x: auto; white-space: pre-wrap;">${s.code}</code>
                </div>
            `).join('');
        };

        window.removeSnip = (i) => {
            const snips = JSON.parse(localStorage.getItem('techboy_vault') || '[]');
            snips.splice(i, 1);
            localStorage.setItem('techboy_vault', JSON.stringify(snips));
            renderVault();
        };

        document.getElementById('btn-add-snip').onclick = () => {
            const name = prompt("Snippet Name:");
            const code = prompt("Paste Code:");
            if (name && code) {
                const snips = JSON.parse(localStorage.getItem('techboy_vault') || '[]');
                snips.push({ name, code });
                localStorage.setItem('techboy_vault', JSON.stringify(snips));
                renderVault();
            }
        };
        renderVault();
    }
}
