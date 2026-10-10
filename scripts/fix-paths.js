const fs = require('fs');
const path = require('path');

function processHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace relative paths for specific directories and files
    const assets = [
        'css/', 'FontAwesome/', 'fonts/', 
        'favicon.svg', 'favicon.png', 
        'highlight.css', 'tomorrow-night.css', 'ayu-highlight.css', 'custom.css',
        'book.js', 'elasticlunr.min.js', 'mark.min.js', 'searcher.js', 'searchindex.js', 'toc.js'
    ];
    
    assets.forEach(asset => {
        const regexHref = new RegExp(`href="(?:\\\.\\\./)*${asset}`, 'g');
        const regexSrc = new RegExp(`src="(?:\\\.\\\./)*${asset}`, 'g');
        
        content = content.replace(regexHref, `href="/docs/${asset}`);
        content = content.replace(regexSrc, `src="/docs/${asset}`);
    });
    
    // Also replace path_to_root variable for JS
    content = content.replace(/const path_to_root = "[^"]*";/, 'const path_to_root = "/docs/";');

    fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processHtml(fullPath);
        }
    });
}

walkDir('docs/book');
console.log("Fixed all mdBook asset paths to absolute /docs/ paths!");
