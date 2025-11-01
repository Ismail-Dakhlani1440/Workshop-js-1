let collaborators = [];
let userStories = [];
let boardStories = [];
let storyIdCounter = 1;

/**
 * Fonction pour ajouter un nouveau collaborateur à l'équipe
 * TODO: 
 * - Récupérer la valeur du champ input avec l'id 'collaboratorName'
 * - Vérifier que le nom n'est pas vide et n'existe pas déjà dans le tableau 'collaborators'
 * - Ajouter le collaborateur au tableau 'collaborators'
 * - Vider le champ input
 * - Appeler updateCollaboratorsList() pour afficher la liste
 * - Appeler updateAssigneeSelect() pour mettre à jour le select d'assignation
 */
function addCollaborator() {
    // À IMPLÉMENTER
    const input = document.getElementById("collaboratorName");
    if (collaborators.includes(input.value) || !input.value) return;
    collaborators.push(input.value);
    updateCollaboratorsList();
    updateAssigneeSelect();
    input.value = "";
}


/**
 * Fonction pour afficher la liste des collaborateurs dans l'interface
 * TODO:
 * - Récupérer l'élément DOM avec l'id 'collaboratorsList'
 * - Générer du HTML pour chaque collaborateur (badges avec leur nom)
 * - Utiliser un style inline: background #667eea, color white, padding 8px 15px, border-radius 20px
 * - Injecter le HTML dans l'élément avec innerHTML
 */
function updateCollaboratorsList() {
let collabList= document.getElementById("collaboratorsList");
collabList.innerHTML+=`<span class="nameContainer">${collaborators[collaborators.length-1]}</span>`;
}


/**
 * Fonction pour mettre à jour la liste déroulante des assignés
 * TODO:
 * - Récupérer l'élément select avec l'id 'storyAssignee'
 * - Générer les options: une option "Non assigné" + une option par collaborateur
 * - Mettre à jour le select avec innerHTML
 */
function updateAssigneeSelect() {
    const assigne = document.getElementById("storyAssignee")
    assigne.innerHTML += `<option >${collaborators[collaborators.length - 1]}</option>`;
}

/**
 * Fonction pour créer une nouvelle User Story
 * TODO:
 * - Récupérer les valeurs des champs: storyTitle, storyDescription, storySprint, storyAssignee
 * - Vérifier que le titre et la description ne sont pas vides
 * - Créer un objet story avec: id (utiliser storyIdCounter++), title, description, sprint (parseInt), assignee, status: 'backlog'
 * - Ajouter la story au tableau 'userStories'
 * - Vider les champs titre et description
 * - Appeler renderSprintBacklog() pour actualiser l'affichage
 */
function addUserStory() {
    // À IMPLÉMENTER
    let storyAssignee = document.getElementById("storyAssignee")
    let storySprint = document.getElementById("storySprint")
    let storyTittle = document.getElementById("storyTitle")
    let storySprintSelected = '';
    let storyAssigneeSelected = '';
    storySprint.querySelectorAll('option').forEach(option => {
        if (option.selected) {
            storySprintSelected = parseInt(option.value)
        }
    })
    storyAssignee.querySelectorAll('option').forEach(option => {
        if (option.selected) {
            storyAssigneeSelected = option.innerText
        }
    })
    let storyDescription = document.getElementById("storyDescription")

    let story = {
        id: storyIdCounter,
        title: storyTittle.value,
        description: storyDescription.value,
        sprint: storySprintSelected,
        assignee: storyAssigneeSelected,
        status: 'backlog'
    }
    if (!storyTittle.value || !storyDescription.value) return;
    userStories.push(story)
    renderSprintBacklog()
    storyTittle.value = ""
    storyDescription.value = ""
    storyIdCounter++

}


/**
 * Fonction pour afficher le Sprint Backlog avec toutes les stories par sprint
 * TODO:
 * - Récupérer le conteneur avec l'id 'sprintBacklog'
 * - Pour chaque sprint (1, 2, 3):
 *   - Filtrer les stories du sprint avec status 'backlog'
 *   - Générer le HTML: conteneur sprint avec header (titre + bouton Start)
 *   - Pour chaque story: afficher titre, description, assigné
 *   - Si aucune story: afficher "Aucune story dans ce sprint"
 * - Injecter tout le HTML généré dans le conteneur
 */
