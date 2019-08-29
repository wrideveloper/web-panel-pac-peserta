import Login from "../pages/Login"
import Pengumpulan from "../pages/Pengumpulan"
import Register from "../pages/Register"
import Tim from "../pages/Tim"

const routes: IRoute[] = [
  {
    name: "tim",
    component: Tim,
    label: "Informasi Tim",
    icon: "group",
    path: "/",
    private: true,
    hide: true,
  },
  {
    name: "tim",
    component: Tim,
    label: "Informasi Tim",
    icon: "group",
    path: "/tim",
    private: true,
  },
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
  {
    name: "register",
    component: Register,
    path: "/register",
    hide: true,
  },
]

export default routes
