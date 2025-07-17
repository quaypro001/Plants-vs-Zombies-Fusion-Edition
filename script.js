document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const downloadBtn = document.getElementById('download-btn');
    const updatesTitle = document.getElementById('updates-title');
    const socialTitle = document.getElementById('social-title');
    const downloadTitle = document.getElementById('download-title');
    const oldVersionsTitle = document.getElementById('old-versions-title');
    const footerText = document.getElementById('footer-text');
    const updatesContainer = document.getElementById('updates');
    const socialContainer = document.getElementById('social-links');
    const downloadsContainer = document.getElementById('downloads');
    const oldVersionsContainer = document.getElementById('old-versions');

    async function loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                console.error('Failed to load data.json:', response.status);
                return null;
            }
            const data = await response.json();
            console.log('Data loaded successfully:', data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }

    function updateContent(lang, data) {
        if (!data) {
            heroTitle.textContent = 'Error loading data';
            heroDesc.textContent = 'Please check your connection or contact support.';
            updatesContainer.innerHTML = '<div class="update-item"><p>Failed to load updates.</p></div>';
            socialContainer.innerHTML = '<p>Failed to load social links.</p>';
            downloadsContainer.innerHTML = '<div class="download-item"><p>Failed to load downloads.</p></div>';
            oldVersionsContainer.innerHTML = '<div class="old-version-item"><p>Failed to load old versions.</p></div>';
            return;
        }

        const translations = data.translations || {};
        const updates = data.updates || [];
        const social = data.social || [];
        const downloads = data.downloads || [];
        const oldVersions = data.old_versions || [];

        // Hero Section
        heroTitle.textContent = translations[lang]?.hero_title || 'Welcome';
        heroDesc.textContent = translations[lang]?.hero_desc || 'A fan-made game!';
        const windowsDownload = downloads.find(d => d.platform === 'Windows' && !d.discontinued);
        downloadBtn.href = windowsDownload ? windowsDownload.url : '#';
        downloadBtn.textContent = translations[lang]?.download_btn || 'Download Now';

        // Updates
        updatesTitle.textContent = translations[lang]?.updates_title || 'Latest Updates';
        updatesContainer.innerHTML = updates.length > 0
            ? updates.map(update => `
                <div class="update-item">
                    <h3 class="text-xl font-bold">${update.title[lang] || 'Update Title'}</h3>
                    <p>${update.description[lang] || 'Update description'}</p>
                    <p class="text-sm text-gray-400">${update.date || 'N/A'}</p>
                </div>
            `).join('')
            : '<div class="update-item"><p>No updates available.</p></div>';

        // Social
        socialTitle.textContent = translations[lang]?.social_title || 'Follow Us';
        socialContainer.innerHTML = social.length > 0
            ? social.map(link => `
                <a href="${link.url}" target="_blank" class="social-icon">
                    <img src="./${link.icon}" alt="${link.name}" class="w-10 h-10">
                </a>
            `).join('')
            : '<p>No social links available.</p>';

        // Downloads
        downloadTitle.textContent = translations[lang]?.download_title || 'Download';
        downloadsContainer.innerHTML = downloads.length > 0
            ? downloads.map(download => {
                let content = `
                    <div class="download-item">
                        <h3 class="text-xl font-bold">${download.platform}</h3>
                        <p>${download.description[lang] || 'Download description'}</p>
                        <div class="relative">
                            <button id="download-btn-${download.platform}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
                                ${translations[lang]?.download_btn || 'Download'}
                            </button>
                            <div class="download-menu" id="menu-${download.platform}">
                                <a href="${download.url || '#'}?lang=en" class="en">Download Now</a>
                                <a href="${download.url || '#'}?lang=vi" class="vi">Tải xuống ngay</a>
                                <a href="${download.url || '#'}?lang=zh" class="zh">立即下载</a>
                            </div>
                        </div>
                    </div>
                `;
                if (download.discontinued) {
                    content = `
                        <div class="download-item">
                            <div class="discontinued-notice">${translations[lang]?.discontinued_notice || 'Discontinued'}</div>
                            ${content.slice(27)}
                        </div>
                    `;
                }
                return content;
            }).join('')
            : '<div class="download-item"><p>No downloads available.</p></div>';

        // Old Versions
        oldVersionsTitle.textContent = translations[lang]?.old_versions_title || 'Old Versions';
        oldVersionsContainer.innerHTML = oldVersions.length > 0
            ? oldVersions.map(version => {
                let content = `
                    <div class="old-version-item">
                        <h3 class="text-xl font-bold">${version.version}</h3>
                        <p>${version.description[lang] || 'Old version description'}</p>
                        <div class="relative">
                            <button id="download-btn-${version.version}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
                                ${translations[lang]?.download_btn || 'Download'}
                            </button>
                            <div class="download-menu" id="menu-${version.version}">
                                <a href="${version.url || '#'}?lang=en" class="en">Download Now</a>
                                <a href="${version.url || '#'}?lang=vi" class="vi">Tải xuống ngay</a>
                                <a href="${version.url || '#'}?lang=zh" class="zh">立即下载</a>
                            </div>
                        </div>
                    </div>
                `;
                if (version.discontinued) {
                    content = `
                        <div class="old-version-item">
                            <div class="discontinued-notice">${translations[lang]?.discontinued_notice || 'Discontinued'}</div>
                            ${content.slice(27)}
                        </div>
                    `;
                }
                return content;
            }).join('')
            : '<div class="old-version-item"><p>No old versions available.</p></div>';

        // Footer
        footerText.textContent = translations[lang]?.footer_text || '© 2025 PvZ Fusion Edition. All rights reserved.';

        // Thêm event listener cho các nút download
        [...document.querySelectorAll('[id^="download-btn-"]')].forEach(btn => {
            const menuId = `menu-${btn.id.split('-')[1]}`;
            const menu = document.getElementById(menuId);
            if (btn && menu) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    menu.classList.toggle('active');
                });
                menu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const lang = link.className;
                        const url = link.getAttribute('href').split('?')[0];
                        window.location.href = `${url}?lang=${lang}`;
                        menu.classList.remove('active');
                    });
                });
            }
        });
    }

    loadData().then(data => {
        updateContent(languageSelect.value, data);
        languageSelect.addEventListener('change', (e) => updateContent(e.target.value, data));
    });
});
