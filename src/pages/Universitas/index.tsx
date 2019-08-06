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
import { UniversitasService } from "../../services/UniversitasService"

interface IState {
  universitas: IUniversitas[]
  loading: boolean
  error?: Error
}

export default class Universitas extends Component<{}, IState> {
  public state: IState = {
    universitas: [],
    loading: false,
  }

  public universitasService = new UniversitasService()

  public componentDidMount() {
    this.getUniversitas()
  }

  public getUniversitas = () => {
    this.setState({ loading: true })
    this.universitasService
      .get()
      .then((universitas) => this.setState({ universitas }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createUniversitas = (input: IUniversitas) => {
    this.setState({ loading: true })
    this.universitasService
      .create(input)
      .then(this.getUniversitas)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateUniversitas = (input: IUniversitas) => {
    this.setState({ loading: true })
    this.universitasService
      .update(input, input._id)
      .then(this.getUniversitas)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteUniversitas = (input: IUniversitas) => {
    this.setState({ loading: true })
    this.universitasService
      .delete(input._id)
      .then(this.getUniversitas)
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
        <Header content="Universitas" subheader="Kumpulan data universitas" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.universitas}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Universitas"
            updateTitle="Ubah Universitas"
            onCreate={this.createUniversitas}
            onUpdate={this.updateUniversitas}
            onDelete={this.deleteUniversitas}
          />
        </Container>
      </Fragment>
    )
  }
}
