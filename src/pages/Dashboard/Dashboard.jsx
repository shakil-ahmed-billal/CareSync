import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { Menu } from 'lucide-react';
import { useState } from "react";
import {
    HiChartPie,
    HiCollection,
    HiInformationCircle,
    HiLogin,
    HiPencil,
    HiSearch,
    HiShoppingBag,
    HiUsers
} from "react-icons/hi";
import { Link, NavLink, Outlet } from "react-router-dom";



const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);

    return (
        <div className="h-[300px] max-h-[300px]">
            <div className="flex flex-col relative">
                <div className="">
                    <Button className="mt-5 fixed z-50" onClick={() => setIsOpen(true)}><Menu /></Button>
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
                                        <NavLink to={'/dashboard/profile'}>
                                            <Sidebar.Item icon={HiChartPie}>
                                                Organizer Profile
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to={'/dashboard/add-camp'}>
                                            <Sidebar.Item icon={HiChartPie}>
                                                Add a Camp
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to={'/dashboard/'}>
                                            <Sidebar.Item icon={HiChartPie}>
                                                Manage Camps
                                            </Sidebar.Item>
                                        </NavLink>
                                        <NavLink to={'/dashboard/'}>
                                            <Sidebar.Item icon={HiChartPie}>
                                                Manage Register Camps
                                            </Sidebar.Item>
                                        </NavLink>
                                        
                                        
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
