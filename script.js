const API_KEY = 'b9452ac9930b4bb1bf7289d15342ab8e'; 
const heroContainer = document.getElementById('hero-article');
const newsGrid = document.getElementById('news-grid');

// Éléments de la Modale
const modal = document.getElementById('articleModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// LA VARIABLE GLOBALE POUR SAUVER LES ARTICLES
let currentArticles = [];

// 1. RÉCUPÉRATION DES NEWS
async function getTechNews(userInput = "") {
    const globalTech = '(Nvidia OR OpenAI OR "Artificial Intelligence" OR "Silicon Valley" OR Apple OR Tesla OR "Web3" OR "Crypto")';
    const localTech = ' OR (startup OR fintech OR "numérique" AND Africa)';
    
    let finalQuery = `(${globalTech}${localTech})`;

    if (userInput.trim() !== "") {
        finalQuery = `(${userInput}) AND ${finalQuery}`;
    }

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(finalQuery)}&sortBy=relevancy&language=fr&pageSize=13&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            // On sauvegarde les articles en mémoire !
            currentArticles = data.articles;
            displayArticles();
        } else {
            heroContainer.innerHTML = "<p>Aucun résultat.</p>";
            newsGrid.innerHTML = "";
        }
    } catch (error) {
        console.error("Erreur API :", error);
    }
}

// 2. FONCTION POUR OUVRIR LE MODE LECTURE (AVEC IFRAME)
window.openArticle = function(index) {
    const article = currentArticles[index];

    // On remplace le texte coupé par une Iframe (un navigateur dans ton site)
    modalBody.innerHTML = `
        <div style="margin-bottom: 15px;">
            <h2 style="font-size: 1.5rem; margin-bottom: 5px;">${article.title}</h2>
            <span style="background: #eee; padding: 5px 10px; border-radius: 5px; font-size: 0.8rem; font-weight: bold;">
                Source officielle : ${article.source.name}
            </span>
        </div>
        
        <div style="position: relative; width: 100%; height: 60vh; border-radius: 10px; overflow: hidden; border: 1px solid #ddd;">
            <iframe src="${article.url}" width="100%" height="100%" frameborder="0" style="background: #f4f4f4;"></iframe>
        </div>
        
        <div style="margin-top: 15px; text-align: right;">
            <a href="${article.url}" target="_blank" style="color: #FF9900; font-weight: bold; text-decoration: none; font-size: 0.9rem;">
                Ouvrir dans un nouvel onglet ↗
            </a>
        </div>
    `;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Bloque le scroll derrière
};

// 3. AFFICHAGE DES ARTICLES
function displayArticles() {
    if (currentArticles.length === 0) return;

    // Article à la Une (Index 0)
    const top = currentArticles[0];
    heroContainer.innerHTML = `
        <div class="hero-card" onclick="openArticle(0)">
            <img src="${top.urlToImage || 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200'}" alt="">
            <div class="hero-overlay">
                <span>À LA UNE</span>
                <h2>${top.title}</h2>
                <p>${top.description ? top.description.substring(0, 160) : 'L\'actu tech en direct.'}...</p>
            </div>
        </div>
    `;

    // Grille (Index 1 à 12)
    const otherStories = currentArticles.slice(1);
    newsGrid.innerHTML = otherStories.map((article, index) => `
        <article class="card" onclick="openArticle(${index + 1})">
            <img src="${article.urlToImage || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400'}" alt="">
            <div class="card-content">
                <h3>${article.title}</h3>
                <span class="btn-read" style="cursor:pointer; color:#FF9900; font-weight:bold;">LIRE LE RÉSUMÉ</span>
            </div>
        </article>
    `).join('');
}

// 4. FERMETURE DE LA MODALE
closeModal.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

// 5. RECHERCHE ET DÉMARRAGE
document.getElementById('searchBtn').addEventListener('click', () => {
    getTechNews(document.getElementById('searchInput').value);
});

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getTechNews(e.target.value);
});

getTechNews();




// Fonction pour gérer les catégories
function filterTech(category) {
    // 1. Gérer l'apparence des boutons (lequel est actif)
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // On met en gras le bouton cliqué (on utilise l'événement pour trouver le bouton)
    event.target.classList.add('active');

    // 2. Lancer la recherche spécifique
    let query = "";
    if (category === 'IA') query = "Intelligence Artificielle OR OpenAI OR ChatGPT";
    else if (category === 'Fintech') query = "Fintech OR Mobile Money OR Wave OR Orange Money";
    else if (category === 'Crypto') query = "Bitcoin OR Crypto OR Web3 OR Blockchain";
    else if (category === 'Startup') query = "Startup Afrique OR Levée de fonds Africa";
    else query = ""; // 'all' recharge la configuration par défaut

    getTechNews(query);
}