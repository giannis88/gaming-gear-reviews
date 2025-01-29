#!/bin/bash

# Create assets directory
mkdir -p assets

# Download placeholder images (replace these with real product images later)
curl -o assets/gaming-headset.jpg https://via.placeholder.com/400x400?text=Gaming+Headset
curl -o assets/gaming-mouse.jpg https://via.placeholder.com/400x400?text=Gaming+Mouse

# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
gh repo create gaming-gear-reviews --public --source=. --remote=origin --push

# Enable GitHub Pages
gh repo edit --enable-pages --branch main
