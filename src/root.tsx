import AddProduct from "@components/add-product/add-product"
import EditProduct from "@components/edit-product/edit-product"
import Product from "@components/product/product"
import Products from "@components/products/products"
import Settings from "@components/settings/settings"
import { ToastProvider } from "@components/toasts"
import { getAllProducts, getAllProductTypes, getProductBySlug } from "@data/db"
import HolyLoader, { } from "holy-loader"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import { registerSW } from "virtual:pwa-register"

function Layout() {
    return (
        <ToastProvider>
            <Outlet />
            <HolyLoader />
        </ToastProvider>
    )
}

function HydrateFallback() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1,
                background: "white",
                display: "flex",
                placeContent: "center",
                placeItems: "center"
            }}
        >
            Loading
        </div>
    )
}

const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                path: "/",
                loader: async () => {
                    return getAllProducts()
                },
                HydrateFallback,
                Component: Products,
                children: [
                    {
                        Component: AddProduct,
                        path: "add"
                    },
                ]
            },
            {
                Component: Settings,
                path: "settings",
                HydrateFallback,
                loader: async () => {
                    return getAllProductTypes()
                },
            },
            {
                path: "/product",
                children: [
                    {
                        path: ":slug",
                        shouldRevalidate: () => true,
                        HydrateFallback,
                        loader: async ({ params }) => {
                            return getProductBySlug(params.slug as string)
                        },
                        Component: Product,
                        children: [
                            {
                                path: "edit",
                                Component: EditProduct,
                            },
                        ]
                    },
                ]
            },
        ]
    }

])

const root = document.getElementById("root") as HTMLElement

createRoot(root).render(
    <RouterProvider router={router} />,
)

let updateSW = registerSW({
    onNeedRefresh() {
        console.info("New services worker ready")
        updateSW(true)
    },
    onOfflineReady() {
        console.info("Ready to work offline")
    },
}) 
