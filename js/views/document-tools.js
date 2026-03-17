function createToolInterface(title, desc) {
    return `
        <div class="tool-section animate-in">
            <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back to Tools</button>
            <div class="tool-header">
                <h2>${title}</h2>
                <p>${desc}</p>
            </div>
            
            <div class="file-drop-area" onclick="document.getElementById('file-upload').click()">
                <i class="fa-solid fa-cloud-arrow-up file-drop-icon"></i>
                <div class="file-drop-text">Choose files or drag & drop them here</div>
                <div class="file-drop-hint">PDF files only (Max 100MB)</div>
                <input type="file" id="file-upload" multiple accept=".pdf">
            </div>

            <div style="text-align: center;">
                <button class="btn btn-accent" onclick="alert('Processing file... This is a client-side demo!')">${title}</button>
            </div>
        </div>
    `;
}

export default {
    render() {
        return `
            <div class="container animate-in">
                <div id="list-view">
                    <div class="tool-header" style="padding-top: 4rem;">
                        <h1>Document Tools</h1>
                        <p>Convert, merge and compress PDF files.</p>
                    </div>

                    <div class="grid grid-3">
                        <div class="card animate-in" data-delay="1" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Merge PDF', 'Combine multiple PDFs into one unified document.')">
                            <i class="fa-solid fa-object-group card-icon"></i>
                            <h3>Merge PDF</h3>
                            <p>Combine multiple PDFs into one unified document.</p>
                            <span class="btn btn-accent btn-sm">Select Tool</span>
                        </div>

                        <div class="card animate-in" data-delay="2" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Split PDF', 'Separate one page or a whole set for easy conversion into independent PDF files.')">
                            <i class="fa-solid fa-scissors card-icon"></i>
                            <h3>Split PDF</h3>
                            <p>Separate one page or a whole set for easy conversion into independent PDF files.</p>
                            <span class="btn btn-accent btn-sm">Select Tool</span>
                        </div>

                        <div class="card animate-in" data-delay="3" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Compress PDF', 'Reduce file size while optimizing for maximal PDF quality.')">
                            <i class="fa-solid fa-compress card-icon"></i>
                            <h3>Compress PDF</h3>
                            <p>Reduce file size while optimizing for maximal PDF quality.</p>
                            <span class="btn btn-accent btn-sm">Select Tool</span>
                        </div>

                        <div class="card animate-in" data-delay="4" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('PDF to Word', 'Easily convert your PDF files into easy to edit DOC and DOCX documents.')">
                            <i class="fa-solid fa-file-word card-icon"></i>
                            <h3>PDF to Word</h3>
                            <p>Easily convert your PDF files into easy to edit DOC and DOCX documents.</p>
                            <span class="btn btn-accent btn-sm">Select Tool</span>
                        </div>

                        <div class="card animate-in" data-delay="5" style="--accent-color: var(--accent-doc); cursor: pointer;" onclick="window.activeTool('Word to PDF', 'Make DOC and DOCX files easy to read by converting them to PDF.')">
                            <i class="fa-solid fa-file-pdf card-icon"></i>
                            <h3>Word to PDF</h3>
                            <p>Make DOC and DOCX files easy to read by converting them to PDF.</p>
                            <span class="btn btn-accent btn-sm">Select Tool</span>
                        </div>
                    </div>
                </div>

                <div id="tool-view" style="display: none;">
                    <!-- Tool Interface Injected Here -->
                </div>
            </div>
        `;
    },
    postRender() {
        window.activeTool = (title, desc) => {
            document.getElementById('list-view').style.display = 'none';
            const toolView = document.getElementById('tool-view');
            toolView.style.display = 'block';
            toolView.innerHTML = createToolInterface(title, desc);
        };
    }
};
