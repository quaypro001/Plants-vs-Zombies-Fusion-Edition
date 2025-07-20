document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/updates.json');
        const updates = await response.json();
        const updatesList = document.getElementById('updates-list');
        updates.forEach(update => {
            const updateCard = document.createElement('div');
            updateCard.className = 'update-card';
            updateCard.innerHTML = `
                <h3 class="text-xl font-bold">${update.title}</h3>
                <p class="text-gray-600">${update.date}</p>
                <p>${update.description}</p>
            `;
            updatesList.appendChild(updateCard);
        });
    } catch (error) {
        console.error('Lỗi khi tải cập nhật:', error);
    }
});
