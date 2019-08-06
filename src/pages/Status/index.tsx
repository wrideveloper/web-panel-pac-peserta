import {
  Container,
  CreateButton,
  Form,
  ISchema,
  Table,
  Validation,
} from "crudone"
import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { StatusService } from "../../services/StatusService"

interface IState {
  status: IStatus[]
  loading: boolean
  error?: Error
}

export default class Status extends Component<{}, IState> {
  public state: IState = {
    status: [],
    loading: false,
  }

  public statusService = new StatusService()

  public componentDidMount() {
    this.getStatus()
  }

  public getStatus = () => {
    this.setState({ loading: true })
    this.statusService
      .get()
      .then((status) => this.setState({ status }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createStatus = (input: IStatus) => {
    this.setState({ loading: true })
    this.statusService
      .create(input)
      .then(this.getStatus)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateStatus = (input: IStatus) => {
    this.setState({ loading: true })
    this.statusService
      .update(input, input._id)
      .then(this.getStatus)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteStatus = (input: IStatus) => {
    this.setState({ loading: true })
    this.statusService
      .delete(input._id)
      .then(this.getStatus)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
    }

    return (
      <Fragment>
        <Header
          content="Data Status Tim"
          subheader="Kumpulan data status tim"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.status}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Status"
            updateTitle="Ubah Status"
            onCreate={this.createStatus}
            onUpdate={this.updateStatus}
            onDelete={this.deleteStatus}
          />
        </Container>
      </Fragment>
    )
  }
}
