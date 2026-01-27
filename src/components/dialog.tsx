import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { motion } from "framer-motion"

interface DialogProps extends Omit<ComponentPropsWithoutRef<typeof motion.dialog>, "onClose"> {
    onClose: () => void
}

export default function Dialog({
    children,
    open,
    onClose,
    ...rest
}: DialogProps) {
    let ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (!ref.current || !open) {
            return
        }

        ref.current.showModal()
        window.document.body.style.overflow = "hidden"

        return () => {
            ref.current?.close()
            window.document.body.style.overflow = ""
        }
    }, [open])

    useEffect(() => {
        let onClick = () => onClose?.()

        window.addEventListener("click", onClick)

        return () => {
            window.removeEventListener("click", onClick)
        }
    }, [onClose])

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0, 0, 0, .4)",
                    zIndex: 100
                }}
            />
            <motion.dialog
                ref={ref}
                initial={{ y: "100%" }}
                exit={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: .65, ease: "anticipate" }}
                onClick={(e) => e.stopPropagation()}
                onClose={() => {
                    onClose?.()
                }}
                {...rest}
            >
                {children}
            </motion.dialog>
        </>
    )
}