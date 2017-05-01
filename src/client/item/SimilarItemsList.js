import React from "react"
import { Link } from "react-router"

export default function SimilarItemsList(props) {
    return (
        <ul className="item-entry__similar-items">
            {props.items && props.items.map(i => {
                return (
                    <li key={i.slug} >
                        <Link to={`/items/${i.slug}`}>{i.title}</Link>
                    </li>
                )
            })}
        </ul>
    )
}