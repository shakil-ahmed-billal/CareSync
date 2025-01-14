import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { Menu } from 'lucide-react';
import { useState } from "react";
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiInformationCircle,
    HiLogin,
    HiPencil,
    HiSearch,
    HiShoppingBag,
    HiUsers,
} from "react-icons/hi";
import { Outlet } from "react-router-dom";



const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);

    return (
        <div className="h-[300px] max-h-[300px]">
            <div className="flex flex-col relative">
                <div className="">
                    <Button className="mt-5 absolute" onClick={() => setIsOpen(true)}><Menu /></Button>
                </div>
                <div className="">
                    <Outlet></Outlet>
                </div>
            </div>
            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="MENU" className="mt-20" titleIcon={() => <></>} />
                <Drawer.Items>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-between py-2 ">
                            <div>
                                <form className="pb-3 md:hidden">
                                    <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                                </form>
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item href="/" icon={HiChartPie}>
                                            Organizer Profile
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/e-commerce/products" icon={HiShoppingBag}>
                                            Add Camp
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/users/list" icon={HiUsers}>
                                            Manage Camp
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                                            Manage Register Camp
                                        </Sidebar.Item>
                                        <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                                            User Manage
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                                            Log Out
                                        </Sidebar.Item>
                                        <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                                            Help
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </div>
                        </div>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </div>
    );
}

export default Dashboard
