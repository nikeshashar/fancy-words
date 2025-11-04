# Fancy Words - Word of the Day

A beautiful, minimalist website that displays a new word to learn every day with a relaxing color palette.

## Features

- **Word of the Day**: Displays a different word each day based on date rotation
- **Split Layout**: Top half shows the word, bottom half shows the definition (scroll or press ↓ to view)
- **Relaxing Colors**: Each word gets a unique background color from a curated palette
- **Previous Words**: View all previously displayed words in a gallery
- **Color Copy**: Copy the hex code of the current background color

## Running Locally

Since the app loads a YAML file via JavaScript, you need to run a local web server (not just open the HTML file directly). Here are several options:

### Option 1: Python (Recommended - Easiest)

If you have Python installed:

```bash
# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 2: Node.js

If you have Node.js installed:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and go to: `http://localhost:8000`

### Option 3: VS Code Live Server

If you use VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: PHP

If you have PHP installed:

```bash
php -S localhost:8000
```

Then open your browser and go to: `http://localhost:8000`

## How to Use

1. Start a local server using one of the options above
2. Open `http://localhost:8000` in your browser
3. The word of the day will be displayed on the top half of the screen
4. Scroll down or press the down arrow key to see the definition
5. Click the copy button (📋) next to the hex code to copy the color
6. Click "View Previous Words" in the footer to see all words

## Adding Words

To add a new word, edit the `words.yaml` file and add entries in this format:

```yaml
words:
  - word: "Your Word"
    definition: "The definition of your word."
    date: "2024-01-15"
```

**Important Notes:**
- Each word needs a unique date (YYYY-MM-DD format)
- Words are sorted by date, and the word displayed each day is determined by rotating through all words based on the number of days since the first word's date
- The word shown on any given day is calculated as: `(days since first word) % (total number of words)`

## File Structure

- `index.html` - Main page with word of the day
- `previous.html` - Previous words gallery page
- `styles.css` - Styling for the website
- `script.js` - JavaScript for the main page
- `previous.js` - JavaScript for the previous words page
- `words.yaml` - YAML file containing all words and definitions

## Technical Details

- Uses vanilla JavaScript (no framework)
- Loads words from a YAML file using js-yaml library (loaded via CDN)
- Responsive design that works on mobile and desktop
- Smooth scrolling and keyboard navigation support
- Each word automatically gets assigned a color from the palette based on its index

