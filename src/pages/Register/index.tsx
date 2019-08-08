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

interface IState {
  step: number
}

export default class Register extends Component<{}, IState> {
  public state: IState = {
    step: 0,
  }

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
            onSubmit={(value) => alert(JSON.stringify(value))}
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

                  <Grid.Column textAlign="right">
                    {this.state.step === steps.length - 1 && (
                      <Button type="submit" color="green" content="Selesai" />
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
