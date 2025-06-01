// Sayfa yükleme ve scroll animasyonları
document.addEventListener('DOMContentLoaded', () => {
    // GitHub projeleri
    const fetchGitHubRepos = async () => {
        try {
            const username = 'eemrek';
            const repoList = document.getElementById('repo-list');
            
            // Yükleniyor mesajı
            repoList.innerHTML = '<div class="col-12 text-center"><p>Projeler yükleniyor...</p></div>';
            
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('GitHub API error');
            
            const repos = await response.json();
            repoList.innerHTML = ''; // Yükleniyor mesajını temizle
            
            if (repos.length === 0) {
                repoList.innerHTML = '<div class="col-12 text-center"><p>Henüz proje yok.</p></div>';
                return;
            }

            repos.forEach(repo => {
                if (!repo.fork) { // Fork olmayan projeleri göster
                    const card = document.createElement('div');
                    card.className = 'col-md-6 col-lg-4 mb-4';
                    
                    card.innerHTML = `
                        <a href="${repo.html_url}" target="_blank" style="text-decoration: none;">
                            <div class="repo-card">
                                <h3>${repo.name}</h3>
                                <p>${repo.description || 'Açıklama yok'}</p>
                                <div class="tags">
                                    ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                                    <span class="tag">⭐ ${repo.stargazers_count}</span>
                                    <span class="tag">🍴 ${repo.forks_count}</span>
                                </div>
                            </div>
                        </a>
                    `;
                    
                    repoList.appendChild(card);
                }
            });
        } catch (error) {
            console.error('GitHub API Error:', error);
            const repoList = document.getElementById('repo-list');
            repoList.innerHTML = '<div class="col-12 text-center"><p>Projeler yüklenirken bir hata oluştu.</p></div>';
        }
    };

    // Repoları yükle
    fetchGitHubRepos();

    // Typed.js başlatma
    new Typed('.lead', {
        strings: ['Computer Engineer', 'Full Stack Dev', 'Creative Thinker'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    });

    // Particles.js başlatma
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#2997ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2997ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2
            }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' }
            }
        }
    });

    // Scroll to top button
    const scrollTop = document.createElement('div');
    scrollTop.className = 'scroll-top';
    scrollTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(scrollTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
