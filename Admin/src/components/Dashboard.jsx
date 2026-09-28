import { Link } from "react-router-dom";
import {
    IndianRupee,
    ShoppingBag,
    Users,
    Package,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    MoreHorizontal,
    Clock3,
    CheckCircle2,
    Truck,
    XCircle,
    AlertTriangle,
    Plus,
    Eye,
} from "lucide-react";
import BestSelling1 from '../components/Assets/product_2.png';
import BestSelling2 from '../components/Assets/product_14.png';
import BestSelling3 from '../components/Assets/product_15.png';
import BestSelling4 from '../components/Assets/product_25.png';



const Dashboard = () => {
    const stats = [
        {
            title: "Total Revenue",
            value: "₹2,48,560",
            change: "+12.8%",
            positive: true,
            icon: IndianRupee,
            bg: "bg-cyan-50",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600",
        },
        {
            title: "Total Orders",
            value: "1,248",
            change: "+8.4%",
            positive: true,
            icon: ShoppingBag,
            bg: "bg-blue-50",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Customers",
            value: "3,642",
            change: "+5.2%",
            positive: true,
            icon: Users,
            bg: "bg-purple-50",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            title: "Products",
            value: "286",
            change: "-2.1%",
            positive: false,
            icon: Package,
            bg: "bg-orange-50",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
        },
    ];

    const recentOrders = [
        {
            id: "#VS-10482",
            customer: "Rahul Sharma",
            product: "Classic Oversized T-Shirt",
            amount: "₹1,299",
            status: "Delivered",
        },
        {
            id: "#VS-10481",
            customer: "Priya Singh",
            product: "Women Relaxed Fit Hoodie",
            amount: "₹1,899",
            status: "Processing",
        },
        {
            id: "#VS-10480",
            customer: "Aman Kumar",
            product: "Slim Fit Denim Jacket",
            amount: "₹2,499",
            status: "Shipped",
        },
        {
            id: "#VS-10479",
            customer: "Neha Verma",
            product: "Cotton Cargo Pants",
            amount: "₹1,599",
            status: "Delivered",
        },
        {
            id: "#VS-10478",
            customer: "Rohit Gupta",
            product: "Premium Polo T-Shirt",
            amount: "₹999",
            status: "Cancelled",
        },
    ];

    const bestProducts = [
        {
            name: "Light Pink T-Shirt",
            category: "T-Shirts",
            sold: 248,
            revenue: "₹3,22,400",
            image: BestSelling1
        },
        {
            name: "White and blue Jacket",
            category: "Hoodies",
            sold: 186,
            revenue: "₹3,53,400",
            image: BestSelling2,
        },
        {
            name: "Black-white Jacket",
            category: "Jackets",
            sold: 142,
            revenue: "₹3,54,958",
            image: BestSelling3,
        },
        {
            name: "Light blue hoodie",
            category: "Pants",
            sold: 118,
            revenue: "₹1,88,682",
            image: BestSelling4,
        },
    ];

    const lowStock = [
        {
            name: "Premium Polo T-Shirt",
            category: "T-Shirts",
            stock: 8,
        },
        {
            name: "Classic Denim Shirt",
            category: "Shirts",
            stock: 5,
        },
        {
            name: "Urban Cargo Pants",
            category: "Pants",
            stock: 3,
        },
    ];

    const chartData = [
        { day: "Mon", value: 38 },
        { day: "Tue", value: 52 },
        { day: "Wed", value: 45 },
        { day: "Thu", value: 68 },
        { day: "Fri", value: 56 },
        { day: "Sat", value: 82 },
        { day: "Sun", value: 72 },
    ];

    const statusStyle = {
        Delivered: {
            icon: CheckCircle2,
            style: "bg-green-50 text-green-600",
        },
        Processing: {
            icon: Clock3,
            style: "bg-yellow-50 text-yellow-600",
        },
        Shipped: {
            icon: Truck,
            style: "bg-blue-50 text-blue-600",
        },
        Cancelled: {
            icon: XCircle,
            style: "bg-red-50 text-red-600",
        },
    };

    return (
        <div className="min-h-screen bg-[#f5f7f9] p-5 md:p-7">
            {/* PAGE HEADER */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here's what's happening with Vashtra today.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link to='/addproduct' className="flex items-center gap-2 rounded-xl bg-[#06b6d4] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0891b2]">
                        <Plus size={18} />
                        Add Product
                    </Link>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className={`rounded-2xl border border-gray-100 ${item.bg} p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {item.title}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                        {item.value}
                                    </h2>
                                </div>

                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}
                                >
                                    <Icon size={21} className={item.iconColor} />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <span
                                    className={`flex items-center gap-1 text-xs font-semibold ${item.positive ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {item.positive ? (
                                        <TrendingUp size={14} />
                                    ) : (
                                        <TrendingDown size={14} />
                                    )}

                                    {item.change}
                                </span>

                                <span className="text-xs text-gray-400">
                                    vs last month
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CHART + ORDER STATUS */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
                {/* SALES CHART */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Sales Overview
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Revenue generated this week
                            </p>
                        </div>

                        <select className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600 outline-none">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <p className="text-3xl font-bold text-gray-900">
                                ₹68,420
                            </p>

                            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600">
                                <ArrowUpRight size={14} />
                                14.6% from last week
                            </div>
                        </div>
                    </div>

                    {/* GRAPH */}
                    <div className="mt-8 h-56">
                        <div className="flex h-full">
                            {/* Y AXIS */}
                            <div className="flex h-full w-12 flex-col justify-between pb-5 text-[10px] text-gray-400">
                                <span>₹80k</span>
                                <span>₹60k</span>
                                <span>₹40k</span>
                                <span>₹20k</span>
                                <span>₹0</span>
                            </div>

                            {/* GRAPH AREA */}
                            <div className="relative flex-1">
                                {/* GRID */}
                                <div className="absolute inset-0 flex flex-col justify-between pb-5">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div
                                            key={item}
                                            className="border-t border-dashed border-gray-100"
                                        />
                                    ))}
                                </div>

                                {/* BARS */}
                                <div className="relative flex h-full items-end justify-around gap-3 px-2 pb-5">
                                    {chartData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="group flex h-full flex-1 flex-col justify-end"
                                        >
                                            <div className="relative flex h-full items-end justify-center">
                                                <div
                                                    className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-cyan-500 to-cyan-300 transition-all duration-300 group-hover:from-cyan-600 group-hover:to-cyan-400"
                                                    style={{
                                                        height: `${item.value}%`,
                                                    }}
                                                >
                                                    <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-[10px] text-white group-hover:block">
                                                        ₹{item.value}k
                                                    </span>
                                                </div>
                                            </div>

                                            <span className="mt-3 text-center text-[11px] text-gray-400">
                                                {item.day}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ORDER STATUS */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Order Status
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Current order distribution
                            </p>
                        </div>
                    </div>

                    {/* DONUT */}
                    <div className="relative mx-auto mt-7 h-44 w-44">
                        <div
                            className="h-full w-full rounded-full"
                            style={{
                                background:
                                    "conic-gradient(#06b6d4 0deg 190deg, #3b82f6 190deg 275deg, #facc15 275deg 330deg, #ef4444 330deg 360deg)",
                            }}
                        />

                        <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
                            <span className="text-2xl font-bold text-gray-900">
                                1,248
                            </span>
                            <span className="text-xs text-gray-400">
                                Total Orders
                            </span>
                        </div>
                    </div>

                    <div className="mt-7 space-y-3">
                        {[
                            ["Delivered", "684", "bg-cyan-500"],
                            ["Shipped", "302", "bg-blue-500"],
                            ["Processing", "176", "bg-yellow-400"],
                            ["Cancelled", "86", "bg-red-500"],
                        ].map(([name, count, color]) => (
                            <div
                                key={name}
                                className="flex items-center justify-between text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${color}`}
                                    />

                                    <span className="text-gray-600">{name}</span>
                                </div>

                                <span className="font-semibold text-gray-800">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RECENT ORDERS + BEST PRODUCTS */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_1fr]">
                {/* RECENT ORDERS */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 p-5">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Recent Orders
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Latest customer orders
                            </p>
                        </div>

                        <button className="flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:text-cyan-700">
                            View All
                            <ArrowUpRight size={16} />
                        </button>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px]">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-400">
                                        ORDER
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold text-gray-400">
                                        CUSTOMER
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold text-gray-400">
                                        PRODUCT
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold text-gray-400">
                                        AMOUNT
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold text-gray-400">
                                        STATUS
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentOrders.map((order) => {
                                    const StatusIcon = statusStyle[order.status].icon;

                                    return (
                                        <tr
                                            key={order.id}
                                            className="border-b border-gray-50 transition hover:bg-cyan-50/30"
                                        >
                                            <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                                                {order.id}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {order.customer}
                                            </td>

                                            <td className="max-w-40 truncate px-5 py-4 text-sm text-gray-500">
                                                {order.product}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                                                {order.amount}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[order.status].style}`}
                                                >
                                                    <StatusIcon size={12} />
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* BEST SELLING */}
                <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 p-5">
                        <div>
                            <h2 className="font-bold text-gray-900">
                                Best Selling Products
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Top products by sales
                            </p>
                        </div>

                        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-50">
                            <MoreHorizontal size={19} />
                        </button>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {bestProducts.map((product, index) => (
                            <div
                                key={product.name}
                                className="flex items-center gap-3 p-4 transition hover:bg-gray-50"
                            >
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />

                                    <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-gray-700 shadow">
                                        {index + 1}
                                    </span>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-sm font-semibold text-gray-800">
                                        {product.name}
                                    </h3>

                                    <p className="mt-0.5 text-xs text-gray-400">
                                        {product.category} · {product.sold} sold
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-800">
                                        {product.revenue}
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-green-600">
                                        +12.4%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;