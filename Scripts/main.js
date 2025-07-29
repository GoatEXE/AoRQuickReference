document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("manifest.json");
    const manifest = await response.json();

    const rulesReferenceSection = document.getElementById("rules-reference").querySelector(".row");

    for (const entry of manifest) {
        const mdResponse = await fetch(entry.file);
        const mdText = await mdResponse.text();

        // Parse markdown into sections
        const sections = [];
        const lines = mdText.split("\n");
        let currentSection = null;

        for (let line of lines) {
            if (line.startsWith("# ")) {
                if (currentSection) {
                    sections.push(currentSection);
                }
                currentSection = {
                    title: line.replace("# ", "").trim(),
                    items: []
                };
            } else if (line.startsWith("- ")) {
                if (currentSection) {
                    currentSection.items.push(line.slice(2).trim());
                }
            }
        }
        if (currentSection) {
            sections.push(currentSection);
        }

        // Build the card
        const cardCol = document.createElement("div");
        cardCol.className = "col-lg-6 col-md-12 mb-4";

        const card = document.createElement("div");
        card.className = "card h-100";

        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        cardHeader.innerHTML = `<h5 class="mb-0"><i class="${entry.icon}"></i> ${entry.title}</h5>`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const accordionId = `${entry.title.replace(/\s+/g, "")}Accordion`;
        const accordion = document.createElement("div");
        accordion.className = "accordion";
        accordion.id = accordionId;

        sections.forEach((section, index) => {
            const sectionId = `${accordionId}-section${index}`;

            const item = document.createElement("div");
            item.className = "accordion-item";
            item.innerHTML = `
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#${sectionId}">
                        ${section.title}
                    </button>
                </h2>
                <div id="${sectionId}" class="accordion-collapse collapse"
                    data-bs-parent="#${accordionId}">
                    <div class="accordion-body">
                        <ul>
                            ${section.items.map((item) => `<li>${item}</li>`).join("")}
                        </ul>
                    </div>
                </div>
            `;

            accordion.appendChild(item);
        });

        cardBody.appendChild(accordion);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardCol.appendChild(card);
        rulesReferenceSection.appendChild(cardCol);
    }
});