function renderSprintBacklog() {
    const backlog=document.getElementById("sprintBacklog");
    let template = "";
for (let i= 1; i<4; i++){
    template+=`
            <div class="sprint-container">
                <div class="sprint-header">
                    <h3>Sprint ${i}</h3>
                    <button class="start-sprint-btn" onclick="startSprint(${i})">
                        ▶ Démarrer Sprint
                    </button>
                </div>
                <div class="sprint-stories">`;
    userStories.forEach(Element => {
    if(Element.status==='backlog' && Element.sprint===i){
    template+=`
        <div class="story-item">
            <strong>${Element.title}</strong>
            <p>${Element.description}</p>
            <small>Assigné à: ${Element.assignee}</small>
        </div>`
        }
})
template+=`</div> </div>`
}
backlog.innerHTML= template
}

/**
 * Fonction appelée lors du clic sur "Démarrer Sprint"
 * TODO:
 * - Filtrer toutes les stories du sprint demandé avec status 'backlog'
 * - Pour chaque story trouvée:
 *   - Changer son status à 'todo'
 *   - Ajouter la story au tableau 'boardStories'
 * - Retirer ces stories du tableau 'userStories'
 * - Appeler renderSprintBacklog() et renderBoard() pour mettre à jour l'affichage
 */
function startSprint(sprintNum) {
    userStories.forEach((story,index) => {
        if(story.status ==='backlog' && story.sprint=== sprintNum ){
            story.status = 'todo' 
            boardStories.push(story)
            userStories.splice(index,1)  
        }
    renderSprintBacklog()
    renderBoard()
})
}

/**
 * Fonction pour afficher toutes les cartes sur le SCRUM Board
 * TODO:
 * - Pour chaque colonne ('todo', 'in-progress', 'testing', 'done'):
 *   - Récupérer le conteneur de la colonne
 *   - Filtrer les stories avec le status correspondant depuis 'boardStories'
 *   - Si aucune story: afficher "Aucune carte"
 *   - Sinon générer une carte pour chaque story avec:
 *     - Titre, description, badge assigné
 *     - Boutons "Suivant" (sauf pour done), "Précédent" (sauf pour todo), "Supprimer"
 *   - Injecter le HTML dans le conteneur
 */
function renderBoard() {
    const statuses=['todo', 'in-progress', 'testing', 'done']
    statuses.forEach((status,index) => {
        let cardholder = document.querySelector(`.${status}`)
        let card = cardholder.children[1]
        console.log(card)
        boardStories.forEach(story => {
            if(story.status === status){
                let template="";
                template+=`
                <div class="card">
                    <h4>${story.title}</h4>
                    <p>${story.description}</p>
                    <span class="assignee">${story.assignee}</span>
                    <div class="card-actions">`
                if(story.status !== 'done'){
                    template+=
                            `<button class="move-btn" onclick="moveCard(${story.id}, ${statuses[index+1]})">Suivant →</button>`
                }
                if(story.status !== 'todo'){
                template+= 
                        `<button class="move-btn" onclick="moveCard(${story.id}, ${statuses[index-1]})">← Précédent</button>`
                }
                template+=
                        `<button class="delete-btn" onclick="deleteCard(${story.id})">Supprimer</button>
                    </div>
                </div>`
            card.innerHTML=template;
            }
        })
    })
}

/**
 * Fonction utilitaire pour obtenir le status suivant dans le workflow
 * TODO:
 * - Créer un objet avec les transitions: todo→in-progress, in-progress→testing, testing→done
 * - Retourner le status suivant selon le status actuel
 */
function getNextStatus(current) {
    // À IMPLÉMENTER
}

/**
 * Fonction utilitaire pour obtenir le status précédent dans le workflow
 * TODO:
 * - Créer un objet avec les transitions: in-progress→todo, testing→in-progress, done→testing
 * - Retourner le status précédent selon le status actuel
 */
function getPrevStatus(current) {
    // À IMPLÉMENTER
}

/**
 * Fonction pour déplacer une carte d'une colonne à une autre
 * TODO
 * - Trouver la story dans 'boardStories' avec l'id donné
 * - Modifier son status avec newStatus
 * - Appeler renderBoard() pour actualiser l'affichage
 */
function moveCard(id, newStatus) {
    
}

/**
 * Fonction pour supprimer une carte du board
 * TODO:
 * - Filtrer 'boardStories' pour retirer la story avec l'id donné
 * - Appeler renderBoard() pour actualiser l'affichage
 */
function deleteCard(id) {
    // À IMPLÉMENTER
}

// Initialisation
renderSprintBacklog();
renderBoard();
