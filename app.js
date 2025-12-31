// 笔记数据配置
const notes = [
    {
        icon: '\u{1F4DD}',
        title: '善用临时目录',
        desc: '临时目录',
        url: 'https://www.notion.so/tmp-2d75245d192f816f9c43c0b96fd9790e',
        date: '2024-10-31',
        tags: ['tmp','linux']
    },
    {
        icon: '\u{1F440}',
        title: 'Glance面板配置',
        desc: 'Glance 学习笔记',
        url: 'https://www.notion.so/Glance-2d75245d192f80d8a72ce5d38dc251c0',
        date: '2025-12-29',
        tags: ['工具']
    },
    {
        icon: '\u{1F418}',
        title: 'PostgreSQL',
        desc: 'PostgreSQL 数据库学习笔记',
        url: 'https://www.notion.so/PostgreSQL-8af8d5c405a4491b8cc0e17abe96dc32',
        date: '2025-12-22',
        tags: ['数据库', 'SQL', 'Postgresql']
    },
    {
        icon: '\u{1F510}',
        title: '理解读写锁',
        desc: '并发编程中的读写锁机制',
        url: 'https://www.notion.so/a2f0f3bd17aa42049e59e8b1a70ae447',
        date: '2025-12-20',
        tags: ['并发', '编程', 'Java']
    }
];

// 当前筛选状态
let currentTag = null;
let searchQuery = '';
let sortOrder = 'desc';

// 获取所有标签
function getAllTags() {
    const tagSet = new Set();
    notes.forEach(note => note.tags?.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
}

// 模糊搜索
function fuzzyMatch(text, query) {
    if (!query) return true;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    let queryIndex = 0;
    for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
        if (lowerText[i] === lowerQuery[queryIndex]) queryIndex++;
    }
    return queryIndex === lowerQuery.length;
}

// 筛选笔记
function filterNotes() {
    let filtered = notes.filter(note => {
        const matchTag = !currentTag || note.tags?.includes(currentTag);
        const matchSearch = !searchQuery || 
            fuzzyMatch(note.title, searchQuery) || 
            fuzzyMatch(note.desc, searchQuery) ||
            note.tags?.some(tag => fuzzyMatch(tag, searchQuery));
        return matchTag && matchSearch;
    });
    filtered.sort((a, b) => {
        const diff = new Date(b.date) - new Date(a.date);
        return sortOrder === 'desc' ? diff : -diff;
    });
    return filtered;
}

// 按年份分组
function groupByYear(noteList) {
    const groups = {};
    noteList.forEach(note => {
        const year = note.date.split('-')[0];
        if (!groups[year]) groups[year] = [];
        groups[year].push(note);
    });
    return Object.entries(groups).sort((a, b) => b[0] - a[0]);
}

// 格式化日期
function formatDate(dateStr) {
    const [, month, day] = dateStr.split('-');
    return `${month}-${day}`;
}

// 渲染搜索和标签栏
function renderToolbar() {
    const container = document.getElementById('card-grid');
    const tags = getAllTags();
    
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    toolbar.innerHTML = `
        <div class="search-row">
            <div class="search-box">
                <input type="text" id="search-input" placeholder="搜索笔记..." />
            </div>
            <button class="sort-btn" id="sort-btn" title="切换排序">
                ${sortOrder === 'desc' ? '\u2193 最新' : '\u2191 最早'}
            </button>
        </div>
        <div class="tag-list">
            <button class="tag-btn${!currentTag ? ' active' : ''}" data-tag="">全部</button>
            ${tags.map(tag => `
                <button class="tag-btn${currentTag === tag ? ' active' : ''}" data-tag="${tag}">${tag}</button>
            `).join('')}
        </div>
    `;
    container.parentNode.insertBefore(toolbar, container);
    
    document.getElementById('search-input').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCards();
    });
    
    document.getElementById('sort-btn').addEventListener('click', () => {
        sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        document.getElementById('sort-btn').textContent = sortOrder === 'desc' ? '\u2193 最新' : '\u2191 最早';
        renderCards();
    });
    
    toolbar.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTag = btn.dataset.tag || null;
            toolbar.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards();
        });
    });
}

// 渲染卡片
function renderCards() {
    const container = document.getElementById('card-grid');
    const filtered = filterNotes();
    const grouped = groupByYear(filtered);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state">没有找到匹配的笔记</div>';
        return;
    }

    container.innerHTML = grouped.map(([year, items]) => `
        <section class="year-section">
            <h2 class="year-title">${year}</h2>
            <div class="card-list">
                ${items.map(note => `
                    <a class="card" href="${note.url}" target="_blank">
                        <div class="card-icon">${note.icon}</div>
                        <div class="card-body">
                            <div class="card-title">${note.title}</div>
                            <div class="card-desc">${note.desc}</div>
                            ${note.tags?.length ? `<div class="card-tags">${note.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>` : ''}
                        </div>
                        <div class="card-date">${formatDate(note.date)}</div>
                    </a>
                `).join('')}
            </div>
        </section>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderToolbar();
    renderCards();
    
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
