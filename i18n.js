fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const languageSelect = document.getElementById('language');
        const updateContent = (lang) => {
            document.getElementById('game-title').textContent = data.translations[lang].title;
            document.getElementById('game-description').textContent = data.translations[lang].description;
            document.getElementById('updates-title').textContent = data.translations[lang].updates;
            document.getElementById('social-title').textContent = data.translations[lang].social;
            document.getElementById('download-title').textContent = data.translations[lang].download;

            const updatesDiv = document.getElementById('updates-content');
            updatesDiv.innerHTML = '';
            data.updates[lang].forEach(update => {
                const p = document.createElement('p');
                p.textContent = update;
                updatesDiv.appendChild(p);
            });

            const socialDiv = document.getElementById('social-content');
            socialDiv.innerHTML = '';
            data.social.forEach(social => {
                const a = document.createElement('a');
                a.href = social.link;
                a.textContent = social.name;
                a.style.display = 'block';
                a.style.margin = '10px 0';
                a.style.color = '#fff';
                socialDiv.appendChild(a);
            });

            const downloadDiv = document.getElementById('download-content');
            downloadDiv.innerHTML = '';
            data.download[lang].forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.textContent = link.text;
                a.style.display = 'block';
                a.style.margin = '10px 0';
                a.style.color = '#fff';
                downloadDiv.appendChild(a);
            });
        };

        languageSelect.addEventListener('change', (e) => {
            updateContent(e.target.value);
        });

        updateContent('en'); // Default language
    });