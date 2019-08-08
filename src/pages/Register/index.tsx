import React, { Component, ReactNode } from "react"
import {
  Button,
  Card,
  Divider,
  Form,
  Grid,
  Icon,
  Step,
} from "semantic-ui-react"
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic"

import { Formik } from "formik"
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
  nama: yup.string().required(),
  namaAplikasi: yup
    .string()
    .required()
    .label("nama aplikasi"),
  universitas: yup.string().required(),
  ketua: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  telp: yup.string().required(),
  username: yup
    .string()
    .required()
    .min(6),
  password: yup
    .string()
    .required()
    .min(6),
  konfirmasi: yup
    .string()
    .oneOf([yup.ref("password")], "wrong confirmation password")
    .required(),
  peserta: yup
    .array()
    .required()
    .min(2)
    .max(3),
})

interface IState {
  step: number
}

export default class Register extends Component<{}, IState> {
  public state: IState = {
    step: 0,
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

  public submit = (values: IFormState) => {
    const { konfirmasi, peserta, ...rest } = values
    this.timService.create(rest as any).then((tim) => {
      peserta.forEach((item) => {
        item.tim = tim._id
        this.pesertaService.daftar(item as any, tim._id)
      })
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
                    <Button
                      type="submit"
                      color="green"
                      content="Selesai"
                      floated="right"
                    />
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
