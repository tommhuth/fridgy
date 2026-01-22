import Dialog from "@components/dialog"
import { HTMLProductForm } from "@components/products/products"
import { db, getAllProductTypes, ProductType } from "@data/db"
import { useLiveQuery } from "dexie-react-hooks"
import { useLoaderData, useNavigate } from "react-router"

export default function Settings(props) {
    let navigate = useNavigate()
    const data = useLoaderData<ProductType[]>();
    const productTypes = useLiveQuery(async () => {
        return getAllProductTypes()
    }, []);

    return (
        <>
            <Dialog
                {...props}
                onClose={() => navigate("/")}
                open
            >
                <h2>Settings</h2>

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
                    <fieldset style={{ padding: "1em" }}>
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

                        <ul style={{ display: "flex", gap: ".75em", flexDirection: "column", }}>
                            {(productTypes || data).map(i => {
                                return (
                                    <li>
                                        {i.name}
                                        {" "}
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
            </Dialog>
        </>
    )
}
