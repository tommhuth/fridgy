import { db } from "@data/db"
import { useState, useRef, useEffect } from "react"

export default function AmountHandler({ amount, unitType, onActive, productId }) {
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
                    opacity: active ? 1 : .5,
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
                <div
                    style={{
                        fontSize: "1.5em",
                        display: !active ? "none" : undefined
                    }}
                >
                    &minus;
                </div>
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
                <div
                    style={{
                        fontSize: "1.5em",
                        display: !active ? "none" : undefined,
                    }}
                >
                    +
                </div>
            </div>
        </>
    )
}