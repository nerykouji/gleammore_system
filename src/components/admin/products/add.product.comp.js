
import { useState } from 'react';
import Image from 'next/image';
import { useAddProductBackend } from '@/db.supa.backend/products.backend';

const AddAdminProductComp = ({ setAdding, handleRefresh }) => {
    const [images, setImages] = useState([]);
    const { loading, addProduct } = useAddProductBackend();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        quantity: "",
        price: "",
        category: ""
    })

    const handleProduct = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            id: generateUID(file.name),
            src: URL.createObjectURL(file),
            name: file.name,
            img_file: file
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const generateUID = (imageName) => {
        const ext = imageName.split('.').pop();
        return `img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    };

    const removeImage = (id) => {
        setImages(images.filter((image) => image.id !== id));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length > 0) {
            await addProduct(images, product)
            setAdding(false);
            handleRefresh();
        }
    }

    return (
        <div className="bg-gray-50 w-full rounded-lg shadow-lg">
            <div className="p-6  max-w-lg">
                <button className='bg-orange-200 p-2 rounded-sm text-sm my-5' onClick={() => {
                    setAdding(false);
                }} > Back </button>
                <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            required
                            name="name"
                            value={product.name}
                            onChange={handleProduct}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter product description"
                            name='description'
                            value={product.description}
                            onChange={handleProduct}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Quantity</label>
                        <input
                            type="number"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter quantity"
                            name='quantity'
                            value={product.quantity}
                            onChange={handleProduct}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Price</label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            min="0"
                            name="price"
                            value={product.price}
                            onChange={handleProduct}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter price"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Category</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter category"
                            name='category'
                            value={product.category}
                            onChange={handleProduct}
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Upload Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full mb-4"
                            required
                        />
                        <div className="flex flex-wrap gap-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <Image src={image.src} alt={`Uploaded image ${index + 1}`} width={100} height={100} className="rounded-md" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(image.id)}
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className={`w-full ${loading?"bg-slate-300":"bg-blue-600 hover:bg-blue-700"}  text-white font-semibold py-2 rounded-md`} disabled={loading}>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAdminProductComp;