// Base de données simulée pour tester le design (MVP)
const jobsData = [
    {
        title: "Développeur Fullstack (React/Node)",
        company: "Startup Fintech Babi",
        location: "📍 Abidjan (Hybride)",
        salary: "💰 300 000 - 500 000 FCFA",
        type: "Dev",
        link: "#"
    },
    {
        title: "Monteur Vidéo / Motion Designer",
        company: "Agence Digitale PRO",
        location: "📍 Télétravail",
        salary: "💰 Sur devis / Freelance",
        type: "Design",
        link: "#"
    },
    {
        title: "Développeur Front-End Senior",
        company: "Tech Europe",
        location: "🌍 Remote (100% Télétravail)",
        salary: "💰 €1500 - €2500 / mois",
        type: "Remote",
        link: "#"
    },
    {
        title: "Intégrateur HTML/CSS / PHP",
        company: "Cabinet Conseil",
        location: "📍 Cocody, Abidjan",
        salary: "💰 150 000 - 250 000 FCFA",
        type: "Dev",
        link: "#"
    }
];

// Fonction pour afficher les jobs
function displayJobs(category) {
    const grid = document.getElementById('jobs-grid');
    grid.innerHTML = ''; // On vide la grille

    // Filtrage automatique
    const filteredJobs = category === 'All' 
        ? jobsData 
        : jobsData.filter(job => job.type === category);

    // Création des cartes
    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card'; // Nouvelle classe

            card.innerHTML = `
                <div class="company">${job.company}</div>
                <h3>${job.title}</h3>
                <p class="location">${job.location}</p>
                <p class="salary">${job.salary}</p>
                <a href="${job.link}" class="apply-btn">Postuler maintenant</a>`;
            grid.appendChild(card);
        });
}

// Lancer l'affichage au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    displayJobs('All');
});

// Relier les boutons de filtre à la fonction
window.filterJobs = displayJobs;