import { Outlet } from "react-router-dom"

const Auth = () => {
  return (
    <div>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Auth
