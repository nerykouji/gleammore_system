import AdminDashboardComp from "./dashboard/dashboard.comp";
import AdminInvoiceComp from "./invoice/invoice.comp";
import AdminProductsComp from "./products/products.comp";
import AdminUsersComp from "./users/users.comp";

const MainContent = ({ activeItem }) => {




    const renderContent = () => {
        switch (activeItem) {
            case 'Dashboard':
                return <>
                    <AdminDashboardComp />
                </>;
            case 'Products':
                return <>
                    <AdminProductsComp />
                </>
            case 'Users':
                return <>
                    <AdminUsersComp />
                </>;
            case 'Invoice':
                return <>
                    <AdminInvoiceComp />
                </>
            case 'Settings':
                return <div>Here you can adjust your settings.</div>;
            default:
                return <div>Select a menu item to see content.</div>;
        }
    };

    return (
        <div className="flex-grow p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">{activeItem}</h2>
            {renderContent()}
        </div>
    );
};

export default MainContent;