const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const deploy = () => {
    const projectDir = process.cwd();
    
    // Clean everything first
    fs.readdirSync(projectDir).forEach(file => {
        if (file !== 'deploy.js') {
            const filePath = path.join(projectDir, file);
            fs.rmSync(filePath, { recursive: true, force: true });
        }
    });

    // Create basic project structure
    const html = '<!DOCTYPE html><html><body><h1>Gaming Reviews</h1></body></html>';
    fs.writeFileSync('index.html', html);
    fs.writeFileSync('README.md', '# Gaming Reviews');

    // Git setup with explicit error checks
    try {
        execSync('git init');
        execSync('git config --local user.name "Gaming Reviews"');
        execSync('git config --local user.email "reviews@example.com"');
        execSync('git add .');
        execSync('git commit -m "Initial commit"');
        execSync('gh repo create gaming-gear-reviews --public --source=. --push');
        console.log('✅ Site created successfully');
    } catch (err) {
        const gitStatus = execSync('git status', { encoding: 'utf8' });
        console.error('Failed:', err.message, '\nGit status:', gitStatus);
        process.exit(1);
    }
};

// Run with synchronous error boundary
try {
    deploy();
} catch (err) {
    console.error('Fatal error:', err.message);
    process.exit(1);
}
