import Header from "@components/header"
import { type Product } from "@data/db"
import { AnimatedOutlet } from "@data/utils"
import { useEffect } from "react"
import { Link, useLoaderData } from "react-router"
import Amount from "./amount"

const units = [
    ['year', 1000 * 60 * 60 * 24 * 365],
    ['month', 1000 * 60 * 60 * 24 * 30],
    ['day', 1000 * 60 * 60 * 24],
    ['hour', 1000 * 60 * 60],
    ['minute', 1000 * 60],
    ['second', 1000],
] as const;

function pickBestUnit(diffMs: number) {
    for (const [unit, ms] of units) {
        if (Math.abs(diffMs) >= ms) {
            return [unit, Math.round(diffMs / ms)] as const;
        }
    }

    return ['second', 0] as const;
}

function formatRelativeDate(date: Date) {
    const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = date.valueOf() - Date.now();
    const [unit, value] = pickBestUnit(diff);
    const result = formatter.format(value, unit);

    return result[0].toUpperCase() + result.substring(1)
}

export default function Product() {
    const product = useLoaderData<Product>()
    const date = new Date(product.updatedAt || product.createdAt)

    useEffect(() => {
        //document.body.style.setProperty("--color", "#fff")
        document.body.style.setProperty("--background", "#03fcbe")

        return () => {
            document.body.style.setProperty("--color", "")
            document.body.style.setProperty("--background", "")
        }
    }, [])

    return (
        <>
            <Header>
                <p
                    style={{
                        display: "flex",
                        placeContent: "space-between",
                        placeItems: "center"
                    }}
                >
                    <Link to="/" className="back">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M1 12H24M1 12L8 6M1 12L8 18"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="visually-hidden">Back to the fridge</span>
                    </Link>

                    <Link
                        to={`/product/${product?.slug}/edit`}
                    >
                        Edit
                    </Link>
                </p>
            </Header>
            <div
                className="page"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "calc(1em + env(safe-area-inset-bottom) + 5vw)"
                }}
            >

                <div
                    style={{
                        marginTop: "auto",
                    }}
                >
                    <div
                        className="container"
                    >
                        <h1
                            style={{
                                fontSize: "clamp(4.5em, 9vw, 9em)",
                                lineHeight: 1,
                            }}
                        >
                            {product?.name}
                        </h1>

                        <p
                            style={{
                                fontSize: "clamp(2em, 3vw, 3em)",
                                marginTop: "-.5em",
                                marginBottom: "3em",
                                fontFamily: "serif",
                                fontStyle: "italic",
                            }}
                        >
                            {!!product.amount && <>You've got <Amount {...product} /> of that buddy!</>}
                            {!product.amount && <>You  ain't got any of that buddy!</>}
                        </p>

                        <dl
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(15em, 1fr))",
                                lineHeight: 1.5,
                                gap: "1em"
                            }}
                        >
                            <div hidden={!product.amount}>
                                <dt style={{ opacity: .5 }}>Amount</dt>
                                <dd style={{ fontSize: "1.35em" }}>
                                    <Amount {...product} />
                                </dd>
                            </div>
                            <div>
                                <dt style={{ opacity: .5 }}>Type</dt>
                                <dd style={{ fontSize: "1.35em" }}>
                                    {product.productType}
                                </dd>
                            </div>
                            <div>
                                <dt style={{ opacity: .5 }}>Last updated</dt>
                                <dd style={{ fontSize: "1.35em" }}>
                                    <time
                                        dateTime={product.updatedAt || product.createdAt}
                                    >
                                        {formatRelativeDate(date)}
                                    </time>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <AnimatedOutlet initial context={{ product }} />
        </>
    )
}