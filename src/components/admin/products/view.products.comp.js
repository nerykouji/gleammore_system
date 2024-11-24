import { dateFormatter } from "@/db.supa.backend/utils";


const ViewAdminProductsComp = ({ products, setSelectedProduct, setEditing,setAdding }) => {



    return (
        <div className="mt-10">

            <button className='bg-orange-200 p-2 rounded-sm text-sm my-5' onClick={() => {
                setAdding(true);
            }} > Add product </button>

            <table className="table-auto w-full text-sm text-left text-gray-500 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th>
                            Images
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Added
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        return (
                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                                <th scope="row" className="px-1 py-1 font-medium text-gray-900">
                                    <img src={product.product_images[0].url} className="w-[150px] h-auto"/>
                                </th>
                                <th scope="row" className="px-4 py-2 font-medium text-gray-900">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">
                                    {product.description}
                                </td>
                                <td className="px-6 py-4">
                                    {product.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4">
                                    {dateFormatter(product.added_date)}
                                </td>
                                <td className="px-6 py-4">
                                    <a className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setEditing(true);
                                        }}
                                    >Edit</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )
}


export default ViewAdminProductsComp;