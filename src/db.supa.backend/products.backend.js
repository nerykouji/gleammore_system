import supabase from "@/config/supabase.config";
import { useState, useEffect } from "react";
import { toast } from "sonner";



export const useAddProductBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addProduct = async (images, product) => {
        if (!product) {
            throw new Error("Product data is required!");
        } else if (!images) {
            throw new Error("Please upload the product images!")
        }

        setLoading(true);
        setError(null);

        try {

            const { data: pData, error: pError } = await supabase
                .from('products')
                .insert({ name: product.name, quantity: product.quantity, price: product.price, description: product.description, category: product.category })
                .select()


            if (pError) {
                throw new Error(`Error inserting product: ${pError.message}`);
            }
            const directoryImageP = `${pData[0].id}-${generateUID(12)}`
            const uploads = await uploadImages(images, directoryImageP)
            if (!uploads || uploads.length === 0) {
                throw new Error("No images were uploaded.");
            }

            const fetchImagesData = await fetchImages(directoryImageP);
            const urls = await Promise.all(fetchImagesData.map(async (image) => {
                return await getPublicUrl(`images/${directoryImageP}/${image.name}`);
            }));

            if (!urls || urls.length === 0) {
                throw new Error("Could not fetch the image public url.")
            }

            const pImageArray = urls.map((url) => ({
                url: url,
                product_id: pData[0].id
            }))

            const { data: imageData, error: imageError } = await supabase
                .from('product_images')
                .insert(pImageArray)
                .select()
            if (imageError || !imageData || imageData.length === 0) {
                throw new Error(`Error inserting product images: ${imageError?.message || 'No data returned'}`);
            }



            toast.success("Product added successfully!")
            setResponse("Product added successfully!");

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, addProduct };
};


export const useUpdateProductBackend = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProduct = async (product) => {
        if (!product) {
            throw new Error("Product data is required");
        }

        setLoading(true);
        setError(null);

        try {

            const { error } = await supabase
                .rpc('update_product', {
                    cat: product.category,
                    pdesc: product.description,
                    pid: product.id,
                    pname: product.name,
                    pprice: product.price,
                    pqnty: product.quantity
                })

            if (error) {
                throw new Error(error.message);
            }
            toast.success("Product updated successfully!")
            setResponse("Product updated successfully!");

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred")
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { response, loading, error, updateProduct };

}


export const useProductSingleBackend = (id) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSingleProduct = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
                    *,                        
                        product_images (url)                        
                    `)
                .eq('id', id);

            if (error) {
                throw new Error(error.message);
            }

            console.log(data);

            setProduct(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSingleProduct();
    }, []);

    const refreshProducts = () => {
        fetchSingleProduct();
    };

    return { product, loading, error, refreshProducts };

}


export const useProductsBackend = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
                    *,                        
                        product_images (url)                        
                    `);

            if (error) {
                throw new Error(error.message);
            }

            console.log(data);

            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const refreshProducts = () => {
        fetchProducts();
    };

    return { products, loading, error, refreshProducts };

}





const uploadImages = async (images, directory) => {
    if (!images || images.length === 0) {
        throw new Error("No images provided for upload.");
    }
    const promises = Array.from(images).map(async (image) => {
        if (!image.id || !image.img_file) {
            throw new Error("Invalid image object: Each image must have an id and src.");
        }

        const { data: dataImage, error: errorImage } = await supabase
            .storage
            .from('products')
            .upload(`images/${directory}/${image.id}`, image.img_file, {
                cacheControl: '3600',
                upsert: true,
            });
        if (errorImage) {
            throw errorImage;
        }

        return dataImage.Key;
    });

    return Promise.all(promises);
}

const fetchImages = async (directoryImageForProduct) => {
    const { data, error } = await supabase
        .storage
        .from('products') // Your bucket name
        .list(`images/${directoryImageForProduct}`, { sortBy: { column: 'name', order: 'asc' } });
    if (error) {
        console.error('Error fetching images:', error);
        return [];
    }
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    const filteredImages = data.filter(image =>
        image.name && imageExtensions.some(ext => image.name.toLowerCase().endsWith(ext))
    );

    return filteredImages;
};

const getPublicUrl = async (filePath) => {
    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
}

const generateUID = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const uidArray = new Array(length);

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        uidArray[i] = characters[randomIndex];
    }

    return uidArray.join('');
};