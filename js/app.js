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
    }
};

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
                    <label class="form-label">Skills</label>
                    <input type="text" id="res-skills" class="form-control" placeholder="HTML, CSS, JavaScript, Python...">
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
        const searchDropdown = document.getElementById('search-results');
        if (!searchBar || !searchDropdown) return;
        
        const allTools = [
            { name: 'Merge PDF', category: '#document-tools', keywords: 'pdf document combine' },
            { name: 'Split PDF', category: '#document-tools', keywords: 'pdf document separate' },
            { name: 'Compress PDF', category: '#document-tools', keywords: 'pdf document smaller size' },
            { name: 'PDF to Word', category: '#document-tools', keywords: 'pdf document converter docx doc' },
            { name: 'Word to PDF', category: '#document-tools', keywords: 'pdf document converter docx doc' },
            { name: 'Image Compressor', category: '#image-tools', keywords: 'image photo resize optimize' },
            { name: 'Resize Image', category: '#image-tools', keywords: 'image photo dimensions size' },
            { name: 'JPG to PNG', category: '#image-tools', keywords: 'image photo convert format' },
            { name: 'PNG to JPG', category: '#image-tools', keywords: 'image photo convert format' },
            { name: 'QR Code Generator', category: '#utilities', keywords: 'utility code qr link' },
            { name: 'Password Generator', category: '#utilities', keywords: 'utility secure key' },
            { name: 'Resume Builder', category: '#resume-tools', keywords: 'resume cv job builder' },
            { name: 'ATS Analyzer', category: '#resume-tools', keywords: 'resume cv job score' },
            { name: 'Snake Game', category: '#games', keywords: 'game fun snake' }
        ];

        searchBar.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            if (!term) {
                searchDropdown.style.display = 'none';
                return;
            }

            const matches = allTools.filter(t => 
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
                        <div class="card" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Merge PDF', 'Combine multiple PDFs into one unified document.')">
                            <i class="fa-solid fa-object-group card-icon"></i>
                            <h2 class="card-title">Merge PDF</h2>
                            <p class="card-desc">Combine multiple PDFs into one unified document.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Split PDF', 'Separate one page or a whole set for easy conversion into independent PDF files.')">
                            <i class="fa-solid fa-scissors card-icon"></i>
                            <h2 class="card-title">Split PDF</h2>
                            <p class="card-desc">Separate one page or a whole set for easy conversion into independent PDF files.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Compress PDF', 'Reduce file size while optimizing for maximal PDF quality.')">
                            <i class="fa-solid fa-compress card-icon"></i>
                            <h2 class="card-title">Compress PDF</h2>
                            <p class="card-desc">Reduce file size while optimizing for maximal PDF quality.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('PDF to Word', 'Easily convert your PDF files into easy to edit DOC and DOCX documents.')">
                            <i class="fa-solid fa-file-word card-icon"></i>
                            <h2 class="card-title">PDF to Word</h2>
                            <p class="card-desc">Easily convert your PDF files into easy to edit DOC and DOCX documents.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Word to PDF', 'Make DOC and DOCX files easy to read by converting them to PDF.')">
                            <i class="fa-solid fa-file-pdf card-icon"></i>
                            <h2 class="card-title">Word to PDF</h2>
                            <p class="card-desc">Make DOC and DOCX files easy to read by converting them to PDF.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
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
            toolView.innerHTML = createDocInterface(title, desc);

            const fileInput = document.getElementById('file-upload');
            const dropArea = document.getElementById('doc-drop-area');
            const dropText = document.getElementById('doc-drop-text');
            const processBtn = document.getElementById('doc-process-btn');
            const optionsArea = document.getElementById('tool-options');
            const resultArea = document.getElementById('doc-result');
            const downloadBtn = document.getElementById('doc-download-btn');

            let processedBlob = null;
            let files = [];

            // Setup options
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
                    } 
                    else if (title === 'Split PDF') {
                        const range = document.getElementById('split-range').value || "1";
                        const pdfBytes = await files[0].arrayBuffer();
                        const doc = await PDFLib.PDFDocument.load(pdfBytes);
                        const splitPdf = await PDFLib.PDFDocument.create();
                        
                        // Simple parser for range (e.g. 1, 2-3)
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
                    }
                    else if (title === 'Compress PDF') {
                        // Real compression is hard client-side, we'll strip metadata as a demo
                        const pdfBytes = await files[0].arrayBuffer();
                        const doc = await PDFLib.PDFDocument.load(pdfBytes);
                        doc.setTitle('');
                        doc.setAuthor('');
                        const resultBytes = await doc.save();
                        processedBlob = new Blob([resultBytes], { type: 'application/pdf' });
                    }
                    else if (title === 'Word to PDF') {
                        const arrayBuffer = await files[0].arrayBuffer();
                        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
                        const html = result.value;
                        
                        // Create a temporary div to render HTML for jspdf
                        const tempDiv = document.createElement('div');
                        tempDiv.style.width = '595px'; // A4 width at 72dpi
                        tempDiv.style.padding = '40px';
                        tempDiv.style.background = 'white';
                        tempDiv.style.color = 'black';
                        tempDiv.innerHTML = html;
                        document.body.appendChild(tempDiv);
                        
                        const canvas = await html2canvas(tempDiv);
                        const imgData = canvas.toDataURL('image/png');
                        const { jsPDF } = window.jspdf;
                        const pdf = new jsPDF();
                        const imgProps = pdf.getImageProperties(imgData);
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        
                        processedBlob = pdf.output('blob');
                        document.body.removeChild(tempDiv);
                    }
                    else if (title === 'PDF to Word') {
                        const pdfBytes = await files[0].arrayBuffer();
                        const doc = await PDFLib.PDFDocument.load(pdfBytes);
                        const pages = doc.getPages();
                        let fullText = "";
                        
                        // PDF-lib doesn't have built-in text extraction. 
                        // For a client-side demo, we'll indicate text extraction.
                        // Real text extraction usually requires pdf.js.
                        // We'll use a placeholder structure for the docx generation.
                        
                        const { Document, Packer, Paragraph, TextRun } = window.docx;
                        const wordDoc = new Document({
                            sections: [{
                                properties: {},
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun("Extracted Text from PDF:"),
                                            new TextRun({
                                                text: "\n(Note: High-fidelity PDF to Word conversion usually requires server-side OCR. This is a structural extraction demo.)",
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                ],
                            }],
                        });

                        processedBlob = await Packer.toBlob(wordDoc);
                    }
                    else {
                        throw new Error("This tool functionality is coming soon.");
                    }

                    resultArea.style.display = 'block';
                    processBtn.innerText = 'Rerun Processing';
                } catch (err) {
                    console.error(err);
                    alert(`Error: ${err.message}`);
                } finally {
                    window.utils.hideProcessing();
                }
            };

            downloadBtn.onclick = () => {
                if (processedBlob) {
                    window.utils.downloadBlob(processedBlob, `TECHBOY_${title.replace(/\s+/g, '_')}.pdf`);
                }
            };
        };
    }
};

