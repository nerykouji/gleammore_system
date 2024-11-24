import supabase from "@/config/supabase.config";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useDashboardBackend = () => {
    const [totalUser, setTotalUser] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [yearlyIncome, setYearlyIncome] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error before fetching

            try {
                await Promise.all([
                    fetching('get_total_users', setTotalUser),
                    fetching('get_monthly_income', setMonthlyIncome),
                    fetching('get_yearly_income', setYearlyIncome),
                    fetching('get_total_products', setTotalProducts)
                ]);
            } catch (err) {              
                console.error("Fetch error:", err); 
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    const fetching = async (rpcFunction, setter) => {
        try {
            const { data, error } = await supabase.rpc(rpcFunction);

            if (error) {
                throw new Error(error.message);
            }
            setter(data);
        } catch (err) {
            toast.error(`Error fetching ${rpcFunction}: ${err.message}`);
            setError(err.message);
        }
    };

    return { totalUser, monthlyIncome, yearlyIncome, totalProducts, loading, error };
};