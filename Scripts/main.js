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

    // Create a unique collapse ID for this card's body
    const collapseId = `${entry.title.replace(/\s+/g, "")}Collapse`;

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.setAttribute("data-bs-toggle", "collapse");
    cardHeader.setAttribute("data-bs-target", `#${collapseId}`);
    cardHeader.setAttribute("aria-expanded", "false");
    cardHeader.setAttribute("aria-controls", collapseId);
    cardHeader.style.cursor = "pointer";
    cardHeader.innerHTML = `<h5 class="mb-0" id="${entry.title}"><i class="${entry.icon}"></i> ${entry.title}</h5>`;

    const cardBodyWrapper = document.createElement("div");
    cardBodyWrapper.className = "collapse";
    cardBodyWrapper.id = collapseId;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Accordion stays inside card body
    const accordionId = `${entry.title.replace(/\s+/g, "")}Accordion`;
    const accordion = document.createElement("div");
    accordion.className = "accordion";
    accordion.id = accordionId;

    // Add accordion items
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
    cardBodyWrapper.appendChild(cardBody);

    card.appendChild(cardHeader);
    card.appendChild(cardBodyWrapper);
    cardCol.appendChild(card);
    rulesReferenceSection.appendChild(cardCol);
    }
    
    // Create a dropdown menu for this entry
    const menu = document.querySelector(".dropdown-menu"); // Assumes only one dropdown

    for (const entry of manifest) {
        const menuItem = document.createElement("li");
        const link = document.createElement("a");
        link.className = "dropdown-item";
        link.href = "#"+entry.title; // Assumes your card headers have id=entry.title
        link.textContent = entry.title;
        link.onclick = (e) => {
            e.preventDefault();
            scrollToSection(entry.title);
        };
        menuItem.appendChild(link);
        menu.appendChild(menuItem);
    }
});

function changeBackground(imageURL) {
    document.documentElement.style.setProperty('--bg-image', `url('${imageURL}')`);
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const yOffset = -250; // Adjust to match your navbar height
    const element = document.getElementById(sectionId);
    if (!element) return;

    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });

    // Collapse the navbar if it's open (mobile)
    const navbarCollapse = document.querySelector('.navbar-collapse.show');
    if (navbarCollapse) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
    }

    // Collapse any open dropdowns
    const dropdown = document.querySelector('.nav-item.dropdown.show');
    if (dropdown) {
        const dropdownToggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
        if (dropdownToggle) {
            dropdownToggle.click(); // Bootstrap handles toggling
        }
    }
}

