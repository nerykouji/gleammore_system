import { useProductsBackend } from "@/db.supa.backend/products.backend";
import Link from "next/link";

const ProductsShopComp = () => {
    const { products } = useProductsBackend();

    return (

        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <header>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Level up your fashion with Gleammore</h2>

                    <p className="mt-4 max-w-md text-gray-500">
                    Get your beaded accessories from us and make everything nice! Improve your fashion with us at affordable prices!
                    </p>
                </header>

                <div className="mt-8 flex items-center justify-between">
                    <div className="flex rounded border border-gray-100">
                        <button
                            className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                />
                            </svg>
                        </button>

                        <button
                            className="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <div>
                        <label htmlFor="SortBy" className="sr-only">SortBy</label>

                        <select id="SortBy" className="h-10 rounded border-gray-300 text-sm">
                            <option>Sort By</option>
                            <option value="Title, DESC">Title, DESC</option>
                            <option value="Title, ASC">Title, ASC</option>
                            <option value="Price, DESC">Price, DESC</option>
                            <option value="Price, ASC">Price, ASC</option>
                        </select>
                    </div>
                </div>

                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        products.map((product, index) => {
                            return (
                                <li key={index} className=" cursor-pointer">
                                    <Link className="group block overflow-hidden"
                                        href={{
                                            pathname: '/product',
                                            query: { q: product.id }
                                        }}>
                                        <img
                                            src={product.product_images ? product.product_images[0].url : "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081"}
                                            alt=""
                                            className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                        />

                                        <div className="relative bg-white pt-3">
                                            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                {product.name || "Not set"}
                                            </h3>

                                            <p className="mt-2">
                                                <span className="sr-only"> Regular Price </span>

                                                <span className="tracking-wider text-gray-900"> ₱{product.price}  </span>
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </section>
    )
}

export default ProductsShopComp;