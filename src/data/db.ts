import Dexie, { EntityTable } from "dexie"

export interface Product {
    id: number;
    name: string;
    slug: string;
    amount: number;
    unitType: "unit" | "g" | "ml";
    createdAt: number;
    productType: string
    updatedAt: number
}

export interface ProductType {
    id: number
    name: string
}

interface DB extends Dexie {
    products: EntityTable<Product, "id">
    productTypes: EntityTable<ProductType, "id">
}

export const db = new Dexie("fridgie") as DB

db.version(1).stores({
    products: "++id, slug, name, amount, createdAt, updatedAt, productType",
    productTypes: "++id, name",
})

export function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, "") // trim leading/trailing white space
    str = str.toLowerCase() // convert string to lowercase
    str = str.replaceAll("æ", "ae")
    str = str.replaceAll("å", "a")
    str = str.replaceAll("ø", "o")
    str = str.replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-") // remove consecutive hyphens

    return str
}

export function getLastNumber(slug: string): number {
    const match = slug.match(/-(\d+)$/)

    return match ? parseInt(match[1], 10) : 1
}

export async function getSlug(name: string) {
    const products = await db.products.where("name")
        .equalsIgnoreCase(name.trim())
        .toArray()

    if (!products.length) {
        return name
    }

    const currentIds = products.map(product => getLastNumber(product.slug))
        .sort()
        .reverse()

    return `${name}-${currentIds[0] + 1}`
}

export function getProductBySlug(slug: string) {
    return db.products.where("slug").equals(slug).first()
}

export function getAllProducts(type?: string) {
    if (type) {
        return db.products.where("type").equalsIgnoreCase(type).toArray()
    }

    return db.products.toArray()
}

export async function getAllProductTypes() {
    let types = await db.productTypes.toArray()

    return types.sort((a, b) => a.name.localeCompare(b.name))
}