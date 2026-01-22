import { type Product } from "@data/db"
import { AnimatedOutlet } from "@data/utils"
import { Link, useLoaderData, useLocation } from "react-router"

export default function Product() {
    const product = useLoaderData<Product>()
    const pathname = useLocation()

    return (
        <div className="container">
            <p className="breadcrumb">
                <Link to="/">Products</Link> / {product?.name} {pathname.pathname.includes("edit") ? <>/ Edit</> : null}
            </p>

            <h1>{product?.name}</h1>

            <Link
                to={`/product/${product?.slug}/edit`}
            >
                Edit
            </Link>

            <pre>{JSON.stringify(product, null, 4)}</pre>

            <AnimatedOutlet initial context={{ product }} />
        </div>
    )
}