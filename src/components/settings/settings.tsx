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
                    <fieldset>
                        <legend>Product types</legend>

                        <p style={{ display: "flex", gap: ".5em" }}>
                            {(productTypes || data).map(i => {
                                return (
                                    <button
                                        onClick={() => {
                                            db.productTypes.delete(i.id)
                                        }}
                                        type="button"
                                    >
                                        {i.name}
                                    </button>
                                )
                            })}
                        </p>

                        <div
                            style={{ display: "flex", gap: "1em" }}
                        >
                            <label>
                                New <input type="text" name="name" required />
                            </label>

                            <button type="submit">
                                Add
                            </button>
                        </div>
                    </fieldset>
                </form>
            </Dialog>
        </>
    )
}
