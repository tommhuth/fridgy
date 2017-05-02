import FontFaceObserver from "fontfaceobserver"
import LocalStorage from "./data/LocalStorage"

const key = "fridgy-fonts-loaded"
const helvetica700 = new FontFaceObserver("Neue Helvetica W01", { weight: 700 }).load()
const helvetica400 = new FontFaceObserver("Neue Helvetica W01", { weight: 400 }).load()
const didotItalic = new FontFaceObserver("Linotype Didot W01", { style: "italic" }).load()

async function load() {
    try {
        await Promise.all([helvetica700, helvetica400, didotItalic])

        document.documentElement.className = "fonts-loaded"
        LocalStorage.set(key, true)
    } catch(e) {
        // oh no! only fallback fonts
        LocalStorage.remove(key)
    }
}

if (!LocalStorage.get(key)) {
    load()
} else {
    document.documentElement.className = "fonts-loaded"
}
