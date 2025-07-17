document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language');
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    const downloadBtn = document.getElementById('download-btn');
    const updatesTitle = document.getElementById('updates-title');
    const updatesList = document.getElementById('updates-list');
    const socialTitle = document.getElementById('social-title');
    const socialLinks = document.getElementById('social-links');
    const footerText = document.getElementById('footer-text');

    function loadContent(lang) {
        const data = gameData[lang];

        heroTitle.textContent = data.hero.title;
        heroDescription.textContent = data.hero.description;
        downloadBtn.textContent = data.hero.download;
        updatesTitle.textContent = data.updates.title;
        footerText.innerHTML = data.footer;

        updatesList.innerHTML = '';
        data.updates.list.forEach(update => {
            const updateCard = document.createElement('div');
            updateCard.className = 'update-card';
            updateCard.innerHTML = `
                <h3 class="text-xl font-bold">${update.title}</h3>
                <p>${update.description}</p>
                <p class="text-sm text-gray-400">${update.date}</p>
            `;
            updatesList.appendChild(updateCard);
        });

        socialLinks.innerHTML = '';
        data.social.links.forEach(link => {
            const socialLink = document.createElement('a');
            socialLink.href = link.url;
            socialLink.className = 'social-link';
            socialLink.innerHTML = `<img src="${link.icon}" alt="${link.name}" class="w-12 h-12">`;
            socialLinks.appendChild(socialLink);
        });
    }

    languageSelect.addEventListener('change', (e) => {
        loadContent(e.target.value);
    });

    loadContent('en');
});