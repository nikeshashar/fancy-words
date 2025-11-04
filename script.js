// Relaxing color palette
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
let currentWordIndex = 0;

// Load words from YAML file
async function loadWords() {
    try {
        const response = await fetch('words.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        wordsData = data.words || [];
        
        if (wordsData.length === 0) {
            console.error('No words found in YAML file');
            return;
        }
        
        // Sort words by date
        wordsData.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        displayWordOfTheDay();
    } catch (error) {
        console.error('Error loading words:', error);
        document.getElementById('wordDisplay').textContent = 'Error loading words';
        document.getElementById('definitionDisplay').textContent = 'Please check the words.yaml file';
    }
}

// Check if a color is light (returns true if light, false if dark)
function isLightColor(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return true if luminance is greater than 0.5 (light color)
    return luminance > 0.5;
}

// Get the word for today - only show word that matches today's date
function getWordOfTheDay() {
    if (wordsData.length === 0) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find word that matches today's date
    const todayStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    const wordForToday = wordsData.find(word => word.date === todayStr);
    
    if (wordForToday) {
        currentWordIndex = wordsData.indexOf(wordForToday);
        return wordForToday;
    }
    
    // If no word matches today's date, return null (or first word as fallback)
    return null;
}

// Display the word of the day
function displayWordOfTheDay() {
    const wordData = getWordOfTheDay();
    
    if (!wordData) {
        document.getElementById('wordDisplay').textContent = 'No word for today';
        document.getElementById('definitionDisplay').textContent = 'Please add a word with today\'s date to words.yaml';
        return;
    }
    
    // Display word and definition
    document.getElementById('wordDisplay').textContent = wordData.word;
    document.getElementById('definitionDisplay').textContent = wordData.definition;
    
    // Use color from YAML if available, otherwise fall back to palette
    const selectedColor = wordData.color || colorPalette[currentWordIndex % colorPalette.length];
    
    // Apply color to both sections
    document.getElementById('wordSection').style.backgroundColor = selectedColor;
    document.getElementById('meaningSection').style.backgroundColor = selectedColor;
    
    // Determine text color based on background brightness
    const isLight = isLightColor(selectedColor);
    const textColor = isLight ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    const textColorSecondary = isLight ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)';
    const textColorTertiary = isLight ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)';
    const borderColor = isLight ? 'rgba(30, 30, 30, 0.2)' : 'rgba(255, 255, 255, 0.2)';
    const buttonBg = isLight ? 'rgba(30, 30, 30, 0.1)' : 'rgba(255, 255, 255, 0.15)';
    const buttonBorder = isLight ? 'rgba(30, 30, 30, 0.3)' : 'rgba(255, 255, 255, 0.3)';
    
    // Apply text colors
    document.getElementById('wordDisplay').style.color = textColor;
    document.getElementById('definitionDisplay').style.color = textColorSecondary;
    document.querySelector('.hint').style.color = textColorTertiary;
    document.querySelector('.color-label').style.color = textColorTertiary;
    document.getElementById('hexCode').style.color = textColor;
    document.getElementById('hexCode').style.background = isLight ? 'rgba(30, 30, 30, 0.1)' : 'rgba(255, 255, 255, 0.1)';
    document.getElementById('copyBtn').style.color = textColor;
    document.getElementById('copyBtn').style.background = buttonBg;
    document.getElementById('copyBtn').style.borderColor = buttonBorder;
    document.querySelector('.footer').style.borderColor = borderColor;
    
    // Update hex code display
    document.getElementById('hexCode').textContent = selectedColor;
}

// Copy hex code to clipboard
function copyHexCode() {
    const hexCode = document.getElementById('hexCode').textContent;
    navigator.clipboard.writeText(hexCode).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault();
        const meaningSection = document.getElementById('meaningSection');
        meaningSection.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        e.preventDefault();
        const wordSection = document.getElementById('wordSection');
        wordSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWords();
    
    // Set up copy button
    document.getElementById('copyBtn').addEventListener('click', copyHexCode);
    
    // Set up keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
});

