import React, { Component, ReactNode } from "react"
import {
  Button,
  Card,
  Divider,
  Form,
  Grid,
  Icon,
  Loader,
  Step,
} from "semantic-ui-react"
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic"

import { Formik, FormikActions } from "formik"
import { RouteComponentProps } from "react-router"
import * as yup from "yup"
import { PesertaService } from "../../services/PesertaService"
import { TimService } from "../../services/TimService"
import { Akun, Anggota, Ketua, Tim } from "./components"

interface IStep {
  title: string
  icon: SemanticICONS
  description: string
  component: ReactNode
}

const steps: IStep[] = [
  {
    title: "Tim",
    icon: "shield",
    description: "Mengisi informasi tim",
    component: <Tim />,
  },
  {
    title: "Anggota",
    icon: "group",
    description: "Mengisi informasi anggota tim",
    component: <Anggota />,
  },
  {
    title: "Ketua",
    icon: "user",
    description: "Pilih ketua tim",
    component: <Ketua />,
  },
  {
    title: "Akun",
    icon: "user",
    description: "Mengisi informasi akun",
    component: <Akun />,
  },
]

interface IFormState {
  nama: string
  namaAplikasi: string
  universitas: string
  ketua: string
  email: string
  telp: string
  username: string
  password: string
  konfirmasi: string
  peserta: Array<{
    _id: string
    nama: string
    nim: string
    ktm: File
    foto: File
    tim: string,
  }>
}

const initialValues: IFormState = {
  nama: "",
  namaAplikasi: "",
  universitas: "",
  ketua: "",
  email: "",
  telp: "",
  username: "",
  password: "",
  konfirmasi: "",
  peserta: [],
}

const validationSchema = yup.object().shape({
  nama: yup.string().required("nama wajib diisi"),
  namaAplikasi: yup.string().required("nama aplikasi wajib diisi"),
  universitas: yup.string().required("universitas wajib diisi"),
  ketua: yup.string().required("ketua wajib diisi"),
  email: yup
    .string()
    .email("format email tidak benar")
    .required("email wajib diisi"),
  telp: yup.string().required("telpon wajib diisi"),
  username: yup
    .string()
    .required("username wajib diisi")
    .min(6, "minimal 6 karakter"),
  password: yup
    .string()
    .required("password wajib diisi")
    .min(6, "minimal 6 karakter"),
  konfirmasi: yup
    .string()
    .oneOf([yup.ref("password")], "konfirmasi password salah")
    .required("konfirmasi password wajib diisi"),
  peserta: yup
    .array()
    .required("anggota tim wajib diisi")
    .min(2, "jumlah anggota tim minimal 2 orang")
    .max(3, "jumlah anggota tim maksimal 3 orang"),
})

interface IState {
  step: number
  loading: boolean
}

export default class Register extends Component<RouteComponentProps, IState> {
  public state: IState = {
    step: 0,
    loading: false,
  }

  public timService = new TimService()
  public pesertaService = new PesertaService()

  public nextStep = () => {
    if (this.state.step < steps.length - 1)
      this.setState((prevState) => ({
        step: prevState.step + 1,
      }))
  }

  public prevStep = () => {
    if (this.state.step > 0)
      this.setState((prevState) => ({
        step: prevState.step - 1,
      }))
  }

  public submit = (
    values: IFormState,
    formikAction: FormikActions<IFormState>,
  ) => {
    this.setState({ loading: true })
    const { konfirmasi, peserta, ...rest } = values
    this.timService.create(rest as any).then((tim: any) => {
      if (tim.message) {
        formikAction.setFieldError("username", "username sudah ada")
        this.setState({ loading: false })
      } else {
        const promise: Array<Promise<IPeserta>> = []
        peserta.forEach((item) => {
          item.tim = tim._id
          promise.push(this.pesertaService.daftar(item as any, tim._id))
        })
        Promise.all(promise).then(() => {
          this.setState({ loading: false })
          this.props.history.push("/login")
        })
      }
    })
  }

  public render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Pendaftaran</Card.Header>

          <Step.Group fluid>
            {steps.map((step, index) => (
              <Step
                active={this.state.step === index}
                key={index}
                onClick={() => this.setState({ step: index })}
              >
                <Icon name={step.icon} />
                <Step.Content>
                  <Step.Title>{step.title}</Step.Title>
                  <Step.Description>{step.description}</Step.Description>
                </Step.Content>
              </Step>
            ))}
          </Step.Group>

          <Formik
            initialValues={initialValues}
            onSubmit={this.submit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                {steps[this.state.step].component}
                <Divider />

                <Grid columns="2">
                  <Grid.Column>
                    <Button
                      type="button"
                      icon
                      labelPosition="left"
                      color="blue"
                      onClick={this.prevStep}
                      disabled={this.state.step === 0}
                    >
                      Sebelumnya
                      <Icon name="arrow left" />
                    </Button>

                    <Button
                      type="button"
                      icon
                      labelPosition="right"
                      color="blue"
                      onClick={this.nextStep}
                      disabled={this.state.step === steps.length - 1}
                    >
                      Selanjutnya
                      <Icon name="arrow right" />
                    </Button>
                  </Grid.Column>

                  <Grid.Column>
                    {this.state.step === steps.length - 1 && (
                      <Button
                        type="submit"
                        color="green"
                        content={
                          this.state.loading ? (
                            <Loader active inline inverted size="small" />
                          ) : (
                            "Selesai"
                          )
                        }
                        floated="right"
                      />
                    )}
                  </Grid.Column>
                </Grid>
              </Form>
            )}
          </Formik>
        </Card.Content>
      </Card>
    )
  }
}
