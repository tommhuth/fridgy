import random from "@huth/random";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useState } from "react";
import { variants } from "./products/products";

interface ToastContext {
    toasts: Toast[];
    createToast: (data: ToastData) => void
}

const context = createContext<ToastContext>({
    toasts: [],
    createToast: () => { }
})

export interface Toast {
    id: string
    text: string
    type: string
    duration: number
}

export interface ToastData {
    text: string
    type?: string
    duration?: number
}

export function useToasts() {
    return useContext(context)
}

export function ToastProvider({ children }) {
    let [toasts, setToasts] = useState<Toast[]>([])
    let createToast = useCallback(({
        duration = 2_500,
        type = "info",
        ...data
    }: ToastData) => {
        let toast = {
            id: random.id(),
            duration,
            type,
            ...data
        }

        setToasts(toasts => [toast, ...toasts])

        setTimeout(() => {
            setToasts(i => i.filter(i => i.id !== toast.id))
        }, duration)
    }, [])

    return (
        <context.Provider
            value={{ toasts, createToast }}
        >
            {children}

            <div
                style={{
                    position: "fixed",
                    left: "1em",
                    right: "1em",
                    top: "calc(1em + env(safe-area-inset-top))",
                    display: "flex",
                    placeContent: "center",
                    placeItems: "center",
                    flexDirection: "column",
                    pointerEvents: "none",
                    zIndex: 10_000,
                }}
            >
                <AnimatePresence>
                    {toasts.map(({ id, text, type }) => {
                        let background = {
                            error: "red",
                            info: "lightgray",
                            success: "blue"
                        }[type]
                        let color = {
                            error: "white",
                            info: "black",
                            success: "white"
                        }[type]

                        return (
                            <motion.div
                                style={{
                                    maxWidth: "min(35em, 100%)",
                                    marginBlock: "auto",
                                    position: "relative",
                                    hyphens: "auto"
                                }}
                                variants={variants}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                                aria-live="polite"
                                key={id}
                            >
                                <div
                                    style={{
                                        paddingBottom: ".5em"
                                    }}
                                >
                                    <p
                                        style={{
                                            padding: ".75em 1em",
                                            backgroundColor: background,
                                            color,
                                        }}
                                    >
                                        {text}
                                    </p>
                                    <button
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            opacity: 0,
                                            zIndex: 1,
                                            pointerEvents: "auto",
                                            border: "none",
                                            padding: 0,
                                        }}
                                        onClick={() => {
                                            setToasts(toasts.filter(i => i.id !== id))
                                        }}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </context.Provider >
    )
}