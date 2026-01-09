const batchDatabase = {
    "AP2026-01": {
        title: "The Ancient Protector",
		subTitle: "HONEY • GARLIC • GINGER",
        born: "2025-01-01",
        honey: "Wildflower Raw Honey",
        notes: "Standard garlic-ginger ratio.",
        science: [
            { tag: "Immunomodulation", title: "Tiny Soldiers", text: "Allicin tells white blood cells to be more alert." },
            { tag: "Anti-Inflammatory", title: "The Fire Extinguisher", text: "Gingerols block inflammatory pathways." }
        ]
    },
    "LZ2026-01": {
        title: "Lemon Zest Immunity",
		subTitle: "",
        born: "2026-01-08",
        honey: "Clover Honey",
        notes: "Added fresh lemon zest and Ceylon cinnamon.",
        science: [
            { tag: "Vitamin C", title: "The Shield", text: "Citric acid stabilizes the honey and boosts cell defense." },
            { tag: "Metabolism", title: "Sugar Manager", text: "Cinnamon helps cells manage glucose efficiently." }
        ]
    },
	 "TP2025-28": {
        title: "GOLDEN IMMUNITY ELIXIR",
		subTitle: "Natural Remedy",
        born: "2025-12-28",
        honey: "Clover Honey",
        notes: "Added fresh lemon zest and Ceylon cinnamon.",
        science: [
            { tag: "Vitamin C", title: "The Shield", text: "Citric acid stabilizes the honey and boosts cell defense." },
            { tag: "Metabolism", title: "Sugar Manager", text: "Cinnamon helps cells manage glucose efficiently." }
        ]
    }
};
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const batchId = urlParams.get('batch');
    
    // Default to AP2026-01 if ID is missing or wrong
    const data = batchDatabase[batchId] || batchDatabase["AP2026-01"];

    // 1. Update Headings & IDs
    document.title = data.title;
    document.getElementById('main-heading').innerText = data.title;
    document.getElementById('batch-tag').innerText = `#${batchId || 'PROTOTYPE'}`;
    //document.getElementById('form-batch-id').value = batchId || 'UNKNOWN';

    // 2. Calculate Age
    const birthDate = new Date(data.born);
    const today = new Date();
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.ceil(Math.abs(new Date() - new Date(data.born)) / (1000 * 60 * 60 * 24)); 
    
    // 3. Logic for Progress, Colors, and Pulse Speed
    let progress = Math.min((diffDays / 21) * 100, 100);
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progress + "%";
    
    let phase, color, flowClass, explanation;

    if (diffDays <= 7) {
        phase = "🌱 Infusing";
        color = "#DAA520";
        flowClass = "flow-fast"; 
        explanation = "The honey is drawing out active juices. Movement is rapid as osmosis takes place.";
    } else if (diffDays <= 14) {
        phase = "⚡ Peak Activity";
        color = "#B22222"; 
        flowClass = "flow-hyper"; 
        explanation = "Maximum biological activity. The probiotics are circulating rapidly through the jar.";
    } else {
        phase = "🛡️ Fully Matured";
        color = "#2E7D32"; // Deep green for the badge
        flowClass = "flow-slow"; // Calm breathing
        explanation = "The tonic has reached a deep state of rest and stability.";
    }

    // Apply UI Updates
    const badge = document.getElementById('phase-status');
    badge.innerText = phase;
    badge.style.background = color;
    
    // Apply the Flow Speed
    progressBar.className = flowClass;

    document.getElementById('phase-explanation').innerHTML = `<strong>Status:</strong> ${explanation}`;
    document.getElementById('age-counter').innerHTML = `
        <h2 style="color:${color}; margin:0; font-size: 2.5rem;">${diffDays} <small style="font-size: 1rem;">Days Old</small></h2>
    `;

    document.getElementById('batch-info').innerHTML = `
        <strong>Honey Base:</strong> ${data.honey}<br>
        <strong>Vinter's Note:</strong> ${data.notes}
    `;

    // 5. Inject Science Cards
    const grid = document.getElementById('science-grid');
    grid.innerHTML = data.science.map(s => `
        <div class="card" style="margin-bottom:0; border-top: 3px solid ${color};">
            <span class="benefit-tag" style="background:${color}">${s.tag}</span><br>
            <strong style="display:block; margin-top:5px;">${s.title}</strong>
            <p><small>${s.text}</small></p>
        </div>
    `).join('');

    // 6. Safety Check Note
    if (diffDays < 3) {
        const safetyNote = document.createElement('div');
        safetyNote.style = "background:#fff3cd; padding:12px; border-radius:8px; margin-top:15px; font-size:0.75rem; border:1px solid #ffeeba; color: #856404;";
        safetyNote.innerHTML = "⚠️ <strong>Vinter's Safety Tip:</strong> This jar is very young. Pressure is building! Open slowly to let the bubbles breathe.";
        document.getElementById('main-batch-card').appendChild(safetyNote);
    }
}

 function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tab-link");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }

window.onload = init;