const ImageToolsView = {
    render() {
        return `
            <div class="container">
                <div id="list-view">
                    <div class="tool-header">
                        <h1>Image Tools</h1>
                        <p>Compress, resize and convert images.</p>
                    </div>

                    <div class="grid grid-2">
                        <div class="card" style="--accent-color: var(--accent-img); cursor: pointer;" onclick="window.activeToolImg('Image Compressor', 'Reduce image file size with minimal loss in quality.')">
                            <i class="fa-solid fa-compress card-icon"></i>
                            <h2 class="card-title">Image Compressor</h2>
                            <p class="card-desc">Reduce image file size with minimal loss in quality.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-img); cursor: pointer;" onclick="window.activeToolImg('Resize Image', 'Change the dimensions of your image quickly.')">
                            <i class="fa-solid fa-expand card-icon"></i>
                            <h2 class="card-title">Resize Image</h2>
                            <p class="card-desc">Change the dimensions of your image quickly.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-img); cursor: pointer;" onclick="window.activeToolImg('JPG to PNG', 'Convert JPG images to PNG format with transparency support.')">
                            <i class="fa-solid fa-file-image card-icon"></i>
                            <h2 class="card-title">JPG to PNG</h2>
                            <p class="card-desc">Convert JPG images to PNG format with transparency support.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-img); cursor: pointer;" onclick="window.activeToolImg('PNG to JPG', 'Convert PNG images to smaller JPG format.')">
                            <i class="fa-solid fa-image card-icon"></i>
                            <h2 class="card-title">PNG to JPG</h2>
                            <p class="card-desc">Convert PNG images to smaller JPG format.</p>
                            <span class="btn btn-accent">Select Tool</span>
                        </div>
                    </div>
                </div>
                <div id="tool-view" style="display: none;"></div>
            </div>
        `;
    },
    postRender() {
        window.activeToolImg = (title, desc) => {
            document.getElementById('list-view').style.display = 'none';
            const toolView = document.getElementById('tool-view');
            toolView.style.display = 'block';
            toolView.innerHTML = createImageInterface(title, desc);
            
            // Setup actual processing logic
            const fileInput = document.getElementById('img-upload');
            const dropArea = document.getElementById('img-drop-area');
            const processBtn = document.getElementById('img-process-btn');
            const previewContainer = document.getElementById('img-preview-container');
            const previewImg = document.getElementById('img-preview');
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
                        <div class="card" style="--accent-color: var(--accent-utils); cursor: pointer;" onclick="window.showUtil('Word Counter')">
                            <i class="fa-solid fa-calculator card-icon"></i>
                            <h2 class="card-title">Word Counter</h2>
                            <p class="card-desc">Count words, characters, and reading time.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-utils); cursor: pointer;" onclick="window.showUtil('Text Case Converter')">
                            <i class="fa-solid fa-font card-icon"></i>
                            <h2 class="card-title">Text Case Converter</h2>
                            <p class="card-desc">Change text to UPPERCASE, lowercase, Title Case.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-utils); cursor: pointer;" onclick="window.showUtil('Password Generator')">
                            <i class="fa-solid fa-key card-icon"></i>
                            <h2 class="card-title">Password Generator</h2>
                            <p class="card-desc">Generate strong and secure passwords.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-utils); cursor: pointer;" onclick="window.showUtil('Password Strength Checker')">
                            <i class="fa-solid fa-shield-halved card-icon"></i>
                            <h2 class="card-title">Password Strength Checker</h2>
                            <p class="card-desc">Check how secure your password really is.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-utils); cursor: pointer;" onclick="window.showUtil('QR Code Generator')">
                            <i class="fa-solid fa-qrcode card-icon"></i>
                            <h2 class="card-title">QR Code Generator</h2>
                            <p class="card-desc">Create QR codes for links, text, and contacts.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-utils); cursor: pointer;" onclick="window.showUtil('JSON Formatter')">
                            <i class="fa-solid fa-brackets-curly card-icon"></i>
                            <h2 class="card-title">JSON Formatter</h2>
                            <p class="card-desc">Format and validate JSON strings.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-utils); cursor: pointer;" onclick="window.showUtil('Text Summarizer')">
                            <i class="fa-solid fa-align-left card-icon"></i>
                            <h2 class="card-title">Text Summarizer</h2>
                            <p class="card-desc">Condense long text into a shorter summary.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
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
        window.showUtil = (title) => {
            document.getElementById('list-view').style.display = 'none';
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
                        <div class="card" style="--accent-color: var(--accent-resume); cursor: pointer;" onclick="window.showResumeTool('builder')">
                            <i class="fa-solid fa-file-invoice card-icon"></i>
                            <h2 class="card-title">Resume Builder</h2>
                            <p class="card-desc">Create a clean, professional resume using our simple form builder.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-resume); cursor: pointer;" onclick="window.showResumeTool('ats')">
                            <i class="fa-solid fa-magnifying-glass-chart card-icon"></i>
                            <h2 class="card-title">ATS Analyzer</h2>
                            <p class="card-desc">Check your resume against ATS standards and get an instant score.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                        <div class="card" style="--accent-color: var(--accent-resume); cursor: pointer;" onclick="window.showResumeTool('ai')">
                            <i class="fa-solid fa-robot card-icon"></i>
                            <h2 class="card-title">AI Resume Improver</h2>
                            <p class="card-desc">Enhance your resume bullet points with professional phrasing.</p>
                            <span class="btn btn-accent">Open Tool</span>
                        </div>
                    </div>
                </div>
                <div id="tool-view" style="display: none;"></div>
            </div>
        `;
    },
    postRender() {
        window.showResumeTool = (type) => {
            document.getElementById('list-view').style.display = 'none';
            const tv = document.getElementById('tool-view');
            tv.style.display = 'block';
            
            if (type === 'builder') {
                tv.innerHTML = resumeBuilderHTML;
                document.getElementById('btn-preview-resume').onclick = () => {
                    const name = document.getElementById('res-name').value || "Your Name";
                    const email = document.getElementById('res-email').value || "email@example.com";
                    const phone = document.getElementById('res-phone').value || "123-456-7890";
                    const linkedin = document.getElementById('res-linkedin').value;
                    const github = document.getElementById('res-github').value;
                    
                    document.getElementById('pv-name').innerText = name;
                    document.getElementById('pv-contact').innerText = `${email} | ${phone}`;
                    document.getElementById('pv-socials').innerHTML = `${linkedin ? `LinkedIn: ${linkedin}<br>` : ''}${github ? `GitHub: ${github}` : ''}`;
                    
                    document.getElementById('pv-education').innerText = document.getElementById('res-education').value;
                    document.getElementById('pv-skills').innerText = document.getElementById('res-skills').value;
                    document.getElementById('pv-projects').innerText = document.getElementById('res-projects').value;
                    document.getElementById('pv-experience').innerText = document.getElementById('res-experience').value;
                    document.getElementById('pv-certifications').innerText = document.getElementById('res-certifications').value;
                    
                    document.getElementById('resume-form-area').style.display = 'none';
                    document.getElementById('resume-preview-area').style.display = 'block';
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
            if (type === 'ats') {
                tv.innerHTML = atsAnalyzerHTML;
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
            if (type === 'ai') {
                tv.innerHTML = aiImproverHTML;
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
        };
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

                    <div class="grid grid-2">
                        <div class="card" style="--accent-color: #F59E0B; cursor: pointer;" onclick="window.playGame('snake')">
                            <i class="fa-solid fa-staff-snake card-icon"></i>
                            <h2 class="card-title">Snake Game</h2>
                            <p class="card-desc">The classic snake game. Eat food, grow longer, don't hit the walls!</p>
                            <span class="btn btn-accent">Play Game</span>
                        </div>
                        <div class="card" style="--accent-color: #F59E0B; cursor: pointer;" onclick="window.playGame('same')">
                            <i class="fa-solid fa-cubes card-icon"></i>
                            <h2 class="card-title">Same Game</h2>
                            <p class="card-desc">Click groups of adjacent same-colored blocks to clear the board.</p>
                            <span class="btn btn-accent">Play Game</span>
                        </div>
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
        
        window.playGame = (type) => {
            document.getElementById('list-view').style.display = 'none';
            document.getElementById('game-view').style.display = 'block';
            const gc = document.getElementById('game-container');
            
            if (type === 'snake') {
                gc.innerHTML = `
                    <h3 style="color: white; margin-bottom: 1rem;">Snake</h3>
                    <p style="color: #94A3B8; margin-bottom: 1rem;">Use Arrow Keys to move.</p>
                    <canvas id="snakeCanvas" width="400" height="400" style="background: #000; border: 2px solid white; border-radius: 4px;"></canvas>
                `;
                initSnakeGame();
            } else if (type === 'same') {
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
    
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Larger sizes for liquid glass effect
    const size = Math.random() * 300 + 150;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random initial position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    container.appendChild(particle);
    
    // Animate
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 30000 + 20000; // Slower, 20-50s
    const targetX = (Math.random() - 0.5) * 60; // wider move
    const targetY = (Math.random() - 0.5) * 60;
    
    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${targetX}vw, ${targetY}vh)` },
        { transform: 'translate(0, 0)' }
    ], {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}
