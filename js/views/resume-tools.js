const resumeBuilderHTML = `
    <div class="tool-section">
        <button class="btn btn-accent" style="margin-bottom: 2rem;" onclick="document.getElementById('tool-view').style.display='none'; document.getElementById('list-view').style.display='block';"><i class="fa-solid fa-arrow-left"></i> Back</button>
        <div class="tool-header">
            <h2>Resume Builder</h2>
            <p>Fill out the form below to generate your professional resume.</p>
        </div>
        <div class="grid grid-2">
            <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" placeholder="John Doe">
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="john@example.com">
            </div>
            <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control" placeholder="+1 234 567 8900">
            </div>
            <div class="form-group">
                <label class="form-label">LinkedIn</label>
                <input type="url" class="form-control" placeholder="linkedin.com/in/johndoe">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Summary / Objective</label>
                <textarea class="form-control" placeholder="A brief summary of your professional background..."></textarea>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Experience</label>
                <textarea class="form-control" placeholder="Company Name | Job Title | Dates..."></textarea>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Education</label>
                <textarea class="form-control" placeholder="University Name | Degree | Dates..."></textarea>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">Skills</label>
                <input type="text" class="form-control" placeholder="HTML, CSS, JavaScript, Python...">
            </div>
        </div>
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-accent" onclick="alert('Resume generation complete! Downloading PDF...')">Generate PDF</button>
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
        <div class="file-drop-area" onclick="document.getElementById('ats-upload').click()">
            <i class="fa-solid fa-cloud-arrow-up file-drop-icon"></i>
            <div class="file-drop-text">Upload Resume (PDF or DOCX)</div>
            <input type="file" id="ats-upload" accept=".pdf,.docx">
        </div>
        <div style="text-align: center; margin-bottom: 2rem;">
            <button class="btn btn-accent" onclick="document.getElementById('ats-result').style.display='block'">Analyze Resume</button>
        </div>
        
        <div id="ats-result" style="display: none; background: #F8FAFC; padding: 2rem; border-radius: var(--radius-card); border: 1px solid #E2E8F0;">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="font-size: 2rem; color: #059669;">Score: 82/100</h3>
                <p>Great! But there's room for improvement.</p>
            </div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem;">
                <li><i class="fa-solid fa-check" style="color: #059669;"></i> <strong>ATS Compatibility:</strong> Machine readable.</li>
                <li><i class="fa-solid fa-triangle-exclamation" style="color: #D97706;"></i> <strong>Keyword Match:</strong> Missing some common industry keywords.</li>
                <li><i class="fa-solid fa-check" style="color: #059669;"></i> <strong>Formatting Quality:</strong> Excellent styling and margins.</li>
                <li><i class="fa-solid fa-check" style="color: #059669;"></i> <strong>Content Strength:</strong> Good use of action verbs.</li>
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
            <button class="btn btn-accent" onclick="document.getElementById('ai-output-area').style.display='block'; document.getElementById('ai-output').innerText='Improved: Optimized web application performance by compressing image assets, resulting in a 40% reduction in page load times.'">Improve Text</button>
        </div>
        
        <div id="ai-output-area" class="form-group" style="display: none;">
            <label class="form-label">AI Suggestion</label>
            <div class="form-control" id="ai-output" style="min-height: 100px; background: #EEF2FF; border-color: #C7D2FE;"></div>
        </div>
    </div>
`;


export default {
    render() {
        return `
            <div class="container animate-in">
                <div id="list-view">
                    <div class="tool-header" style="padding-top: 4rem;">
                        <h1>Resume Tools</h1>
                        <p>Build, analyze and improve your resume.</p>
                    </div>

                    <div class="grid grid-3">
                        <div class="card animate-in" data-delay="1" style="--accent-color: var(--accent-resume); cursor: pointer;" onclick="window.showResumeTool('builder')">
                            <i class="fa-solid fa-file-invoice card-icon"></i>
                            <h3>Resume Builder</h3>
                            <p>Create a clean, professional resume using our simple form builder.</p>
                            <span class="btn btn-accent btn-sm">Open Tool</span>
                        </div>

                        <div class="card animate-in" data-delay="2" style="--accent-color: var(--accent-resume); cursor: pointer;" onclick="window.showResumeTool('ats')">
                            <i class="fa-solid fa-magnifying-glass-chart card-icon"></i>
                            <h3>ATS Analyzer</h3>
                            <p>Check your resume against ATS standards and get an instant score.</p>
                            <span class="btn btn-accent btn-sm">Open Tool</span>
                        </div>

                        <div class="card animate-in" data-delay="3" style="--accent-color: var(--accent-resume); cursor: pointer;" onclick="window.showResumeTool('ai')">
                            <i class="fa-solid fa-robot card-icon"></i>
                            <h3>AI Resume Improver</h3>
                            <p>Enhance your resume bullet points with professional phrasing.</p>
                            <span class="btn btn-accent btn-sm">Open Tool</span>
                        </div>
                    </div>
                </div>

                <div id="tool-view" style="display: none;">
                    <!-- Tool injected here -->
                </div>
            </div>
        `;
    },
    postRender() {
        window.showResumeTool = (type) => {
            document.getElementById('list-view').style.display = 'none';
            const tv = document.getElementById('tool-view');
            tv.style.display = 'block';
            
            if (type === 'builder') tv.innerHTML = resumeBuilderHTML;
            if (type === 'ats') tv.innerHTML = atsAnalyzerHTML;
            if (type === 'ai') tv.innerHTML = aiImproverHTML;
        };
    }
}
