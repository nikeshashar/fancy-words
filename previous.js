// Relaxing color palette (same as main page)
const colorPalette = [
    '#A8D8EA', // Soft sky blue
    '#AA96DA', // Lavender
    '#FCBAD3', // Soft pink
    '#FFFFD2', // Light yellow
    '#C7CEEA', // Periwinkle
    '#B5EAD7', // Mint green
    '#FFD3A5', // Peach
    '#FD9853', // Coral
    '#A8E6CF', // Seafoam
    '#DDA0DD', // Plum
    '#FFEAA7', // Warm yellow
    '#DFE7F2', // Powder blue
    '#F5B7B1', // Dusty rose
    '#AED6F1', // Light blue
    '#F8BBD0', // Blush pink
    '#D4E6F1', // Baby blue
];

let wordsData = [];

// Load words from YAML file
async function loadWords() {
    try {
        const response = await fetch('words.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        wordsData = data.words || [];
        
        if (wordsData.length === 0) {
            document.getElementById('wordsGrid').innerHTML = 
                '<div class="empty-state">No words found in words.yaml</div>';
            return;
        }
        
        // Sort words by date (newest first)
        wordsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        displayPreviousWords();
    } catch (error) {
        console.error('Error loading words:', error);
        document.getElementById('wordsGrid').innerHTML = 
            '<div class="empty-state">Error loading words. Please check the words.yaml file.</div>';
    }
}

// Display previous words
function displayPreviousWords() {
    const wordsGrid = document.getElementById('wordsGrid');
    
    if (wordsData.length === 0) {
        wordsGrid.innerHTML = '<div class="empty-state">No words to display</div>';
        return;
    }
    
    // Get current word index to determine which words are "previous"
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const firstWordDate = new Date(wordsData[wordsData.length - 1].date);
    firstWordDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today - firstWordDate) / (1000 * 60 * 60 * 24));
    const currentIndex = daysDiff % wordsData.length;
    
    // Show all words, but mark which ones are "previous" (before current)
    const sortedWords = [...wordsData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    wordsGrid.innerHTML = sortedWords.map((wordData, index) => {
        // Use color from YAML if available, otherwise fall back to palette
        const color = wordData.color || colorPalette[index % colorPalette.length];
        
        const date = new Date(wordData.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return `
            <div class="word-card" style="background: ${color}40; border-color: ${color}60;">
                <h2>${wordData.word}</h2>
                <p class="definition">${wordData.definition}</p>
                <p class="date">${formattedDate}</p>
            </div>
        `;
    }).join('');
    
    // Set a neutral relaxing background color
    document.getElementById('previousContainer').style.backgroundColor = '#E8F4F8';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWords();
});

