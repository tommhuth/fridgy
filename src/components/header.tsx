import { ComponentPropsWithoutRef } from "react";

export default function Header({ children, style, ...rest }: ComponentPropsWithoutRef<"header">) {
    return (
        <header
            style={{
                position: "fixed",
                left: 0,
                right: 0,
                zIndex: 1000,
                top: "env(safe-area-inset-top)",
                height: "var(--header-height)",
                transition: " background-color .45s, color .45s",
                background: "var(--background)",
                textTransform: "uppercase",
                placeContent: "center",
                fontSize: ".875em",
                borderBottom: "1px solid currentColor",
                display: "flex",
                boxShadow: "0 0 2em rgba(0, 0, 0, .1)",
                flexDirection: "column",
                ...style
            }}
            {...rest}
        >
            <div style={{ flex: "none" }}>
                <div className="container">
                    {children}
                </div>
            </div>
        </header>
    )
}