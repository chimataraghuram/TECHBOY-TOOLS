function createImageInterface(title, desc) {
    return `
        <div class="tool-section">
            <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back to Tools</button>
            <div class="tool-header">
                <h2>${title}</h2>
                <p>${desc}</p>
            </div>
            
            <div class="file-drop-area" onclick="document.getElementById('file-upload').click()">
                <i class="fa-solid fa-cloud-arrow-up file-drop-icon"></i>
                <div class="file-drop-text">Choose image or drag & drop it here</div>
                <div class="file-drop-hint">JPG, PNG, WEBP (Max 20MB)</div>
                <input type="file" id="file-upload" accept="image/*">
            </div>

            <div style="text-align: center;">
                <button class="btn btn-accent" onclick="alert('Processing image... This is a client-side demo!')">${title}</button>
            </div>
        </div>
    `;
}

export default {
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

                <div id="tool-view" style="display: none;">
                    <!-- Tool Interface Injected Here -->
                </div>
            </div>
        `;
    },
    postRender() {
        window.activeToolImg = (title, desc) => {
            document.getElementById('list-view').style.display = 'none';
            const toolView = document.getElementById('tool-view');
            toolView.style.display = 'block';
            toolView.innerHTML = createImageInterface(title, desc);
        };
    }
};
