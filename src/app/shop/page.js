'use client'

import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import ProductsShopComp from "@/components/client/shop/products.shop.comp";
import { useCurrentUser } from "@/db.supa.backend/utils";

const Shop = () => {
    useCurrentUser();

    return (
        <div className="h-screen flex flex-col">
            <Header />

            <main aria-label="Container content" className="flex-grow">
                <ProductsShopComp/>


            </main>

            <Footer />
        </div>
    )
}

export default Shop;