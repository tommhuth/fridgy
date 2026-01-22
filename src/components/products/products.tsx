import { useLiveQuery } from "dexie-react-hooks";
import { startTransition, useEffect, useRef, useState } from "react";
import { db, getAllProducts, getAllProductTypes, Product } from "@data/db";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AnimatePresence, clamp, motion, Variants } from "framer-motion";
import { AnimatedOutlet } from "@data/utils";
import { useToaster } from "@components/Toaster";

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
        <>
            <div
                style={{
                    display: !data ? "flex" : "none",
                    inset: 0,
                    position: "fixed",
                    placeContent: "center",
                    placeItems: "center",
                    background: "white"
                }}
            >
                Loading...
            </div>

            <nav className="container" style={{ position: "relative" }}>
                <ul
                    style={{
                        marginBottom: "2em",
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

            <h1 className="container">The fridge</h1>

            <fieldset
                className="container"
                style={{
                    flexDirection: "row",
                    paddingBlock: 0,
                    border: "none",
                }}
            >
                <legend className="visually-hidden">Filter</legend>
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
                <label style={{
                    marginLeft: "auto",
                    display: "flex", placeContent: "center", placeItems: "center"
                }}>
                    <input
                        type="checkbox"
                        onChange={(e) => setNonEmpty(e.currentTarget.checked)}
                        checked={nonEmpty}
                    />
                    Hide empty
                </label>
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
            </ul >

            <AnimatedOutlet />
        </>
    )
}

function AmountHandler({ amount, unitType, onActive, productId }) {
    let [[start, step], setStep] = useState([0, 0])
    let [isTouching, setIsTouching] = useState(false)
    let interval = 10
    let stepValue = Math.round(step / interval) * (unitType === "unit" ? 1 : 50)
    let threshold = 20

    useEffect(() => {
        onActive?.(isTouching)
    }, [isTouching])

    return (
        <>
            <div
                style={{
                    border: isTouching ? "1em solid transparent" : undefined,
                    margin: "-.5em -1em",
                    padding: ".5em 1em",
                    display: "flex",
                    placeContent: "space-between",
                    backgroundColor: isTouching ? "#eee" : "transparent",
                    placeItems: "center",
                    cursor: "ew-resize",
                    touchAction: "pan-y",
                    position: isTouching ? "absolute" : undefined,
                    inset: isTouching ? 0 : undefined,
                    textAlign: "center",
                    zIndex: 5
                }}
                onContextMenu={e => e.preventDefault()}
                onPointerDown={(e) => {
                    e.stopPropagation()
                    e.nativeEvent.stopImmediatePropagation()
                    e.currentTarget.setPointerCapture(e.pointerId)

                    setIsTouching(true)
                    setStep([e.clientX, 0])
                }}
                onPointerMove={e => {
                    e.stopPropagation()
                    e.nativeEvent.stopImmediatePropagation()

                    let distance = Math.floor(e.clientX - start)

                    if (!isTouching || Math.abs(distance) < threshold) {
                        return
                    }

                    if (start === 0) {
                        setStep([e.clientX, 0])
                    } else {
                        setStep([start, distance + -Math.sign(distance) * threshold])
                    }
                }}
                onPointerUp={async (e) => {
                    if (stepValue) {
                        await db.products.update(productId, {
                            amount: Math.max(amount + stepValue, 0)
                        })

                        setIsTouching(false)
                        setStep([0, 0])
                    }
                }}
                onPointerCancel={() => setIsTouching(false)}
            >
                <span
                    style={{
                        fontSize: "1.5em",
                        display: !isTouching ? "none" : undefined
                    }}
                >
                    &minus;
                </span>
                <div style={{ display: "flex", gap: ".35em" }}>
                    <div>
                        {unitType === "unit" ? "x" : null}
                        {amount.toLocaleString("en")}
                        {unitType === "unit" ? null : unitType}
                    </div>
                    <output
                        style={{
                            color: "blue",
                            display: !isTouching ? "none" : undefined
                        }}
                    >
                        {Math.sign(stepValue) === 1 ? <>+</> : <>&minus;</>}
                        {" "}
                        {Math.abs(Math.max(stepValue, -amount))}
                        {unitType === "unit" ? "x" : unitType}
                    </output>
                </div>
                <span
                    style={{
                        fontSize: "1.5em",
                        display: !isTouching ? "none" : undefined
                    }}
                >
                    +
                </span>
            </div>
        </>
    )
}

function easeInSine(x: number): number {
    return 1 - Math.cos((x * Math.PI) / 2);
}

