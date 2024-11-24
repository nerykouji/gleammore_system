import supabase from "@/config/supabase.config";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "./utils";

export const useInvoiceBackend = () => {
    const [invoice, setInvoice] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInvoice = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('invoice')
                .select(`
                    *,
                    orders(
                    *,
                        products(
                        *,product_images(url)
                        )
                    ),
                    users(*),
                    shipping(*),
                    payment(*)
                    `)
                .order('date', { ascending: false })

            if (error) {
                throw new Error(error.message);
            }

            setInvoice(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoice();
    }, []);

    const refreshInvoice = () => {
        fetchInvoice();
    };

    return { invoice, loading, error, refreshInvoice };

}


export const useCurrentUserInvoiceBackend = () => {
    const [invoice, setInvoice] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInvoice = async () => {
        setLoading(true);
        setError(null);

        try {

            if (getCurrentUser().id === null || getCurrentUser().id === undefined) {
                throw new Error("Please signin to continue!!")
            }

            const { data, error } = await supabase
                .from('invoice')
                .select(`
                    *,
                    orders(
                    *,
                        products(
                        *,product_images(url)
                        )
                    ),
                    users(*),
                    shipping(*),
                    payment(*)
                    `)
                .eq('user_id', getCurrentUser().id)
                .order('date', { ascending: false })

            if (error) {
                throw new Error(error.message);
            }

            setInvoice(data);
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoice();
    }, []);

    const refreshInvoice = () => {
        fetchInvoice();
    };

    return { invoice, loading, error, refreshInvoice };

}


export const useShipUpdateStatusBackend = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const shipStatusUpdate = async (ship_id, ship_status) => {
        setError(null);
        setLoading(true);

        try {

            const { error } = await supabase
                .rpc('update_ship_status', {
                    ship_id,
                    ship_status
                })

            if (error) {
                throw new Error(error.message)
            }

            toast.success("Shipping status has been updated!")
            setResponse("Shipping status has been updated!")

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    const shipCancelClient = async (ship_id) => {
        setError(null);
        setLoading(true);

        try {

            const { error } = await supabase
                .rpc('update_ship_status', {
                    ship_id,
                    ship_status:'cancel'
                })

            if (error) {
                throw new Error(error.message)
            }

            toast.success("Shipping status has been updated!")
            setResponse("Shipping status has been updated!")

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }


    return { response, error, loading, shipStatusUpdate,shipCancelClient }

}