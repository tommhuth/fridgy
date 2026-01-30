import Dialog from "@components/dialog"
import ProductForm from "@components/product-form"
import { HTMLProductForm } from "@components/products/products"
import { useToasts } from "@components/toasts"
import { db, getUniqueSlug, type Product, slugify } from "@data/db"
import { useNavigate, useOutletContext } from "react-router"

export default function EditProduct() {
    const { product } = useOutletContext<{ product: Product }>()
    const navigate = useNavigate()
    const { createToast } = useToasts()

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
                    let newSlug = slugify(await getUniqueSlug(name))
                    let slug = name.toLowerCase() === product.name.toLowerCase().trim() ? product.slug : newSlug

                    await db.products.update(product.id, {
                        slug,
                        name,
                        amount: elements.amount.valueAsNumber,
                        updatedAt: new Date().toISOString(),
                        unitType: elements.unitType.value as Product["unitType"],
                        productType: elements.productType.value as Product["productType"],
                    })
                    createToast({ text: name + " updated" })
                    navigate("/product/" + slug)
                }}
                {...product}
            />
        </Dialog>
    )
}