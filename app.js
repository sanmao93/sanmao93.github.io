// 笔记数据从 notes.js 加载

// 状态管理
let currentTag = null;
let searchQuery = '';
let sortOrder = 'desc';
let viewMode = localStorage.getItem('viewMode') || 'list';
let theme = localStorage.getItem('theme') || 'dark';
let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
let pinnedNotes = JSON.parse(localStorage.getItem('pinnedNotes') || '[]');

// 初始化主题
function initTheme() {
    document.documentElement.setAttribute('data-theme', theme);
}

// 切换主题
function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeBtn();
}

function updateThemeBtn() {
    const btn = document.getElementById('theme-btn');
    if (btn) {
        btn.innerHTML = theme === 'dark' 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
}

// 置顶/取消置顶
function togglePin(noteId, e) {
    e.preventDefault();
    e.stopPropagation();
    if (pinnedNotes.includes(noteId)) {
        pinnedNotes = pinnedNotes.filter(id => id !== noteId);
    } else {
        pinnedNotes.unshift(noteId);
    }
    localStorage.setItem('pinnedNotes', JSON.stringify(pinnedNotes));
    renderCards();
}

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

// 高亮匹配文本
function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
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
    
    // 置顶笔记排在前面
    filtered.sort((a, b) => {
        const aPinned = pinnedNotes.includes(a.id);
        const bPinned = pinnedNotes.includes(b.id);
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
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

// 保存搜索历史
function saveSearchHistory(query) {
    if (!query || searchHistory.includes(query)) return;
    searchHistory.unshift(query);
    if (searchHistory.length > 5) searchHistory.pop();
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// 随机笔记
function getRandomNote() {
    const idx = Math.floor(Math.random() * notes.length);
    window.open(notes[idx].url, '_blank');
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
                <input type="text" id="search-input" placeholder="搜索笔记... (按 / 聚焦)" />
                <div class="search-history" id="search-history"></div>
            </div>
            <button class="icon-btn" id="sort-btn" title="切换排序">
                ${sortOrder === 'desc' 
                    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>'
                    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
                }
            </button>
            <button class="icon-btn" id="view-btn" title="切换视图">
                ${viewMode === 'list' 
                    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/></svg>'
                    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/></svg>'
                }
            </button>
            <button class="icon-btn" id="theme-btn" title="切换主题"></button>
            <button class="icon-btn" id="random-btn" title="随机笔记">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 17h4c2 0 3-2 5-5s3-5 5-5h4"/>
                    <path d="M3 7h4c2 0 3 2 5 5s3 5 5 5h4"/>
                    <path d="M18 4l3 3-3 3"/>
                    <path d="M18 14l3 3-3 3"/>
                </svg>
            </button>
        </div>
        <div class="tag-list-wrapper">
            <div class="tag-list" id="tag-list">
                <button class="tag-btn${!currentTag ? ' active' : ''}" data-tag="">全部</button>
                ${tags.map(tag => `
                    <button class="tag-btn${currentTag === tag ? ' active' : ''}" data-tag="${tag}">${tag}</button>
                `).join('')}
            </div>
            <button class="tag-expand-btn" id="tag-expand-btn" style="display:none;">更多</button>
        </div>
    `;
    container.parentNode.insertBefore(toolbar, container);
    updateThemeBtn();
    
    const searchInput = document.getElementById('search-input');
    const historyBox = document.getElementById('search-history');
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCards();
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchHistory.length > 0) {
            historyBox.innerHTML = searchHistory.map(h => 
                `<div class="history-item">${h}</div>`
            ).join('') + '<div class="history-clear">清除历史</div>';
            historyBox.style.display = 'block';
        }
    });
    
    searchInput.addEventListener('blur', () => {
        setTimeout(() => historyBox.style.display = 'none', 200);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchQuery) {
            saveSearchHistory(searchQuery);
        }
        if (e.key === 'Escape') {
            searchQuery = '';
            searchInput.value = '';
            renderCards();
        }
    });
    
    historyBox.addEventListener('click', (e) => {
        if (e.target.classList.contains('history-item')) {
            searchQuery = e.target.textContent;
            searchInput.value = searchQuery;
            renderCards();
        }
        if (e.target.classList.contains('history-clear')) {
            searchHistory = [];
            localStorage.removeItem('searchHistory');
            historyBox.style.display = 'none';
        }
    });
    
    document.getElementById('sort-btn').addEventListener('click', () => {
        sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
        document.getElementById('sort-btn').innerHTML = sortOrder === 'desc' 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
        renderCards();
    });
    
    document.getElementById('view-btn').addEventListener('click', () => {
        viewMode = viewMode === 'list' ? 'grid' : 'list';
        localStorage.setItem('viewMode', viewMode);
        document.getElementById('view-btn').innerHTML = viewMode === 'list' 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/></svg>';
        renderCards();
    });
    
    document.getElementById('theme-btn').addEventListener('click', toggleTheme);
    document.getElementById('random-btn').addEventListener('click', getRandomNote);
    
    toolbar.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentTag = btn.dataset.tag || null;
            toolbar.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards();
        });
    });
    
    // 检查标签是否溢出
    const tagList = document.getElementById('tag-list');
    const tagExpandBtn = document.getElementById('tag-expand-btn');
    
    function checkTagOverflow() {
        if (tagList.scrollHeight > 40) {
            tagExpandBtn.style.display = 'block';
        } else {
            tagExpandBtn.style.display = 'none';
        }
    }
    
    checkTagOverflow();
    window.addEventListener('resize', checkTagOverflow);
    
    tagExpandBtn.addEventListener('click', () => {
        tagList.classList.toggle('expanded');
        tagExpandBtn.textContent = tagList.classList.contains('expanded') ? '收起' : '更多';
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    });
}


// 生成卡片 HTML
function renderCardHTML(note, isGrid = false) {
    const isPinned = pinnedNotes.includes(note.id);
    const pinIcon = `<button class="pin-btn ${isPinned ? 'pinned' : ''}" onclick="togglePin('${note.id}', event)" title="${isPinned ? '取消置顶' : '置顶'}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="${isPinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 17V3M12 3L6 9M12 3L18 9"/>
            <path d="M5 21h14"/>
        </svg>
    </button>`;
    
    if (isGrid) {
        return `
            <a class="grid-card" href="${note.url}" target="_blank">
                ${pinIcon}
                <div class="grid-icon">${note.icon}</div>
                <div class="grid-title">${highlightText(note.title, searchQuery)}</div>
                <div class="grid-desc">${highlightText(note.desc, searchQuery)}</div>
                <div class="grid-meta">
                    <span class="grid-date">${formatDate(note.date)}</span>
                </div>
                ${note.tags?.length ? `<div class="grid-tags">${note.tags.map(t => `<span class="card-tag">${highlightText(t, searchQuery)}</span>`).join('')}</div>` : ''}
            </a>
        `;
    }
    
    return `
        <a class="card" href="${note.url}" target="_blank">
            ${pinIcon}
            <div class="card-icon">${note.icon}</div>
            <div class="card-body">
                <div class="card-title">${highlightText(note.title, searchQuery)}</div>
                <div class="card-desc">${highlightText(note.desc, searchQuery)}</div>
                ${note.tags?.length ? `<div class="card-tags">${note.tags.map(t => `<span class="card-tag">${highlightText(t, searchQuery)}</span>`).join('')}</div>` : ''}
            </div>
            <div class="card-date">${formatDate(note.date)}</div>
        </a>
    `;
}

// 渲染卡片
function renderCards() {
    const container = document.getElementById('card-grid');
    const filtered = filterNotes();
    
    // 分离置顶和普通笔记
    const pinned = filtered.filter(n => pinnedNotes.includes(n.id));
    const normal = filtered.filter(n => !pinnedNotes.includes(n.id));
    const groupedNormal = groupByYear(normal);

    container.className = `card-grid ${viewMode}-view`;

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state">没有找到匹配的笔记</div>';
        return;
    }

    let html = '';
    
    // 置顶区域
    if (pinned.length > 0) {
        html += `
            <section class="year-section pinned-section">
                <h2 class="year-title">📌 置顶</h2>
                <div class="${viewMode === 'grid' ? 'grid-container' : 'card-list'}">
                    ${pinned.map(note => renderCardHTML(note, viewMode === 'grid')).join('')}
                </div>
            </section>
        `;
    }
    
    // 普通笔记按年份分组
    html += groupedNormal.map(([year, items]) => `
        <section class="year-section">
            <h2 class="year-title">${year}</h2>
            <div class="${viewMode === 'grid' ? 'grid-container' : 'card-list'}">
                ${items.map(note => renderCardHTML(note, viewMode === 'grid')).join('')}
            </div>
        </section>
    `).join('');

    container.innerHTML = html;
}

// 初始化
function init() {
    initTheme();
    renderToolbar();
    renderCards();
    
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', init);
