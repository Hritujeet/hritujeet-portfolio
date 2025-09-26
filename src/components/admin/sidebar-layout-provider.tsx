"use client";
import Link from "next/link"; // Import Link for Next.js navigation
import { Menu, X, LogOut, Globe, Plus } from "lucide-react"; // Example icons

// Dummy link data (replace hrefs with your actual routes)
const mainLinks = [
    { href: "/dashboard/addBlog", label: "Add Blog", icon: Plus },
    { href: "/dashboard/addProject", label: "Add Project", icon: Plus },
];

const bottomLinks = [{ href: "/", label: "Go to Site", icon: Globe }];

const SidebarContent = () => (
    // Sidebar container, always visible on large screens, scrollable
    <aside className="w-80 min-h-full bg-base-200 p-4 flex flex-col">
        {/* Title Section */}
        <h1 className="text-xl font-bold py-4 px-3 mb-4 border-b border-base-300">
            Hritujeet's Admin Dashboard
        </h1>

        {/* Main Navigation Menu */}
        <ul className="menu flex-grow">
            {mainLinks.map((item) => (
                <li key={item.href}>
                    {/* 'btn-ghost' is applied to the link for the ghost style */}
                    <Link
                        href={item.href}
                        className="btn btn-ghost justify-start"
                    >
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>

        {/* Bottom Section: Go to Site & Sign Out */}
        <div className="border-t border-base-300 pt-4">
            {bottomLinks.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="btn btn-ghost w-full justify-start mb-2"
                >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                </Link>
            ))}

            {/* Sign Out Button (using a button for action, not navigation) */}
            <button
                className="btn btn-error btn-ghost w-full justify-start"
                onClick={() => {
                    // Add your sign-out logic here (e.g., calling an API, clearing session)
                    console.log("Signing out user...");
                    // router.push('/login'); // Example: redirect to login page
                }}
            >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
            </button>
        </div>
    </aside>
);

// Main Layout Component using DaisyUI's Drawer for mobile
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // State to manage the drawer open/close (optional, often handled by CSS/DaisyUI)
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="drawer lg:drawer-open">
            {/* Checkbox input for the drawer (controls visibility) */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main Content Area */}
            <div className="drawer-content flex flex-col items-start justify-start">
                {/* Toggle button for mobile screens */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden m-4"
                >
                    <Menu className="h-6 w-6" />
                </label>

                {/* Your Page Content goes here */}
                <main className="p-4 w-full">{children}</main>
            </div>

            {/* Sidebar Overlay (Drawer Side) */}
            <div className="drawer-side z-50">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <SidebarContent />
            </div>
        </div>
    );
}
