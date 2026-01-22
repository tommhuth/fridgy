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
    title: string
    text?: string
    type: string
    duration: number
}

export interface ToastData {
    title: string
    text?: string
    type?: string
    duration?: number
}

export function useToaster() {
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

            <ul
                style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: "1em",
                    display: "flex",
                    placeContent: "center",
                    placeItems: "center",
                    flexDirection: "column",
                    zIndex: 100000,
                }}
            >
                <AnimatePresence>
                    {toasts.map(({ id, title, type }) => {
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
                            <motion.li
                                style={{
                                    maxWidth: "35em",
                                    marginBlock: "auto",
                                }}
                                variants={variants}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                                key={id}
                            >
                                <div
                                    style={{
                                        paddingBottom: ".5em"
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: ".5em 1em",
                                            backgroundColor: background,
                                            color,
                                        }}
                                    >
                                        {title}
                                    </div>
                                </div>
                            </motion.li>
                        )
                    })}
                </AnimatePresence>
            </ul>
        </context.Provider>
    )
}