import Login from "../pages/Login"
import Pengumpulan from "../pages/Pengumpulan"

const routes: IRoute[] = [
  {
    name: "pengumpulan",
    component: Pengumpulan,
    label: "Pengumpulan",
    icon: "file",
    path: "/pengumpulan",
    private: true,
  },
  {
    name: "login",
    component: Login,
    path: "/login",
    hide: true,
  },
]

export default routes
