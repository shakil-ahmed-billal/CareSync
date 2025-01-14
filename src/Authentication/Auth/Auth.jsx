import { Outlet } from "react-router-dom"

const Auth = () => {
  return (
    <div className="dark:bg-dark1  bg-light2">
      <main >
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Auth
