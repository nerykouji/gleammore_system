import { useDashboardBackend } from "@/db.supa.backend/dashboard.backend";



const AdminDashboardComp = () => {

    const { totalUser, totalProducts, monthlyIncome, yearlyIncome, loading, error } = useDashboardBackend();


    return (
        <div>


            <div className="p-6 bg-gray-100 min-h-max">
                             
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-3xl font-bold">{totalUser}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Total Products</h2>
                        <p className="text-3xl font-bold">{totalProducts}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Monthly Income</h2>
                        <p className="text-3xl font-bold">₱{monthlyIncome}</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Yearly Income</h2>
                        <p className="text-3xl font-bold">₱{yearlyIncome}</p>
                    </div>

                    {/* <div class="bg-white shadow-md rounded-lg p-4">
                        <h2 class="text-lg font-semibold">Custom Metric</h2>
                        <p class="text-3xl font-bold">Value Here</p>
                    </div> */}

                </div>
            </div>




        </div>
    )
}

export default AdminDashboardComp;