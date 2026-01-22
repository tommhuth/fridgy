import Dialog from "@components/dialog"
import ProductForm from "@components/product-form"
import { HTMLProductForm } from "@components/products/products"
import { useToaster } from "@components/Toaster"
import { db, getSlug, type Product, slugify } from "@data/db"
import { useNavigate, useOutletContext } from "react-router"

export default function EditProduct() {
    const { product } = useOutletContext<{ product: Product }>()
    const navigate = useNavigate()
    const { createToast } = useToaster()

    return (
        <Dialog
            onClose={() => navigate("/product/" + product.slug)}
            open
        >
            <ProductForm
                legend={`Edit ${product.name}`}
                onSubmit={async e => {
                    e.preventDefault()

                    let form = e.currentTarget
                    let elements = form.elements as HTMLProductForm
                    let name = elements.name.value.trim()
                    let newSlug = slugify(await getSlug(name))
                    let slug = name.toLowerCase() === product.name.toLowerCase().trim() ? product.slug : newSlug

                    await db.products.update(product.id, {
                        slug,
                        name,
                        amount: elements.amount.valueAsNumber,
                        updatedAt: Date.now(),
                        unitType: elements.unitType.value as Product["unitType"],
                        productType: elements.productType.value as Product["productType"],
                    })
                    createToast({ title: name + " updated" })
                    navigate("/product/" + slug)
                }}
                {...product}
            />
        </Dialog>
    )
}