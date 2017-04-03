export default class LocalStorage {
    static set(key, value) {
        value = typeof value === "object" ? JSON.stringify(value) : value

        try {
            window.localStorage.setItem(key, value)
        } catch (e) {
            // nothing to do here
        }
    }

    static get(key) {
        try {
            let value: any = window.localStorage.getItem(key)

            try {
                return JSON.parse(value)
            } catch (e) {
                return value
            }
        } catch (e) {
            return null
        }
    } 
    
    static remove(key) {
        try {
            window.localStorage.removeItem(key)
        } catch (e) {
            // nothing to do here
        }
    } 
}