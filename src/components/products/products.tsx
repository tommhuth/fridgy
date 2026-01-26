import { useLiveQuery } from "dexie-react-hooks";
import { startTransition, useState } from "react";
import { getAllProducts, getAllProductTypes, Product } from "@data/db";
import { Link, useLoaderData } from "react-router";
import { AnimatePresence, Variants } from "framer-motion";
import { AnimatedOutlet } from "@data/utils";
import Item from "./item";

export interface HTMLProductForm extends HTMLFormControlsCollection {
    name: HTMLInputElement
    amount: HTMLInputElement
    unitType: HTMLSelectElement
    productType: HTMLSelectElement
    submit: RadioNodeList
}

function sort(a: Product, b: Product) {
    const aTime = Math.max(a.updatedAt, a.createdAt)
    const bTime = Math.max(b.updatedAt, b.createdAt)

    return bTime - aTime
}

export const variants: Variants = {
    initial: {
        height: 0,
        opacity: 0,
    },
    enter: {
        height: "auto",
        opacity: 1,
        overflow: "hidden",
        transitionEnd: {
            overflow: ""
        },
        transition: {
            opacity: { delay: .1 },
        },
    },
    exit: {
        height: 0,
        opacity: 0,
        overflow: "hidden",
        transition: {
            height: { delay: .1 },
        },
    },
}

export default function Products() {
    const data = useLoaderData<Product[]>();
    const [productType, setProductType] = useState("")
    const [keyword, setKeyword] = useState("")
    const [nonEmpty, setNonEmpty] = useState(false)
    const products = useLiveQuery(async () => {
        return getAllProducts(productType)
    }, [productType]);
    const productTypes = useLiveQuery(async () => {
        return getAllProductTypes()
    }, []);

    return (
        <div className="page">
            <nav
                className="container"
                style={{
                    position: "relative",
                    paddingBottom: "1em",
                    marginBottom: "1.5em",
                    borderBottom: "1px dashed gray"
                }}
            >
                <ul
                    style={{
                        display: "flex",
                        gap: "1em"
                    }}
                >
                    <li>
                        <Link
                            to={"/add"}
                        >
                            Add product
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/settings"}
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>

            <h1 className="container">What's in that fridge</h1>

            <fieldset
                className="container"
                style={{
                    flexDirection: "row",
                    paddingBlock: 0,
                    border: "none",
                }}
            >
                <legend className="visually-hidden">Filter</legend>
                <label style={{ flex: "1 1", maxWidth: "15em" }}>
                    <span className="visually-hidden">Product type</span>
                    <select
                        onChange={(e) => setProductType(e.currentTarget.value)}
                        value={productType}
                        style={{ width: "100%" }}
                    >
                        <option value="">Everything</option>
                        {productTypes?.map(i => {
                            return <option key={i.id} value={i.name}>{i.name}</option>
                        })}
                    </select>
                </label>
                <label
                    style={{
                        marginRight: "auto",
                        display: "flex",
                        placeContent: "center",
                        placeItems: "center"
                    }}
                >
                    <input
                        type="checkbox"
                        onChange={(e) => setNonEmpty(e.currentTarget.checked)}
                        checked={nonEmpty}
                    />
                    Hide empty
                </label>
                <label style={{ flex: "2 2", maxWidth: "20em" }}>
                    <span className="visually-hidden">Search</span>
                    <input
                        placeholder="Search"
                        style={{ width: "100%" }}
                        onChange={(e) => startTransition(() => setKeyword(e.currentTarget.value))}
                        value={keyword}
                        type="search"
                    />
                </label>
            </fieldset>

            <ul className="items">
                <AnimatePresence initial={false}>
                    {(products || data).sort(sort).map(product => {
                        if (product.amount === 0 && nonEmpty) {
                            return null
                        }

                        if (keyword && !product.name.toLowerCase().includes(keyword.toLowerCase())) {
                            return null
                        }

                        return <Item key={product.id} {...product} />
                    })}
                </AnimatePresence>
            </ul>

            <AnimatedOutlet />
        </div>
    )
}
