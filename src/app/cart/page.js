'use client'

import CartComp from "@/components/client/cart/cart.comp";
import Footer from "@/components/client/footer";
import Header from "@/components/client/header";

const Cart = () => {

    return (

        <div className="h-screen flex flex-col">
            <Header />

            <main aria-label="Container content" className="flex-grow p-2">
                <CartComp/>
            </main>

            <Footer />
        </div>
    )
}

export default Cart;