import { Player } from "./player.js";
import { initToolTips } from "./tooltips.js";
//get current sections
const fileInput = document.getElementById("members-input");
const display = document.getElementById("members-display");

//add event listener for file input
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    //check for file, then parse the file to members, then sort by role to get the teams and then render them.
    if (file){
        console.log("File found.");
        console.log("File name:", file.name);

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const content = e.target.result;
            console.log("reading complete! Raw data:");
            console.log(content);

            const data = JSON.parse(content);
            const players = data.players.map(item =>{
                return new Player(
                    item.firstName,
                    item.lastName,
                    item.born,
                    item.nationality,
                    item.role,
                    item.number,
                    item.photo,
                    item.formerTeams
                );
            });
            console.log("members parsed:");
            console.dir(players);

            const playersSortedOnRole = Object.groupBy(players, (player) => player.role);

            renderPlayers(playersSortedOnRole);

            window.refreshElementSelect();
        };
        fileReader.readAsText(file);
    }
});

/*
Render function that renders the players:
Creates a section per role.
A div per section for the cards.
Then a player card per player of course.
Then the player cards are added to the cardgrid (the div),
and the section is added to the display.
*/
function renderPlayers(roles){
    display.innerHTML="";
    for(const role in roles){
        const section = document.createElement("section");
        section.className="team-section";
        section.innerHTML=`
            <div class="role-header-wrapper tooltip">
                <h2 class="team-section__title">${role}</h2>
                <span class="tooltiptext">This is the ${role} roster.</span>
            </div>
        `;

        const roster = document.createElement("div");
        roster.className="team-roster";

        roles[role].forEach(player =>{
            const playerCard = document.createElement("article");
            playerCard.className="player-card";

             const teamHTML = player.formerTeams.map(team => `
                <div class="player-card__team">
                    <span class=team__title>${team.title}</span>
                    <span class="team__info">Country: ${team.country}</span>
                    <span class="team__info">City: ${team.city}</span>
                </div>
            `).join("");

            playerCard.innerHTML=`
                <div class = player-card__top>
                    <img src="${player.photo}" alt="image of ${player.firstName} ${player.lastName}." class="player-card__photo">
                    <span class="player-card__number">#${player.number || "00"}</span>
                </div>
                <div class = player-card__body>
                    <h3 class="player-card__name">${player.firstName} ${player.lastName}</h3>
                    <div class=player-card__info>
                        <p><strong>Nationality:</strong> ${player.nationality}</p>
                        <p><strong>Born:</strong> ${player.born}</p>
                    </div>
                    <div class="player-card__teams">
                        <h4><strong>Team:</strong></h4>
                        ${teamHTML}
                    </div>
                </div>
            `;
            roster.appendChild(playerCard);
        });
        section.appendChild(roster);
        display.appendChild(section);
    };
    initToolTips();
}