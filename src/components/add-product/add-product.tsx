import Dialog from "@components/dialog"
import ProductForm from "@components/product-form"
import { HTMLProductForm } from "@components/products/products"
import { useToaster } from "@components/Toaster"
import { db, getSlug, Product, slugify } from "@data/db"
import { useNavigate } from "react-router"

export default function AddProduct(props) {
    let navigate = useNavigate()
    let { createToast } = useToaster()

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
                            slug: slugify(await getSlug(name)),
                            name,
                            amount: elements.amount.valueAsNumber,
                            createdAt: Date.now(),
                            updatedAt: 0,
                            unitType: elements.unitType.value as Product["unitType"],
                            productType: elements.productType.value as Product["productType"],
                        })

                        createToast({
                            title: name + " is now in the fridge!",
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
