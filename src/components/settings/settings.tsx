import { HTMLProductForm } from "@components/products/products"
import { db, getAllProductTypes, getSlug, Product, ProductType } from "@data/db"
import { useLiveQuery } from "dexie-react-hooks"
import { Link, useLoaderData } from "react-router"

const types = [
    "Drinks", "Snacks", "Dinner", "Dessert", "Condiments", "Fruit"
]
const products: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">[] = [
    {
        name: "Chicken wings",
        productType: "Dinner",
        amount: 450,
        unitType: "g"
    },
    {
        name: "Popcorn chicken",
        productType: "Dinner",
        amount: 250,
        unitType: "g"
    },
    {
        name: "Strawberry milk",
        productType: "Drinks",
        amount: 200,
        unitType: "ml"
    },
    {
        name: "Strawberries",
        productType: "Fruit",
        amount: 300,
        unitType: "g"
    },
    {
        name: "Ketchup",
        productType: "Condiments",
        amount: 300,
        unitType: "g"
    },
    {
        name: "Orange juice",
        productType: "Drinks",
        amount: 700,
        unitType: "ml"
    },
    {
        name: "Apples",
        productType: "Fruit",
        amount: 3,
        unitType: "unit"
    },
    {
        name: "Orange marmalade",
        productType: "Condiments",
        amount: 150,
        unitType: "ml"
    },
    {
        name: "Yogurt",
        productType: "Snacks",
        amount: 300,
        unitType: "ml"
    },
    {
        name: "Chocolate pudding",
        productType: "Dessert",
        amount: 150,
        unitType: "ml"
    },
    {
        name: "Frozen salmon",
        productType: "Dinner",
        amount: 200,
        unitType: "g"
    },
    {
        name: "Frozen peas",
        productType: "Dinner",
        amount: 0,
        unitType: "g"
    },
    {
        name: "Cut watermelon",
        productType: "Fruit",
        amount: 0,
        unitType: "g"
    },
    {
        name: "Potatoes",
        productType: "Dinner",
        amount: 4,
        unitType: "unit"
    },
    {
        name: "Carrots",
        productType: "Dinner",
        amount: 2,
        unitType: "unit"
    },
    {
        name: "Cucumber",
        productType: "Dinner",
        amount: 1,
        unitType: "unit"
    },
    {
        name: "Squash",
        productType: "Dinner",
        amount: 1,
        unitType: "unit"
    },
    {
        name: "Rice",
        productType: "Dinner",
        amount: 550,
        unitType: "g"
    },
    {
        name: "Mustard",
        productType: "Condiments",
        amount: 175,
        unitType: "g"
    },
    {
        name: "Lemons",
        productType: "Dinner",
        amount: 2,
        unitType: "unit"
    },
    {
        name: "Bananas",
        productType: "Snacks",
        amount: 3,
        unitType: "unit"
    },
    {
        name: "Chocolate chip cookies",
        productType: "Snacks",
        amount: 200,
        unitType: "g"
    },
    {
        name: "Mashed potato mix",
        productType: "Dinner",
        amount: 2,
        unitType: "unit"
    },
    {
        name: "Chocolate milk",
        productType: "Drinks",
        amount: 300,
        unitType: "ml"
    },
    {
        name: "Bacardi Breezer Orange",
        productType: "Drinks",
        amount: 1,
        unitType: "unit"
    },
    {
        name: "Bacardi Breezer Peach",
        productType: "Drinks",
        amount: 0,
        unitType: "unit"
    },
    {
        name: "Vodka",
        productType: "Drinks",
        amount: 1,
        unitType: "unit"
    },
    {
        name: "Peach lemonade",
        productType: "Drinks",
        amount: 1,
        unitType: "unit"
    },
]

export default function Settings(props) {
    const data = useLoaderData<ProductType[]>();
    const productTypes = useLiveQuery(async () => {
        return getAllProductTypes()
    }, []);

    return (
        <div className="container page">
            <p
                style={{
                    position: "relative",
                    paddingBottom: "1em",
                    marginBottom: "1.5em",
                    borderBottom: "1px dashed gray",
                    display: "flex",
                    placeContent: "space-between"
                }}
            >
                <Link to="/">&larr; Products</Link>
            </p>

            <h1>Settings</h1>

            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    let form = e.currentTarget
                    let elements = form.elements as HTMLProductForm
                    let name = elements.name.value.trim()

                    await db.productTypes.add({
                        name
                    })
                    form.reset()
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em"
                }}
            >
                <fieldset style={{ padding: "1em 1em .25em" }}>
                    <legend>Product types</legend>

                    <div
                        style={{ display: "flex", gap: "1em" }}
                    >
                        <label>
                            <span className="visually-hidden">New</span> <input type="text" name="name" required />
                        </label>

                        <button type="submit">
                            Add
                        </button>
                    </div>

                    <ul>
                        {(productTypes || data).map(i => {
                            return (
                                <li
                                    style={{
                                        paddingBlock: ".75em",
                                        borderTop: "1px solid lightgray",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                    key={i.id}
                                >
                                    <strong>{i.name}</strong>
                                    <button
                                        onClick={() => {
                                            db.productTypes.delete(i.id)
                                        }}
                                        style={{ border: "none", textDecoration: "underline", padding: 0 }}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </fieldset>

                <button
                    type="button"
                    onClick={async () => {
                        if (!confirm("Populate the fridge?")) {
                            return
                        }

                        for (let name of types) {
                            db.productTypes.add({ name })
                        }

                        for (let product of products) {
                            db.products.add({
                                slug: await getSlug(product.name),
                                createdAt: new Date().toISOString(),
                                updatedAt: null,
                                ...product
                            })
                        }
                    }}
                >
                    Generate data
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (confirm("Delete everything?")) {
                            db.productTypes.clear()
                            db.products.clear()
                        }
                    }}
                >
                    Clear data
                </button>
            </form>
        </div>
    )
}
