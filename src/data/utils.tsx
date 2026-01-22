import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router";

export function AnimatedOutlet({ context, initial = false }: { context?: any; initial?: boolean }) {
    const location = useLocation();
    const element = useOutlet(context);

    return (
        <AnimatePresence initial={initial}>
            {element && cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};