import supabase from "@/config/supabase.config";
import Cookies from "js-cookie";

import { useState, useEffect } from "react";
import { toast } from "sonner";



export const useAddUserBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addUser = async (user) => {
        if (!user) {
            throw new Error("User data is required");
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.rpc("add_user", {
                usrname: user.username,
                uname: user.name,
                uemail: user.email,
                uaddress: user.address,
                ucont: user.contact_no,
                usex: user.sex
            });


            if (error) {
                throw new Error(error.message);
            }
            toast.success("User added successfully!")
            setResponse("User added successfully!");
            return { response }

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const addUserClient = async (user) => {
        if (!user) {
            throw new Error("User data is required");
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.rpc("add_user", {
                usrname: user.username,
                uname: user.name,
                uemail: user.email,
                uaddress: user.address,
                ucont: user.contact_no,
                usex: user.sex,
                upass:user.password
            });


            if (error) {
                throw new Error(error.message);
            }
            toast.success("User added successfully!")
            setResponse("User added successfully!");
            return { response }

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, addUser,addUserClient};
};



export const useUpdateUserBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = async (user) => {
        if (!user) {
            throw new Error("User data is required");
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.rpc("update_user", {
                uid: user.id,
                uname: user.name,
                uemail: user.email,
                uaddress: user.address,
                ucont: user.contact_no,
                usex: user.sex
            });


            if (error) {
                throw new Error(error.message);
            }
            toast.success("User updated successfully!")
            setResponse("User updated successfully!");

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, updateUser };

}



export const useUsersBackend = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('users')
                .select(`
                    *,cart(
                        *,                  
                            products(
                            *,
                                product_images(
                                *)
                            )  
                        )
                    `)
                .eq('role', 0);

            if (error) {
                throw new Error(error.message);
            }

            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const refreshUsers = () => {
        fetchUsers();
    };

    return { users, loading, error, refreshUsers };

}


export const useUserAuthBackend = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {

            const { data, error } = await supabase
                .from('users')
                .select("*")
                .eq('username', username)
                .eq('password', password)
                .single()


            if (error) {
                throw new Error("Wrong credentials!");
            }

            Cookies.set('token', JSON.stringify(data));
            setUser(data);

            return data;

        } catch (error) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }
    return { user, loading, error, login }
}





