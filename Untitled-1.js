document.addEventListener("DOMContentLoaded", () => {
    /* ============ MENU ============ */

    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const subPanel = document.getElementById('subPanel');
    const menuItems = document.querySelectorAll('.has-submenu');
    const subContents = document.querySelectorAll('.sub-content');

    // Ouvre le menu
    if (menuBtn && sideMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sideMenu.classList.add('active');
        });
    }

    // Ferme tout
    function closeAllMenus() {
        if (sideMenu) sideMenu.classList.remove('active');
        if (subPanel) subPanel.classList.remove('open');
        document.querySelectorAll('.sub-content').forEach(el => el.classList.remove('show'));
        menuItems.forEach(i => i.classList.remove('active-item'));
    }

    // Fermer via la croix
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeAllMenus();
        });
    }

    // Ouvrir les sous-menus
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = item.dataset.target;

            // Ouvre la colonne grise
            if (subPanel) subPanel.classList.add('open');

            // Cache tout puis montre le bon
            subContents.forEach(c => c.classList.remove('show'));
            const target = document.getElementById(targetId);
            if (target) target.classList.add('show');

            // Active l'élément sélectionné
            menuItems.forEach(i => i.classList.remove('active-item'));
            item.classList.add('active-item');
        });
    });

    // Clique hors menu → fermer
    document.addEventListener('click', (e) => {
        if (sideMenu && sideMenu.classList.contains('active')) {
            if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeAllMenus();
            }
        }
    });

    /* ============ SLIDER ============ */
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        if (slides.length === 0) return;
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        if (slides.length === 0) return;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Initialisation
    if (slides.length > 0) {
        slides.forEach(slide => {
            slide.addEventListener("click", () => {
                window.location.href = "index2.html";
            });
        });
        setInterval(nextSlide, 5000);
    }

    // Accessible depuis HTML
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
});


