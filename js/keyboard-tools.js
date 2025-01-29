class KeyboardTools {
    static initLayoutCompare() {
        const layouts = {
            '60percent': ['standard', 'hhkb', 'wkl'],
            'tkl': ['standard', 'f13', 'compact'],
            'full': ['standard', 'extended']
        };

        const layoutSelector = document.getElementById('layoutSelector');
        if (!layoutSelector) return;

        layoutSelector.addEventListener('change', (e) => {
            const selectedLayout = e.target.value;
            this.renderLayout(selectedLayout);
        });
    }

    static initSwitchFinder() {
        const finder = document.getElementById('switchFinder');
        if (!finder) return;

        const questions = [
            { id: 'type', text: 'Preferred switch type?', options: ['Linear', 'Tactile', 'Clicky'] },
            { id: 'weight', text: 'Preferred actuation force?', options: ['Light', 'Medium', 'Heavy'] },
            { id: 'noise', text: 'Preferred noise level?', options: ['Silent', 'Moderate', 'Loud'] }
        ];

        this.renderQuestions(questions);
    }

    static renderLayout(layout) {
        // Layout rendering logic
        console.log(`Rendering ${layout} layout`);
    }

    static renderQuestions(questions) {
        const container = document.getElementById('switchQuestions');
        if (!container) return;

        questions.forEach(q => {
            const div = document.createElement('div');
            div.className = 'switch-question';
            div.innerHTML = `
                <h4>${q.text}</h4>
                <div class="options">
                    ${q.options.map(opt => `
                        <button class="option-btn" data-question="${q.id}" data-value="${opt.toLowerCase()}">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            `;
            container.appendChild(div);
        });
    }
}

// Initialize keyboard tools
document.addEventListener('DOMContentLoaded', () => {
    KeyboardTools.initLayoutCompare();
    KeyboardTools.initSwitchFinder();
});
