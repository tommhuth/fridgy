import { startTransition, useState } from "react";
import { db, Product } from "@data/db";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useToaster } from "@components/toasterx";
import { variants } from "./products";
import AmountHandler from "./amount-handler";
import HorizontalAction from "./horizontal-action";

export default function Item({ id, slug, name, amount, unitType }: Product) {
    let [amountChangeActive, setAmountChangeActive] = useState(false)
    let navigate = useNavigate()
    let { createToast } = useToaster()

    return (
        <motion.li
            key={id}
            variants={variants}
            initial="initial"
            animate="enter"
            style={{ position: "relative" }}
            exit="exit"
        >
            <div className="container">
                <HorizontalAction
                    onRight={async () => {
                        await db.products.delete(id)
                        createToast({ text: name + " deleted" })
                    }}
                    onLeft={() => {
                        navigate(`/product/${slug}/edit`)
                    }}
                    leftElement={(
                        <div
                            style={{
                                placeContent: "center",
                                placeItems: "center",
                                display: "flex",
                                background: "blue",
                                lineHeight: 1,
                                height: "100%",
                                fontSize: "2em",
                                color: "white",
                                width: "100%"
                            }}
                        >
                            &rarr;
                        </div>
                    )}
                    rightElement={(
                        <div
                            style={{
                                placeContent: "center",
                                placeItems: "center",
                                display: "flex",
                                background: "red",
                                height: "100%",
                                lineHeight: 1,
                                fontSize: "2em",
                                color: "white",
                                width: "100%"
                            }}
                        >
                            &#9760;
                        </div>
                    )}
                >
                    <div
                        style={{
                            flex: "1 1 auto",
                            overflow: "hidden"
                        }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                gap: ".75em",
                                flex: "auto",
                                minWidth: 0,
                                maxWidth: "100%",
                            }}
                        >
                            <Link
                                style={{
                                    opacity: amountChangeActive ? .35 : 1,
                                    flex: "1 1 auto",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontSize: "1.25em",
                                    width: "max-content"
                                }}
                                to={`/product/${slug}`}
                            >
                                {amount === 0 ? <del>{name}</del> : name}
                            </Link>

                            <AmountHandler
                                amount={amount}
                                unitType={unitType}
                                productId={id}
                                onActive={setAmountChangeActive}
                            />
                        </div>
                    </div>

                    <menu
                        style={{
                            flex: "none",
                            gap: ".5em",
                            placeItems: "center"
                        }}
                    >
                        <li>
                            <Link to={`/product/${slug}/edit`}>
                                Edit
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    startTransition(async () => {
                                        await db.products.delete(id)
                                        createToast({ text: name + " deleted" })
                                    })
                                }}
                            >
                                Delete
                            </button>
                        </li>
                        <li>
                            <button
                                style={{ width: "1.5em" }}
                                onClick={() => {
                                    let d = (unitType === "unit" ? 1 : 100)
                                    let val = Math.max(amount - d, 0)

                                    db.products.update(id, { amount: val - amount % d })
                                }}
                            >
                                &minus;
                            </button>
                        </li>
                        <li>
                            <button
                                style={{ width: "1.5em" }}
                                onClick={() => {
                                    let d = (unitType === "unit" ? 1 : 100)
                                    let val = amount + d

                                    db.products.update(id, { amount: val - amount % d })
                                }}
                            >
                                +
                            </button>
                        </li>
                    </menu>
                </HorizontalAction>
            </div>
        </motion.li>
    )
}