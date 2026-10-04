import fs from 'node:fs';
import path from 'node:path';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove all explicit rounded corners from classes
    content = content.replace(/rounded-(?:2xl|xl|lg|md|sm)/g, 'rounded-none');
    // For elements that must be circular (like avatars), keep rounded-full
    
    // Remove shadows
    content = content.replace(/shadow-(?:lg|md|sm)/g, '');
    content = content.replace(/shadow-\[.*?\]/g, '');
    
    // Replace soft gradients with strict borders and solid colors
    content = content.replace(/bg-gradient-to-br from-white to-primary\/5/g, 'bg-white border-b border-gray-200');
    content = content.replace(/bg-gradient-to-br from-white via-gray-50 to-primary\/5/g, 'bg-white border-b border-gray-200');
    
    // Replace some text colors for higher contrast
    content = content.replace(/text-gray-500/g, 'text-gray-600');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir('app');
walkDir('components');
console.log('Done modifying components.');
