import { getAllProductTypes, Product } from "@data/db"
import { useLiveQuery } from "dexie-react-hooks"
import { startHolyLoader, stopHolyLoader } from "holy-loader"
import { ComponentPropsWithoutRef, useState } from "react"

type ProductFormProps = {
    multiple?: boolean
    legend: string
} & Omit<Partial<Product> & ComponentPropsWithoutRef<"form">, "id">

export default function ProductForm({
    onSubmit,
    name,
    amount,
    unitType: incomingUnitType,
    productType,
    legend,
    multiple = false
}: ProductFormProps) {
    const [unitType, setUnitType] = useState(incomingUnitType || "unit")
    const productTypes = useLiveQuery(async () => {
        return getAllProductTypes()
    }, []);

    return (
        <form
            onSubmit={async (e) => {
                try {
                    startHolyLoader()
                    await onSubmit?.(e)
                } catch (e) {
                    alert((e as Error).message)
                } finally {
                    stopHolyLoader()
                }
            }}
        >
            <fieldset style={{ display: "flex", gap: "1em", flexDirection: "column" }}>
                <legend>{legend}</legend>

                <label style={{ display: "flex", gap: ".25em", flexDirection: "column" }}>
                    Name
                    <input
                        defaultValue={name}
                        required
                        type="text"
                        autoComplete="off"
                        autoCorrect="off"
                        name="name"
                    />
                </label>
                <label style={{ display: "flex", gap: ".25em", flexDirection: "column" }}>
                    Unit type
                    <select
                        required
                        defaultValue={unitType}
                        name="unitType"
                        onChange={e => setUnitType(e.currentTarget.value)}
                    >
                        <option value="unit">Unit</option>
                        <option value="g">Grams</option>
                        <option value="ml">Milliliter</option>
                    </select>
                </label>
                <label style={{ display: "flex", gap: ".25em", flexDirection: "column" }}>
                    Amount
                    <input
                        required
                        defaultValue={!amount ? unitType === "unit" ? 1 : 200 : amount}
                        min={0}
                        max={5_000}
                        inputMode="numeric"
                        type="number"
                        name="amount"
                    />
                </label>
                <label style={{ display: "flex", gap: ".25em", flexDirection: "column" }}>
                    Product type
                    <select
                        required
                        defaultValue={productType}
                        name="productType"
                        key={typeof productTypes}
                    >
                        {productTypes?.map(i => {
                            return <option key={i.id} value={i.name}>{i.name}</option>
                        })}
                    </select>
                </label>

                <button type="submit" name="submit" value="save">Save</button>

                {multiple && <button type="submit" name="submit" value="repeat">Save and repeat</button>}
            </fieldset>
        </form>
    )
}