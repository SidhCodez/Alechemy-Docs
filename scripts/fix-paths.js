const fs = require('fs');
const path = require('path');

const categoryMap = {
  "01-AI-ML": "01. AI / ML Hackathons",
  "02-Non-AI": "02. Non-AI Software",
  "03-Automation": "03. Automation & Workflow",
  "04-No-Code": "04. No-Code & Low-Code",
  "05-Data-Analytics": "05. Data & Analytics",
  "06-Web3": "06. Web3 & Blockchain",
  "07-IoT": "07. IoT & Hardware",
  "08-AR-VR": "08. AR & VR",
  "09-Cybersecurity": "09. Cybersecurity",
  "10-Cloud-Devops": "10. Cloud & DevOps",
  "11-Domain-Industry": "11. Domain & Industry",
  "12-Creative-Gaming": "12. Creative & Gaming",
  "13-Social-Civic": "13. Social Impact & Civic",
  "14-Open-Innovation": "14. Open Innovation",
  "15-Beginner-Student": "15. Beginner & Student",
  "16-Platform-Sponsored": "16. Platform-Sponsored",
  "17-Debugging": "17. Debugging Framework",
  "18-System-Design": "18. System Design",
  "19-SEO": "19. SEO Optimization",
  "20-Scalability": "20. Scalability"
};

function cleanTitle(title) {
  return title.replace(/&amp;/g, "&").replace(/<[^>]+>/g, "").trim();
}

function generateDescription(relPath, rawTitle) {
  const parts = relPath.replace(/\\/g, "/").split("/");
  const title = cleanTitle(rawTitle);
  
  if (relPath === "index.html") {
    return "Welcome to Alchemy Docs: The ultimate production-grade prompt framework and structured templates for hackathons, builders, and AI creators.";
  }
  if (relPath === "introduction.html") {
    return "Introduction to Alchemy Docs: Discover our complete prompt engineering system, 20 categories, and 330+ structured prompt packs for builders.";
  }
  if (relPath === "404.html") {
    return "Page not found on Alchemy Docs. Search our complete collection of prompt engineering frameworks, technical blueprints, and hackathon prompt packs.";
  }
  if (relPath === "print.html") {
    return "Alchemy Docs complete printable documentation: A unified compilation of prompt frameworks, technical blueprints, and templates for AI hackathons.";
  }
  if (relPath === "hackathon-alchemy/index.html") {
    return "Hackathon Alchemy: Comprehensive prompt framework with 20 categories and 330+ prompt packs designed for fast-paced 24-48 hour software sprints.";
  }
  if (relPath === "hackathon-alchemy/how-to-use.html") {
    return "How to use Hackathon Alchemy: Step-by-step instructions for selecting categories, copying prompt packs, and building winning AI hackathon projects.";
  }
  if (relPath === "builder-alchemy/index.html") {
    return "Builder Alchemy: Production frameworks and blueprints focused on long-term startup creation, product launches, freelancing, and creator workflows.";
  }
  
  // Category overview (e.g. hackathon-alchemy/01-AI-ML/index.html)
  if (parts.length === 3 && parts[0] === "hackathon-alchemy" && parts[2] === "index.html") {
    const cat = categoryMap[parts[1]] || parts[1];
    return `Explore ${cat} prompt framework: End-to-end templates for requirements, technical blueprints, and rapid hackathon delivery.`;
  }
  
  // Sub-section overview (e.g. phase-1/index.html, pillar-1/index.html)
  if (parts.length === 4 && parts[0] === "hackathon-alchemy" && parts[3] === "index.html") {
    const cat = categoryMap[parts[1]] || parts[1];
    return `${title} framework for ${cat}: Step-by-step prompt templates and architecture specs for rapid hackathon project execution.`;
  }
  
  // Specific document inside sub-section
  if (parts.length >= 4 && parts[0] === "hackathon-alchemy") {
    const cat = categoryMap[parts[1]] || parts[1];
    const sub = parts[2].replace(/-/g, " ");
    return `${title} prompt for ${cat} (${sub}): Complete blueprint prompt, technical requirements, and execution guidelines for builders.`;
  }
  
  return `${title} prompt template from Alchemy Docs: Production-ready prompts, architecture blueprints, and execution frameworks for builders.`;
}

function fitDescription(desc) {
  if (desc.length > 155) {
    const cut = desc.substring(0, 152);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 100 ? cut.substring(0, lastSpace) : cut) + "...";
  }
  return desc;
}

function processHtml(filePath, baseDir) {
    let content = fs.readFileSync(filePath, 'utf8');
    const relPath = path.relative(baseDir, filePath).replace(/\\/g, "/");
    
    // 1. Replace relative paths for static assets
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
    
    // Replace path_to_root variable for JS
    content = content.replace(/const path_to_root = "[^"]*";/, 'const path_to_root = "/docs/";');

    // 2. Fix broken internal links to README.html -> index.html
    content = content.replace(/href="([^"]*?)README\.html([#?][^"]*)?"/g, 'href="$1index.html$2"');

    // 3. Fix multiple H1 headings: change navbar menu title from <h1> to <div>
    content = content.replace(/<h1 class="menu-title">([\s\S]*?)<\/h1>/g, '<div class="menu-title">$1</div>');

    // 4. Inject unique, optimal meta description
    const m = content.match(/<title>(.*?)(?: - Alchemy Docs)?<\/title>/i);
    const pageTitle = m ? m[1].trim() : "Alchemy Docs";
    const uniqueDesc = fitDescription(generateDescription(relPath, pageTitle));
    
    // Replace existing description meta tag
    if (/<meta name="description" content="[^"]*">/i.test(content)) {
        content = content.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${uniqueDesc}">`);
    } else {
        content = content.replace(/<\/head>/i, `    <meta name="description" content="${uniqueDesc}">\n    </head>`);
    }

    fs.writeFileSync(filePath, content);

    // 5. If this is index.html, create README.html alongside it to guarantee 200 OK for any legacy/external links
    if (path.basename(filePath) === 'index.html') {
        const readmePath = path.join(path.dirname(filePath), 'README.html');
        fs.writeFileSync(readmePath, content);
    }
}

function walkDir(dir, baseDir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath, baseDir);
        } else if (fullPath.endsWith('.html') && !fullPath.endsWith('README.html')) {
            processHtml(fullPath, baseDir);
        }
    });
}

walkDir('docs/book', 'docs/book');
console.log("Successfully processed all mdBook pages: fixed asset paths, resolved README links, ensured single H1, and injected unique meta descriptions!");
