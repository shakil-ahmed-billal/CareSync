import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import MainFooter from "../components/footer/MainFooter"


const MainLayout = () => {
    return (
        <div className="dark:bg-dark1  bg-light2">
            <header>
                <nav>
                    <Header></Header>
                </nav>
            </header>
            <section className="dark:bg-dark1  bg-light2">
                <main className="min-h-screen w-11/12 mx-auto pt-20 ">
                    <Outlet></Outlet>
                </main>
            </section>
            <footer>
                <MainFooter></MainFooter>
            </footer>
        </div>
    )
}

export default MainLayout
