document.addEventListener('DOMContentLoaded', () => {
    // Dữ liệu đa ngôn ngữ
    const translations = {
        'zh': {
            'nav-about': '关于',
            'nav-updates': '更新',
            'nav-social': '社交媒体',
            'nav-download': '下载',
            'about-heading': '关于我们',
            'about-content': '植物大战僵尸：融合版是一个特殊版本，它结合了多个PvP版本中您最喜欢的元素，带来新颖而激动人心的体验。您将发现新的植物种类、独特的僵尸和充满挑战的关卡。',
            'updates-heading': '最新更新',
            'social-heading': '联系我们',
            'download-heading': '下载',
            'view-details': '查看详情',
            'download-game': '下载游戏',
            'windows-download': 'Windows 版本',
            'android-download': 'Android 版本',
            'mac-download': 'Mac 版本'
        },
        'en': {
            'nav-about': 'About',
            'nav-updates': 'Updates',
            'nav-social': 'Social Media',
            'nav-download': 'Download',
            'about-heading': 'About Us',
            'about-content': 'Plants vs Zombies: Fusion Edition is a special version that combines your favorite elements from various PvZ versions, bringing a new and exciting experience. You will discover new plant species, unique zombies, and challenging levels.',
            'updates-heading': 'Latest Updates',
            'social-heading': 'Connect With Us',
            'download-heading': 'Download',
            'view-details': 'View Details',
            'download-game': 'Download Game',
            'windows-download': 'Windows Version',
            'android-download': 'Android Version',
            'mac-download': 'Mac Version'
        },
        'vi': {
            'nav-about': 'Giới thiệu',
            'nav-updates': 'Cập nhật',
            'nav-social': 'Mạng xã hội',
            'nav-download': 'Tải về',
            'about-heading': 'Giới thiệu',
            'about-content': 'Plants vs Zombies: Fusion Edition là một phiên bản đặc biệt, kết hợp những yếu tố yêu thích từ nhiều phiên bản PvZ khác nhau, mang đến trải nghiệm mới lạ và hấp dẫn. Bạn sẽ khám phá các loại cây mới, zombie độc đáo và những màn chơi đầy thử thách.',
            'updates-heading': 'Cập nhật mới nhất',
            'social-heading': 'Kết nối với chúng tôi',
            'download-heading': 'Tải về',
            'view-details': 'Xem chi tiết',
            'download-game': 'Tải Game',
            'windows-download': 'Phiên bản Windows',
            'android-download': 'Phiên bản Android',
            'mac-download': 'Phiên bản Mac'
        }
    };

    let currentLang = 'vi'; // Ngôn ngữ mặc định

    // Hàm thay đổi ngôn ngữ
    function setLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        // **Quan trọng:** Cần dịch các nội dung động đã được thêm vào DOM
        // Kiểm tra và dịch nội dung trong các thẻ card nếu có
        document.querySelectorAll('.card [data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Gán sự kiện cho các nút chuyển đổi ngôn ngữ
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.addEventListener('click', (event) => {
            setLanguage(event.target.dataset.lang);
        });
    });

    // --- Xử lý tải dữ liệu từ JSON ---

    // Tải và hiển thị Updates
    fetch('data/updates.json')
        .then(response => response.json())
        .then(data => {
            const updatesList = document.getElementById('updates-list');
            updatesList.innerHTML = ''; // Xóa nội dung cũ trước khi thêm
            data.forEach(update => {
                const updateCard = `
                    <div class="card">
                        <span class="date">${update.date}</span>
                        <h3>${update.title}</h3>
                        <p>${update.description}</p>
                        ${update.link ? `<a href="${update.link}" target="_blank" class="button" data-translate="view-details">Xem chi tiết</a>` : ''}
                    </div>
                `;
                updatesList.innerHTML += updateCard;
            });
            // Áp dụng dịch thuật sau khi nội dung đã được render
            setLanguage(currentLang);
        })
        .catch(error => console.error('Error loading updates:', error));

    // Tải và hiển thị Social Links
    fetch('data/social.json')
        .then(response => response.json())
        .then(data => {
            const socialLinks = document.getElementById('social-links');
            socialLinks.innerHTML = ''; // Xóa nội dung cũ trước khi thêm
            data.forEach(social => {
                const socialCard = `
                    <div class="card">
                        <a href="${social.url}" target="_blank">
                            <img src="${social.icon}" alt="${social.name} icon" class="social-icon">
                            <h3>${social.name}</h3>
                        </a>
                        <p>${social.description}</p>
                    </div>
                `;
                socialLinks.innerHTML += socialCard;
            });
            // Áp dụng dịch thuật sau khi nội dung đã được render
            setLanguage(currentLang);
        })
        .catch(error => console.error('Error loading social links:', error));

    // Tải và hiển thị Download Options
    fetch('data/downloads.json')
        .then(response => response.json())
        .then(data => {
            const downloadOptions = document.getElementById('download-options');
            downloadOptions.innerHTML = ''; // Xóa nội dung cũ trước khi thêm
            data.forEach(download => {
                const downloadCard = `
                    <div class="card">
                        <img src="${download.icon}" alt="${download.platform} icon" class="download-icon">
                        <h3><span data-translate="${download.translateKey}">${download.platform}</span></h3>
                        <p>${download.description}</p>
                        <a href="${download.url}" target="_blank" class="button download-link" data-translate="download-game">Tải Game</a>
                    </div>
                `;
                downloadOptions.innerHTML += downloadCard;
            });
            // Áp dụng dịch thuật sau khi nội dung đã được render
            setLanguage(currentLang);
        })
        .catch(error => console.error('Error loading downloads:', error));

    // Gọi hàm setLanguage khi tải trang để áp dụng ngôn ngữ mặc định cho cả nội dung tĩnh và động
    // Đảm bảo hàm này được gọi sau khi tất cả nội dung đã được load hoặc nằm trong các `.then` của fetch
    // Để đơn giản, ta sẽ gọi nó sau khi tất cả các fetch hoàn tất hoặc đảm bảo các thẻ có data-translate đã tồn tại
    // Cách tốt nhất là gọi nó trong mỗi `fetch().then()` như đã sửa ở trên.

    // --- Hiệu ứng Scroll Animation ---
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Khi 10% của phần tử nằm trong viewport
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden'); // Để có thể ẩn lại khi scroll ra ngoài
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden'); // Ẩn tất cả các section ban đầu
        sectionObserver.observe(section);
    });

    // --- Active Navbar Link on Scroll ---
    const navLinks = document.querySelectorAll('.navbar ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) { // Điều chỉnh offset nếu cần
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
