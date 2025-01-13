import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

const MainLayout = () => {
    return (
        <div>
            <header>
                <nav>
                    <Header></Header>
                </nav>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}

export default MainLayout
