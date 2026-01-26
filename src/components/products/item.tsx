import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { db, Product } from "@data/db";
import { Link, useNavigate } from "react-router";
import { clamp, motion, useAnimationFrame } from "framer-motion";
import { useToaster } from "@components/Toaster";
import { variants } from "./products";

function AmountHandler({ amount, unitType, onActive, productId }) {
    let [[start, value], setStep] = useState([0, 0])
    let [active, setActive] = useState(false)
    let threshold = 20
    let timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
    let activationDelay = 50

    useEffect(() => {
        onActive?.(active)
    }, [active])

    return (
        <>
            <div
                style={{
                    border: active ? "1em solid transparent" : undefined,
                    margin: "-.5em -1em",
                    padding: ".5em 1em",
                    display: "flex",
                    placeContent: "space-between",
                    backgroundColor: active ? "#eee" : "transparent",
                    placeItems: "center",
                    cursor: active ? "ew-resize" : "pointer",
                    touchAction: "none",
                    position: active ? "absolute" : undefined,
                    inset: active ? 0 : undefined,
                    textAlign: "center",
                    zIndex: 5
                }}
                onContextMenu={e => e.preventDefault()}
                onPointerDown={(e) => {
                    e.stopPropagation()
                    e.nativeEvent.stopImmediatePropagation()
                    e.currentTarget.setPointerCapture(e.pointerId)

                    clearTimeout(timeout.current)
                    timeout.current = setTimeout(() => {
                        setActive(true)
                        setStep([e.clientX, 0])
                    }, activationDelay)
                }}
                onPointerMove={e => {
                    e.stopPropagation()
                    e.nativeEvent.stopImmediatePropagation()
                    e.preventDefault()

                    let distance = Math.floor(e.clientX - start)

                    if (!active || Math.abs(distance) < threshold) {
                        return
                    }

                    if (start === 0) {
                        setStep([e.clientX, 0])
                    } else {
                        let pxPerUnit = 10
                        let value = distance + -Math.sign(distance) * threshold
                        let stepValue = Math.round(value / pxPerUnit) * (unitType === "unit" ? 1 : 50)

                        setStep([start, stepValue])
                    }
                }}
                onPointerUp={async (e) => {
                    if (value) {
                        await db.products.update(productId, {
                            amount: Math.max(amount + value, 0)
                        })
                    }

                    clearTimeout(timeout.current)
                    setActive(false)
                }}
                onPointerCancel={() => {
                    setActive(false)
                    clearTimeout(timeout.current)
                }}
            >
                <span
                    style={{
                        fontSize: "1.5em",
                        display: !active ? "none" : undefined
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
                            display: !active ? "none" : undefined
                        }}
                    >
                        {value < 0 ? <>&minus;</> : <>+</>}
                        {" "}
                        {Math.abs(Math.max(value, -amount))}
                        {unitType === "unit" ? "x" : unitType}
                    </output>
                </div>
                <span
                    style={{
                        fontSize: "1.5em",
                        display: !active ? "none" : undefined,
                    }}
                >
                    +
                </span>
            </div>
        </>
    )
}

function HorizontalAction({
    children,
    threshold = 85,
    onRight,
    onLeft,
    leftElement,
    rightElement
}) {
    let data = useMemo(() => ({ start: 0, x: 0 }), [])
    let [active, setActive] = useState(false)
    let ref = useRef<HTMLDivElement>(null)
    let reset = () => {
        data.x = 0
        setActive(false)
    }

    useAnimationFrame(() => {
        if (!ref.current) {
            return
        }

        ref.current.style.translate = `${data.x}px 0 0`
    })

    return (
        <motion.div
            style={{
                position: "relative",
                marginInline: "-1em",
                overflow: "hidden",
                touchAction: "pan-y"
            }}
            onPointerDown={(e) => {
                if (e.pointerType !== "touch") {
                    return
                }

                data.start = e.clientX
            }}
            onPointerMove={(e) => {
                if (e.pointerType !== "touch") {
                    return
                }

                let dist = data.start - e.clientX
                let buffer = 35

                if (!active && Math.abs(dist) > buffer) {
                    data.start = e.clientX
                    setActive(true)
                } else if (active) {
                    let currentX = clamp(-threshold, threshold, -dist)
                    let scale = (Math.abs(currentX) / threshold)

                    data.x = Math.round(scale * threshold * Math.sign(currentX))
                }
            }}
            onPointerCancel={reset}
            onPointerUp={(e) => {
                if (e.pointerType !== "touch") {
                    return
                }

                if (data.x === -threshold) {
                    onRight?.()
                } else if (data.x === threshold) {
                    onLeft?.()
                }

                reset()
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
            <motion.div
                style={{
                    position: "relative",
                    zIndex: 2,
                    background: "var(--background)",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1em",
                    padding: "1em",
                    transition: active ? undefined : "translate .35s, color .45s, background-color .45s"
                }}
                ref={ref}
            >
                {children}
            </motion.div>
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

export default function Item({ id, slug, name, amount, unitType }: Product) {
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
                    <div
                        style={{
                            display: "flex",
                            gap: ".5em",
                            flex: "auto"
                        }}
                    >
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