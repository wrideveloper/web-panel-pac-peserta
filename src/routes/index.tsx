import Anggota from "../pages/Anggota"
import Checkin from "../pages/Checkin"
import Divisi from "../pages/Divisi"
import Jabatan from "../pages/Jabatan"
import Miniclass from "../pages/Miniclass"
import Presensi from "../pages/Presensi"

const routes: IRoute[] = [
  {
    component: Anggota,
    label: "Anggota",
    path: "/anggota",
  },
  {
    component: Divisi,
    label: "Divisi",
    path: "/divisi",
  },
  {
    component: Jabatan,
    label: "Jabatan",
    path: "/jabatan",
  },
  {
    component: Miniclass,
    label: "Miniclass",
    path: "/miniclass",
  },
  {
    component: Presensi,
    label: "Presensi",
    path: "/presensi",
  },
  {
    component: Checkin,
    label: "Presensi",
    path: "/presensi/:id",
    hide: true,
  },
]

export default routes
