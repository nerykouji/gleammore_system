import supabase from "@/config/supabase.config";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "./utils";

export const useCartBackend = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        setLoading(true);
        setError(null);

        try {

            if (getCurrentUser().id === null || getCurrentUser().id === undefined) {
                throw new Error("Please signin to continue!!")
            }

            const { data, error } = await supabase
                .from('cart')
                .select(`
                    *,                  
                        products(
                        *,
                        product_images(
                        *)
                        )                                 
                    `)
                .eq('user_id', getCurrentUser().id)

            if (error) {
                throw new Error(error.message);
            }

            setCart(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const refreshCart = () => {
        fetchCart();
    };

    return { cart, loading, error, refreshCart };

}


export const useCartShippingFeeBackend = () => {
    const [fee, setFee] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchShippingFee = async () => {
        setLoading(true);
        setError(null);

        try {

            if (getCurrentUser().id === null || getCurrentUser().id === undefined) {
                throw new Error("Please signin to continue!!")
            }

            const { data, error } = await supabase
                .rpc('calc_ship_fee', {
                    uid: getCurrentUser().id
                })

            if (error) {
                throw new Error(error.message);
            }

            setFee(data);
        } catch (err) {
            toast.error(err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchShippingFee();
    }, []);

    const refreshFee = () => {
        fetchShippingFee();
    };

    return { fee, loading, error, refreshFee }
}





export const useCartToAddBackend = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const addToCart = async (pId) => {
        setError(null);
        setLoading(true);

        try {

            if (getCurrentUser().id === null || getCurrentUser().id === undefined) {
                throw new Error("Please login to continue!!")
            }

            const { error } = await supabase
                .rpc('add_to_cart', {
                    uid: getCurrentUser().id, pid: pId
                })

            if (error) {
                throw new Error(error.message)
            }

            toast.success("Item added to cart!")
            setResponse("Item added to cart!")

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { response, error, loading, addToCart }

}



export const useCartUpdateItemBackend = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateItemCart = async (cid, qty) => {
        setError(null);
        setLoading(true);

        try {

            const { error } = await supabase
                .rpc('update_cart_item_qty', {
                    cid,
                    qty
                })

            if (error) {
                throw new Error(error.message)
            }

            toast.success("Item updated to cart!")
            setResponse("Item updated to cart!")

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { response, error, loading, updateItemCart }

}


export const useCheckoutBackend = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkout = async (pay_mode) => {
        setError(null);
        setLoading(true);

        try {

            if (getCurrentUser().id === null || getCurrentUser().id === undefined) {
                throw new Error("Please login to continue!!")
            }

            const { error } = await supabase
                .rpc('checkout', {
                    pay_mode,
                    uid: getCurrentUser().id
                })

            if (error) {
                throw new Error(error.message)
            }

            toast.success("You've successfully checkout!")
            setResponse("You've successfully checkout!")
            return response;
        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { response, error, loading, checkout }
}

