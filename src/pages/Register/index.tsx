import React, { Component, ReactNode } from "react"
import { Button, Card, Icon, Step } from "semantic-ui-react"
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic"

interface IState {
  step: number
}

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
    component: <div>tim</div>,
  },
  {
    title: "Anggota",
    icon: "group",
    description: "Mengisi informasi anggota tim",
    component: <div>anggota</div>,
  },
  {
    title: "Akun",
    icon: "user",
    description: "Mengisi informasi akun",
    component: <div>Akun</div>,
  },
]

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
              <Step active={this.state.step === index} key={index}>
                <Icon name={step.icon} />
                <Step.Content>
                  <Step.Title>{step.title}</Step.Title>
                  <Step.Description>{step.description}</Step.Description>
                </Step.Content>
              </Step>
            ))}
          </Step.Group>

          {steps[this.state.step].component}

          <Button
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
            icon
            labelPosition="right"
            color="blue"
            onClick={this.nextStep}
            disabled={this.state.step === steps.length - 1}
          >
            Selanjutnya
            <Icon name="arrow right" />
          </Button>
        </Card.Content>
      </Card>
    )
  }
}
