document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/downloads.json');
        const downloads = await response.json();
        const downloadsList = document.getElementById('downloads-list');
        downloads.forEach(download => {
            const downloadCard = document.createElement('div');
            downloadCard.className = 'download-card';
            downloadCard.innerHTML = `
                <h3 class="text-xl font-bold">${download.version}</h3>
                <p class="text-gray-600">${download.platform}</p>
                <p>${download.description}</p>
                <a href="${download.link}" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Tải xuống</a>
            `;
            downloadsList.appendChild(downloadCard);
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách tải xuống:', error);
    }
});
