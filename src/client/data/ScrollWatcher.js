export default class ScrollWatcher {
    static isScrolling = false 

    static watch() { 
        let tid  = null

        // the only thing that wil scroll here is
        // the body element, no nested touch scrolling
        window.addEventListener("scroll", () => {
            this.isScrolling = true

            clearTimeout(tid)
            tid = setTimeout(() => this.isScrolling = false, 200)
        })
    }
}

ScrollWatcher.watch()
