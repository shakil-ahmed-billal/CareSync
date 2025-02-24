import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { Menu } from 'lucide-react';
import { useState } from "react";
import {
    HiChartPie,
    HiCollection,
    HiInformationCircle,
    HiSearch
} from "react-icons/hi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";



const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const { userLogOut } = useAuth()

    const [admin] = useAdmin()



    return (
        <div className="">
            <div className="flex flex-col relative">
                <div className="">
                    <Button className="mt-5 fixed z-10" onClick={() => setIsOpen(true)}><Menu /></Button>
                </div>
                <div className="min-h-[calc(100vh-372px)]">
                    <Outlet></Outlet>
                </div>
            </div>
            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header title="MENU" className="mt-40" titleIcon={() => <></>} />
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
                                    {!admin ?
                                        <Sidebar.ItemGroup>
                                            <NavLink to={'/dashboard/analytics'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Analytics
                                                </Sidebar.Item>
                                            </NavLink>
                                            <NavLink to={'/dashboard/participant-profile'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Participant Profile
                                                </Sidebar.Item>
                                            </NavLink>
                                            <NavLink to={'/dashboard/register-camp'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Registered Camps
                                                </Sidebar.Item>
                                            </NavLink>
                                            <NavLink to={'/dashboard/payment-history'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Payment History
                                                </Sidebar.Item>
                                            </NavLink>
                                        </Sidebar.ItemGroup>
                                        : <Sidebar.ItemGroup>
                                            <NavLink to={'/dashboard/organizerProfile'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Organizer Profile
                                                </Sidebar.Item>
                                            </NavLink>
                                            <NavLink to={'/dashboard/add-camp'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Add a Camp
                                                </Sidebar.Item>
                                            </NavLink>
                                            <NavLink to={'/dashboard/manage-camp'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Manage Camps
                                                </Sidebar.Item>
                                            </NavLink>
                                            <NavLink to={'/dashboard/manage-registered'}>
                                                <Sidebar.Item icon={HiChartPie}>
                                                    Manage Register Camps
                                                </Sidebar.Item>
                                            </NavLink>
                                        </Sidebar.ItemGroup>}
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item href="" icon={HiCollection}>
                                            <p onClick={()=>userLogOut()}> Log Out</p>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="" icon={HiInformationCircle}>
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
