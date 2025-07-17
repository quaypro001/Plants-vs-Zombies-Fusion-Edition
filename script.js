document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const downloadBtn = document.getElementById('download-btn');
    const updatesTitle = document.getElementById('updates-title');
    const socialTitle = document.getElementById('social-title');
    const downloadTitle = document.getElementById('download-title');
    const footerText = document.getElementById('footer-text');
    const updatesContainer = document.getElementById('updates');
    const socialContainer = document.getElementById('social-links');
    const downloadsContainer = document.getElementById('downloads');

    fetch('/data.json')
        .then(response => {
            if (!response.ok) {
                console.error('Failed to load data.json:', response.status);
                return Promise.reject(new Error('Data load failed'));
            }
            return response.json();
        })
        .then(data => {
            const translations = data.translations;
            const updates = data.updates;
            const social = data.social;
            const downloads = data.downloads;

            function updateContent(lang) {
                // Hero Section
                heroTitle.textContent = translations[lang].hero_title;
                heroDesc.textContent = translations[lang].hero_desc;
                const windowsDownload = downloads.find(d => d.platform === 'Windows' && !d.discontinued);
                if (windowsDownload) downloadBtn.href = windowsDownload.url;

                // Updates
                updatesTitle.textContent = translations[lang].updates_title;
                updatesContainer.innerHTML = updates.map(update => `
                    <div class="card">
                        <h3 class="text-xl font-bold">${update.title[lang]}</h3>
                        <p>${update.description[lang]}</p>
                        <p class="text-sm text-gray-400">${update.date}</p>
                    </div>
                `).join('');

                // Social
                socialTitle.textContent = translations[lang].social_title;
                socialContainer.innerHTML = social.map(link => `
                    <a href="${link.url}" target="_blank" class="social-icon">
                        <img src="/${link.icon}" alt="${link.name}" class="w-10 h-10">
                    </a>
                `).join('');

                // Downloads
                downloadTitle.textContent = translations[lang].download_title;
                downloadsContainer.innerHTML = downloads.map(download => {
                    let content = `
                        <div class="card">
                            <h3 class="text-xl font-bold">${download.platform}</h3>
                            <p>${download.description[lang]}</p>
                            <a href="${download.url}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">${translations[lang].download_btn}</a>
                        </div>
                    `;
                    if (download.discontinued) {
                        content = `
                            <div class="card">
                                <div class="discontinued-notice">${translations[lang].discontinued_notice}</div>
                                ${content.slice(25)}
                            </div>
                        `;
                    }
                    return content;
                }).join('');

                // Footer
                footerText.textContent = translations[lang].footer_text;
            }

            updateContent(languageSelect.value);
            languageSelect.addEventListener('change', (e) => updateContent(e.target.value));
        })
        .catch(error => console.error('Error:', error));
});