interface IHadiah {
  _id: string
  judul: string
  nominal: number
}

interface IKontak {
  _id: string
  nama: string
  telp: string
}

interface IMediaPartner {
  _id: string
  nama: string
  logo: string
}

interface IPeserta {
  _id: string
  nama: string
  nim: string
  ktm: string
  foto: string
  tim: ITim
}

interface ISupportedBy {
  _id: string
  nama: string
  logo: string
}

interface ITim {
  _id: string
  nama: string
  universitas: IUniversitas
  ketua: IPeserta
  email: string
  telp: string
  username: string
  password: string
  status: IStatus
}

interface IStatus {
  _id: string
  nama: string
}

interface IJenisPengumpulan {
  _id: string
  nama: string
  timeline: ITimeline
  status: IStatus
}

interface IPengumpulan {
  _id: string
  jenisPengumpulan: IJenisPengumpulan
  file: string
  tim: ITim
}

interface ITimeline {
  _id: string
  nama: string
  tgl_mulai: Date
  tgl_selesai: Date
  deskripsi: string
}

interface IUniversitas {
  _id: string
  nama: string
}

interface IAdmin {
  _id: string
  username: string
  password: string
}

interface IRoute {
  name: string
  label?: string
  icon?: string
  path: string
  component: React.FunctionComponent | React.Components
  hide?: boolean
  private?: boolean
}

interface IAppContext {
  token: string
  user: IAdmin
  login: (token: string, user: IAdmin, callback: () => void) => void
  logout: () => void
  isLoggedIn: () => boolean
}

interface ILogin {
  success: boolean
  token?: string
}
