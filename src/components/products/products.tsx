import { useLiveQuery } from "dexie-react-hooks";
import { startTransition, useState } from "react";
import { getAllProducts, getAllProductTypes, Product } from "@data/db";
import { Link, useLoaderData } from "react-router";
import { AnimatePresence, Variants } from "framer-motion";
import { AnimatedOutlet } from "@data/utils";
import Item from "./item";
import Header from "@components/header";

export interface HTMLProductForm extends HTMLFormControlsCollection {
    name: HTMLInputElement
    amount: HTMLInputElement
    unitType: HTMLSelectElement
    productType: HTMLSelectElement
    submit: RadioNodeList
}

function sort(a: Product, b: Product) {
    return (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt)
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
    const items = products || data

    return (
        <>
            <Header>
                <nav>
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
            </Header>
            <div
                className="page"
            >
                <div
                    style={{
                        position: !items.length ? "fixed" : undefined,
                        bottom: !items.length ? "calc(6em + env(safe-area-inset-bottom))" : undefined,
                        left: !items.length ? 0 : undefined,
                        right: !items.length ? 0 : undefined,
                    }}
                >
                    <h1
                        className="container"
                        style={{
                            fontSize: !items.length ? "clamp(4.5em, 14vw, 6.5em)" : undefined,
                            lineHeight: !items.length ? 1.1 : undefined,
                        }}
                    >
                        What's in that fridge
                    </h1>

                    <div
                        className="container"
                        style={{
                            marginTop: "-1em",
                            lineHeight: "1.4",
                            fontSize: !items.length ? "clamp(1.25em, 4.5vw, 1.75em)" : undefined,
                            display: !items.length ? "flex" : "none",
                            flexDirection: "column",
                            gap: ".5em"
                        }}
                    >
                        <p>
                            You've got nothing in that fridge, buddy!

                        </p>
                        <p>
                            Start by
                            {" "}
                            <Link
                                style={{
                                    textDecoration: "underline"
                                }}
                                to={"/add"}
                            >
                                populating
                            </Link>
                            {" "} that fridge and adding some{" "}
                            <Link
                                style={{
                                    textDecoration: "underline"
                                }}
                                to="/settings"
                            >
                                categories
                            </Link>
                            .
                        </p>
                    </div>

                </div>

                <fieldset
                    className="container"
                    style={{
                        flexDirection: "row",
                        paddingBlock: 0,
                        border: "none",
                        display: !products?.length ? "none" : undefined
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

                <ul
                    className="items"
                    style={{
                        display: !products?.length ? "none" : undefined,
                        marginBlock: "2em"
                    }}
                >
                    <AnimatePresence initial={false}>
                        {items.sort(sort).map(product => {
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

                <p
                    className="container"
                    style={{
                        display: !items.length ? "none" : undefined,
                        marginTop: "2em",
                        opacity: .5
                    }}
                >
                    {items.length} items in the fridge
                </p>

            </div>
            <AnimatedOutlet />
        </>
    )
}
