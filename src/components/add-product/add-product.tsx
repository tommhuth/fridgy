import Dialog from "@components/dialog"
import ProductForm from "@components/product-form"
import { HTMLProductForm } from "@components/products/products"
import { useToasts } from "@components/toasts"
import { db, getUniqueSlug, Product, slugify } from "@data/db"
import { useNavigate } from "react-router"

export default function AddProduct(props) {
    let navigate = useNavigate()
    let { createToast } = useToasts()

    return (
        <>
            <Dialog
                {...props}
                onClose={() => navigate("/")}
                open
            >
                <ProductForm
                    legend="Add product"
                    multiple
                    onSubmit={async e => {
                        e.preventDefault()

                        let form = e.currentTarget
                        let elements = form.elements as HTMLProductForm
                        let name = elements.name.value.trim()
                        let submitter = (e.nativeEvent as SubmitEvent).submitter

                        await db.products.add({
                            slug: slugify(await getUniqueSlug(name)),
                            name,
                            amount: elements.amount.valueAsNumber,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            unitType: elements.unitType.value as Product["unitType"],
                            productType: elements.productType.value as Product["productType"],
                        })

                        createToast({
                            text: name + " is now in the fridge!",
                            type: "success"
                        })

                        if ((submitter as HTMLButtonElement).value === "save") {
                            navigate("/")
                        } else {
                            form.reset()
                        }
                    }}
                />
            </Dialog>
        </>
    )
}
