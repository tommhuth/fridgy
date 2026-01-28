import { useAnimationFrame, motion, clamp } from "framer-motion"
import { useMemo, useState, useRef } from "react"

export default function HorizontalAction({
    children,
    threshold = 85,
    onRight,
    onLeft,
    leftElement,
    rightElement
}) {
    let data = useMemo(() => ({ start: 0, x: 0, reveal: 0 }), [])
    let [active, setActive] = useState(false)
    let [interacting, setInteracting] = useState(false)
    let ref = useRef<HTMLDivElement>(null)
    let reset = () => {
        data.x = 0
        data.reveal = 0
        setActive(false)
        setInteracting(false)
    }

    useAnimationFrame(() => {
        if (!ref.current) {
            return
        }

        let [left, main, right] = ref.current.children as unknown as HTMLDivElement[]

        main.style.translate = `${data.x}px 0 0`
        right.style.clipPath = `inset(0 0 0 ${((1 + Math.min(data.reveal, 0)) * 100).toFixed(2)}%)`
        left.style.clipPath = `inset(0 ${((1 - Math.max(data.reveal, 0)) * 100).toFixed(2)}% 0 0)`
    })

    return (
        <motion.div
            ref={ref}
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
                setInteracting(true)
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
                    data.reveal = currentX / threshold
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
                    transition: !interacting ? "all .3s" : undefined,
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
                    display: "flex",
                    gap: "1em",
                    padding: "1em",
                    transition: active ? undefined : "translate .35s, color .45s, background-color .45s"
                }}
            >
                {children}
            </motion.div>
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    height: "100%",
                    transition: !interacting ? "all .3s" : undefined,
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