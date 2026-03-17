export default {
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
            document.getElementById('util-header').innerHTML = \`<h2>\${title}</h2>\`;
            
            const actionContainer = document.getElementById('util-actions');
            const inputEl = document.getElementById('util-input');
            const outputEl = document.getElementById('util-output');
            
            // Clear previous state
            inputEl.value = '';
            outputEl.textContent = '';
            actionContainer.innerHTML = '';
            
            if (title === 'Word Counter') {
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Count</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    const text = inputEl.value;
                    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
                    const chars = text.length;
                    outputEl.textContent = \`Words: \${words}\\nCharacters: \${chars}\`;
                });
            } else if (title === 'Text Case Converter') {
                actionContainer.innerHTML = \`
                    <button class="btn btn-accent" id="btn-upper">UPPERCASE</button>
                    <button class="btn btn-accent" id="btn-lower">lowercase</button>
                \`;
                document.getElementById('btn-upper').addEventListener('click', () => outputEl.textContent = inputEl.value.toUpperCase());
                document.getElementById('btn-lower').addEventListener('click', () => outputEl.textContent = inputEl.value.toLowerCase());
            } else if (title === 'Password Generator') {
                inputEl.parentElement.style.display = 'none';
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Generate</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
                    let password = "";
                    for (let i = 0; i < 16; i++) {
                        password += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    outputEl.textContent = password;
                });
            } else {
                actionContainer.innerHTML = '<button class="btn btn-accent" id="btn-action">Process</button>';
                document.getElementById('btn-action').addEventListener('click', () => {
                    outputEl.textContent = "This is a frontend demo. Real processing happens here.";
                });
            }
        };
    }
};
