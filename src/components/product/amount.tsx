export function renderUnit(unitType) {
    return unitType === "unit" ? null : unitType
}

export default function Amount({ unitType, amount }) {
    return (
        <>
            {unitType === "unit" ? "x" : null}
            {amount.toLocaleString("en")}
            {renderUnit(unitType)}
        </>
    )
}