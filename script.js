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

    // Load JSON data
    fetch('./data.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load data.json');
            return response.json();
        })
        .then(data => {
            const translations = data.translations;
            const updates = data.updates;
            const social = data.social;
            const downloads = data.downloads;

            // Function to update content based on language
            function updateContent(lang) {
                heroTitle.textContent = translations[lang].hero_title;
                heroDesc.textContent = translations[lang].hero_desc;
                downloadBtn.textContent = translations[lang].download_btn;
                updatesTitle.textContent = translations[lang].updates_title;
                socialTitle.textContent = translations[lang].social_title;
                downloadTitle.textContent = translations[lang].download_title;
                footerText.textContent = translations[lang].footer_text;

                // Render updates
                updatesContainer.innerHTML = '';
                updates.forEach(update => {
                    updatesContainer.innerHTML += `
                        <div class="card">
                            <h3 class="text-xl font-bold">${update.title[lang]}</h3>
                            <p>${update.description[lang]}</p>
                            <p class="text-sm text-gray-400">${update.date}</p>
                        </div>
                    `;
                });

                // Render social links
                socialContainer.innerHTML = '';
                social.forEach(link => {
                    socialContainer.innerHTML += `
                        <a href="${link.url}" target="_blank" class="social-icon">
                            <img src="${link.icon}" alt="${link.name}" class="w-10 h-10">
                        </a>
                    `;
                });

                // Render download links
                downloadsContainer.innerHTML = '';
                downloads.forEach(download => {
                    downloadsContainer.innerHTML += `
                        <div class="card">
                            ${download.discontinued ? `<div class="discontinued-notice">${translations[lang].discontinued_notice}</div>` : ''}
                            <h3 class="text-xl font-bold">${download.platform}</h3>
                            <p>${download.description[lang]}</p>
                            <a href="${download.url}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">${translations[lang].download_btn}</a>
                        </div>
                    `;
                });
            }

            // Initial render with default language
            updateContent(languageSelect.value);

            // Update content on language change
            languageSelect.addEventListener('change', (e) => {
                updateContent(e.target.value);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});