function HorizontalAction({
    children,
    threshold = 80,
    onRight,
    onLeft,
    leftElement,
    rightElement
}) {
    let data = useRef({ start: 0 })
    let [sliding, setSliding] = useState(false)
    let [x, setX] = useState(0)

    return (
        <motion.div
            style={{
                position: "relative",
                marginInline: "-1em",
                overflow: "hidden"
            }}
            onPointerDown={(e) => {
                if (e.pointerType === "touch") {
                    data.current.start = e.clientX
                    setSliding(true)
                }
            }}
            onPointerMove={(e) => {
                let dist = data.current.start - e.clientX
                let buffer = 15

                if (e.pointerType === "touch" && Math.abs(dist) > buffer) {
                    let x = clamp(-threshold, threshold, -dist)
                    let s = easeInSine(Math.abs(x) / threshold)

                    setX(Math.round(s * threshold * Math.sign(x)))
                }
            }}
            onPointerCancel={() => {
                setX(0)
                setSliding(false)
            }}
            onPointerUp={() => {
                if (x === -threshold) {
                    onRight?.()
                } else if (x === threshold) {
                    onLeft?.()
                } else {
                    setX(0)
                }

                setSliding(false)
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    height: "100%",
                    top: 0,
                    zIndex: 1,
                    width: threshold
                }}
            >
                {leftElement}
            </div>
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    background: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1em",
                    padding: "1em",
                    translate: `${x}px 0`,
                    transition: sliding ? undefined : "translate .35s"
                }}
            >
                {children}
            </div>
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    height: "100%",
                    top: 0,
                    zIndex: 1,
                    width: threshold
                }}
            >
                {rightElement}
            </div>
        </motion.div>
    )
}

function Item({ id, slug, name, amount, unitType, ...rest }: Product) {
    let [amountChangeActive, setAmountChangeActive] = useState(false)
    let navigate = useNavigate()
    let { createToast } = useToaster()

    return (
        <motion.li
            key={id}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            style={{
                touchAction: "pan-y"
            }}
        >
            <div className="container">
                <HorizontalAction
                    onRight={async () => {
                        await db.products.delete(id)
                        createToast({ title: name + " deleted" })
                    }}
                    onLeft={() => {
                        navigate(`/product/${slug}/edit`)
                    }}
                    leftElement={(
                        <div
                            style={{
                                placeContent: "center",
                                placeItems: "center",
                                display: "flex",
                                background: "blue",
                                lineHeight: 1,
                                height: "100%",
                                fontSize: "2em",
                                color: "white",
                                width: "100%"
                            }}
                        >
                            &rarr;
                        </div>
                    )}
                    rightElement={(
                        <div
                            style={{
                                placeContent: "center",
                                placeItems: "center",
                                display: "flex",
                                background: "red",
                                height: "100%",
                                lineHeight: 1,
                                fontSize: "2em",
                                color: "white",
                                width: "100%"
                            }}
                        >
                            &#9760;
                        </div>
                    )}
                >
                    <div style={{ display: "flex", gap: ".5em" }}>
                        <span
                            style={{
                                opacity: amountChangeActive ? .35 : 1,
                                display: "flex",
                                gap: ".5em"
                            }}
                        >
                            <Link
                                to={`/product/${slug}`}
                            >
                                {amount === 0 ? <del>{name}</del> : name}
                            </Link>
                            &mdash;
                        </span>

                        <AmountHandler
                            amount={amount}
                            unitType={unitType}
                            productId={id}
                            onActive={setAmountChangeActive}
                        />
                    </div>

                    <menu>
                        <li>
                            <button
                                onClick={() => {
                                    startTransition(async () => {
                                        await db.products.delete(id)
                                        createToast({ title: name + " deleted" })
                                    })
                                }}
                            >
                                Delete
                            </button>
                        </li>
                        <li>
                            <button
                                style={{ width: "1.5em" }}
                                onClick={() => {
                                    let d = (unitType === "unit" ? 1 : 100)
                                    let val = Math.max(amount - d, 0)

                                    db.products.update(id, { amount: val - amount % d })
                                }}
                            >
                                &minus;
                            </button>
                        </li>
                        <li>
                            <button
                                style={{ width: "1.5em" }}
                                onClick={() => {
                                    let d = (unitType === "unit" ? 1 : 100)
                                    let val = amount + d

                                    db.products.update(id, { amount: val - amount % d })
                                }}
                            >
                                +
                            </button>
                        </li>
                        <li>
                            <Link to={`/product/${slug}/edit`}>
                                Edit
                            </Link>
                        </li>
                    </menu>
                </HorizontalAction>
            </div>
        </motion.li>
    )
}