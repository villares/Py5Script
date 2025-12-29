const ADJECTIVES = [
    "ancient", "autumn", "billowing", "bitter", "black", "blue", "bold",
    "broad", "broken", "calm", "cold", "cool", "crimson", "curly", "damp",
    "dark", "dawn", "delicate", "divine", "dry", "empty", "falling", "fancy",
    "flat", "floral", "fragrant", "frosty", "gentle", "green", "hidden",
    "holy", "icy", "jolly", "late", "lingering", "little", "lively", "long",
    "lucky", "misty", "morning", "muddy", "mute", "nameless", "noisy",
    "odd", "old", "orange", "patient", "plain", "polished", "proud",
    "purple", "quiet", "rapid", "raspy", "red", "restless", "rough",
    "round", "royal", "shiny", "shrill", "shy", "silent", "small", "snowy",
    "soft", "solitary", "sparkling", "spring", "square", "steep", "still",
    "summer", "super", "sweet", "throbbing", "tight", "tiny", "twilight",
    "wandering", "weathered", "white", "wild", "winter", "wispy", "withered",
    "yellow", "young"
];

const NOUNS = [
    "art", "band", "bar", "base", "bird", "block", "boat", "bonus",
    "bread", "breeze", "brook", "bush", "butterfly", "cake", "cell",
    "cherry", "cloud", "credit", "darkness", "dawn", "dew", "disk",
    "dream", "dust", "feather", "field", "fire", "firefly", "flower",
    "fog", "forest", "frog", "frost", "glade", "glitter", "grass",
    "hall", "hat", "haze", "heart", "hill", "king", "lab", "lake",
    "leaf", "limit", "math", "meadow", "mode", "moon", "morning",
    "mountain", "mouse", "mud", "night", "paper", "pine", "poetry",
    "pond", "queen", "rain", "recipe", "resonance", "river", "salad",
    "scene", "sea", "shadow", "shape", "silence", "sky", "smoke",
    "snow", "snowflake", "sound", "star", "sun", "sun", "sunset",
    "surf", "term", "thunder", "tooth", "tree", "truth", "union",
    "unit", "violet", "voice", "water", "water", "waterfall", "wave",
    "wild", "wind", "wood"
];

function generateProjectName() {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    const num = Math.floor(Math.random() * 1000);
    return `${adj}-${noun}-${num}`;
}

// Slugify helper if we let users rename later
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
}
