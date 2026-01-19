const batchDatabase = {
    "AP2026-01": {
        title: "The Ancient Protector",
		subTitle: "HONEY • GARLIC • GINGER",
        born: "2025-12-28",
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
	 "GI2025-01": {
	    title: "Golden Immunity Elixir",
	    born: "2026-01-19",
	    honey: "Wildflower Raw Honey",
	    notes: "A potent sun-colored blend. The heat of Clove and Ginger is used here to 'unfold' the turmeric, while Black Pepper ensures every drop is absorbed.",
	    science: [
		        { 
		            tag: "Bio-Activation", 
		            title: "The Piperine Bodyguard", 
		            text: "Turmeric's Curcumin is hard to absorb alone. Black Pepper (Piperine) acts as a bodyguard, increasing Turmeric absorption by up to 2,000%." 
		        },
		        { 
		            tag: "Circulatory Heat", 
		            title: "The Clove Catalyst", 
		            text: "Clove and Ginger stimulate blood flow, acting as a delivery system to carry the golden antioxidants to your furthest extremities." 
		        },
		        { 
		            tag: "DNA Shielding", 
		            title: "Polyphenol Armor", 
		            text: "This blend is rich in polyphenols that shield your cells from oxidative stress, acting like a protective coat of armor for your genetic code." 
		        }
		    ]
		},
	"RR2026-01": {
		    title: "Rooted Resilience (Vetiver & 5-Herb Essence)",
		    born: "2026-01-19",
		    honey: "Forest Amber Honey",
		    notes: "A cooling infusion of Vetiver roots fortified with the 'N5 Complex' (3 Nirmal + 2 Rasila botanicals). Designed for deep stillness.",
		    science: [
		        { 
		            tag: "Nervine Tonic", 
		            title: "The Neural Soother", 
		            text: "Vetiver compounds interact with the nervous system to lower cortisol and ground your energy." 
		        },
		        { 
		            tag: "Thermoregulation", 
		            title: "The Internal Cooler", 
		            text: "Acting as a natural refrigerant, this blend helps lower 'Pitta' or internal heat at a cellular level." 
		        },
		        { 
		            tag: "Phyto-Synergy", 
		            title: "The N5 Catalyst", 
		            text: "A precise ratio of 3 clarifying (Nirmal) and 2 hydrating (Rasila) herbs creates a bio-available bridge, driving nutrients into deep tissues." 
		        }
		    ]
		}
};
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const batchId = urlParams.get('batch');
    const data = batchDatabase[batchId];

	// Check if the batch exists in our JSON
    if (!batchId || !data) {
        showErrorState();
        return; // Stop the script here
    }

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

function showErrorState() {
    // 1. Update Headings
    document.getElementById('main-heading').innerText = "Unknown Batch";
    document.getElementById('page-title').innerText = "Batch Not Found";

    // 2. Clear the Batch Card and show Error Message
    const batchCard = document.getElementById('main-batch-card');
    batchCard.style.border = "1px solid #ffccd5";
    batchCard.style.background = "#fff5f5";
    
    batchCard.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
            <h3 style="color: #d9534f; margin: 0;">Batch Not Found</h3>
            <p><small>This QR code might be outdated or the batch ID is incorrect.</small></p>
            <hr style="border: 0.5px dashed #ffccd5; margin: 15px 0;">
            <p style="font-size: 0.8rem; color: #666;">If you believe this is an error, please check the ID on your jar label or contact the Vinter.</p>
            <button onclick="window.location.href='index.html'" style="background: #5d4037; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                Back to Home
            </button>
        </div>
    `;

    // 3. Hide the Science Grid so the page doesn't look broken
    document.getElementById('science-grid').innerHTML = `
        <p style="text-align: center; grid-column: 1/-1; color: #999;">
            Science data is unavailable for this ID.
        </p>
    `;
}


window.onload = init;
