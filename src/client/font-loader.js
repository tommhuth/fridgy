import FontFaceObserver from "fontfaceobserver"

const helvetica700 = new FontFaceObserver("Neue Helvetica W01", { weight: 700 }).load()
const helvetica400 = new FontFaceObserver("Neue Helvetica W01", { weight: 400 }).load()
const didotItalic = new FontFaceObserver("Linotype Didot W01", { style: "italic" }).load()

async function load() {
    try {
        await Promise.all([helvetica700, helvetica400, didotItalic])

        document.documentElement.className += "fonts-loaded"
    } catch (e) {
        // oh no! only fallback fonts
    }
}

load()