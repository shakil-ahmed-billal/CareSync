import {
    Avatar,
    DarkThemeToggle,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { NavLink } from "react-router-dom";


const Header = () => {
    return (
        <div>
            <Navbar className="sticky top-0 w-full z-50 dark:bg-dark2 text-text1" fluid >
                <NavbarBrand href="">
                    <img src="logo.png" className="mr-3 md:ml-12 h-10 sm:h-9 lg:h-12" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">CareSync</span>
                </NavbarBrand>
                <div className="flex md:order-2 md:mr-12">
                    <DarkThemeToggle />
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}>
                        <DropdownHeader>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </DropdownHeader>
                        <DropdownItem>Dashboard</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Earnings</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem>Sign out</DropdownItem>
                    </Dropdown>
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    <NavbarLink ><NavLink to={'/'}>Home</NavLink></NavbarLink>
                    <NavbarLink ><NavLink to={'/all-camps'}>Available Camps</NavLink></NavbarLink>
                    <NavbarLink ><NavLink to={'/dashboard'}>Dashboard</NavLink></NavbarLink>
                    <NavbarLink ><NavLink to={'/auth/login'}>Join Us</NavLink></NavbarLink>
                </NavbarCollapse>
            </Navbar>
        </div>
    )
}

export default Header
