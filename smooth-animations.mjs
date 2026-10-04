import fs from 'node:fs';
import path from 'node:path';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Update Framer Motion transitions
    content = content.replace(/transition=\{\{([^}]+)\}\}/g, (match, inner) => {
        if (inner.includes('type: "spring"')) {
            return match; // don't touch spring animations if any
        }
        
        let delay = '';
        const delayMatch = inner.match(/delay:\s*([^,}]+)/);
        if (delayMatch) {
            delay = `, delay: ${delayMatch[1]}`;
        }
        
        return `transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1]${delay} }}`;
    });
    
    // Make the upward slide a bit more pronounced for a smoother feel
    content = content.replace(/y:\s*20/g, 'y: 40');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated animations in', filePath);
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
console.log('Done updating animations.');
