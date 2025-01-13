import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

const MainLayout = () => {
    return (
        <div className="dark:bg-dark1  bg-light2">
            <header>
                <nav>
                    <Header></Header>
                </nav>
            </header>
            <main className="min-h-[calc(100vh-60px)] w-11/12 mx-auto">
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}

export default MainLayout
