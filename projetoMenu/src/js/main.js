// Função auxiliar para carregar componentes
async function loadComponent(element, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Falha ao carregar: ${path}`);
        element.innerHTML = await response.text();
    } catch (error) {
        console.error('Erro no Web Component:', error);
    }
}

class MyNavbar extends HTMLElement {
    connectedCallback() { loadComponent(this, './src/components/navbar.html'); }
}
class MyFooter extends HTMLElement {
    connectedCallback() { loadComponent(this, './src/components/footer.html'); }
}
class MyBanner extends HTMLElement {
    connectedCallback() { loadComponent(this, './src/components/banner.html'); }
}
class MyCollectionProducts extends HTMLElement {
    connectedCallback() { loadComponent(this, './src/components/collectionProducts.html'); }
}
class MyAnnouncement extends HTMLElement {
    connectedCallback() { loadComponent(this, './src/components/announcement.html'); }
}


// No seu src/js/main.js, adicione a definição para o banner
// Registro dos componentes
customElements.define('main-navbar', MyNavbar);
customElements.define('main-footer', MyFooter);
customElements.define('main-banner', MyBanner);
customElements.define('main-products', MyCollectionProducts);
customElements.define('main-announcement', MyAnnouncement);