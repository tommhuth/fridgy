export default function Header({ children, style, ...rest }) {
    return (
        <header
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "var(--header-height)",
                textTransform: "uppercase",
                placeContent: "center",
                fontSize: ".875em",
                borderBottom: "1px solid currentColor",
                display: "flex",
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