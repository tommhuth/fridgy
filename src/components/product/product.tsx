import { type Product } from "@data/db"
import { AnimatedOutlet } from "@data/utils"
import { useEffect } from "react"
import { Link, useLoaderData, useLocation } from "react-router"

export default function Product() {
    const product = useLoaderData<Product>()

    useEffect(() => {
        document.body.style.setProperty("--color", "#fff")
        document.body.style.setProperty("--background", "#222")

        return () => {
            document.body.style.setProperty("--color", "")
            document.body.style.setProperty("--background", "")
        }
    }, [])

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

                <Link
                    to={`/product/${product?.slug}/edit`}
                >
                    Edit
                </Link>
            </p>

            <h1>
                {product?.name}
            </h1>

            <pre>{JSON.stringify(product, null, 4)}</pre>

            <AnimatedOutlet initial context={{ product }} />
        </div>
    )
}