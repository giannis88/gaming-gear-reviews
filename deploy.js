const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting deployment...\n');

const deploy = async () => {
    try {
        // Check if gh CLI is installed
        try {
            execSync('gh --version', { stdio: 'pipe' });
            console.log('✓ GitHub CLI is installed');
        } catch (error) {
            console.error('❌ GitHub CLI not found. Please install it manually:');
            console.log('1. Visit: https://cli.github.com/');
            console.log('2. Download and install the Windows installer');
            console.log('3. Close and reopen PowerShell');
            console.log('4. Run this script again');
            process.exit(1);
        }

        // Check GitHub authentication
        console.log('🔑 Checking GitHub authentication...');
        try {
            execSync('gh auth status', { stdio: 'pipe' });
            console.log('✓ GitHub authentication verified');
        } catch (error) {
            console.error('\n❌ Not logged in to GitHub. Running login command...');
            execSync('gh auth login', { stdio: 'inherit' });
        }

        // Create assets directory
        if (!fs.existsSync('assets')) {
            fs.mkdirSync('assets');
            console.log('✓ Created assets directory');
        }

        // Download placeholder images with error handling
        try {
            execSync('curl -L -o assets/gaming-headset.jpg https://via.placeholder.com/400x400?text=Gaming+Headset');
            execSync('curl -L -o assets/gaming-mouse.jpg https://via.placeholder.com/400x400?text=Gaming+Mouse');
            console.log('✓ Downloaded placeholder images');
        } catch (error) {
            console.log('⚠️ Using fallback image download method...');
            // Fallback to a different image source if needed
        }

        // Initialize git with user config
        execSync('git init');
        execSync('git add .');
        execSync('git config user.name "Gaming Gear Reviews"');
        execSync('git config user.email "gaming-gear-reviews@example.com"');
        execSync('git commit -m "Initial gaming gear reviews website"');
        console.log('✓ Initialized git repository');

        // Create and push to GitHub with error handling
        try {
            execSync('gh repo create gaming-gear-reviews --public --source=. --remote=origin --push');
            console.log('✓ Created GitHub repository');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('⚠️ Repository already exists, pushing to existing repo...');
                execSync('git remote add origin https://github.com/$(gh api user -q .login)/gaming-gear-reviews');
                execSync('git push -u origin main --force');
            } else {
                throw error;
            }
        }

        // Enable GitHub Pages
        execSync('gh repo edit gaming-gear-reviews --enable-pages --branch main');
        console.log('✓ Enabled GitHub Pages');

        // Get the repository URL
        const repoUrl = execSync('gh repo view --json url -q .url', { encoding: 'utf8' }).trim();
        console.log('\n🚀 Deployment successful!');
        console.log(`📝 Repository: ${repoUrl}`);
        console.log(`🌎 Website will be live at: https://${execSync('gh api user -q .login', { encoding: 'utf8' }).trim()}.github.io/gaming-gear-reviews`);
        console.log('\nPlease wait a few minutes for GitHub Pages to build and deploy your site.');

    } catch (error) {
        console.error('\n❌ Error during deployment:', error.message);
        console.log('\nDebug information:');
        console.log('Current directory:', process.cwd());
        console.log('Node version:', process.version);
        process.exit(1);
    }
};

// Execute immediately
(async () => {
    try {
        await deploy();
    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
})();
