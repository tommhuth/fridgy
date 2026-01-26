import Dialog from "@components/dialog"
import { HTMLProductForm } from "@components/products/products"
import { db, getAllProductTypes, ProductType } from "@data/db"
import { useLiveQuery } from "dexie-react-hooks"
import { Link, useLoaderData, useNavigate } from "react-router"

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
            </form>
        </div>
    )
}
