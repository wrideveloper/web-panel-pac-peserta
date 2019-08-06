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
import { KontakService } from "../../services/KontakService"

interface IState {
  kontak: IKontak[]
  loading: boolean
  error?: Error
}

export default class Kontak extends Component<{}, IState> {
  public state: IState = {
    kontak: [],
    loading: false,
  }

  public kontakService = new KontakService()

  public componentDidMount() {
    this.getKontak()
  }

  public getKontak = () => {
    this.setState({ loading: true })
    this.kontakService
      .get()
      .then((kontak) => this.setState({ kontak }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createKontak = (input: IKontak) => {
    this.setState({ loading: true })
    this.kontakService
      .create(input)
      .then(this.getKontak)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateKontak = (input: IKontak) => {
    this.setState({ loading: true })
    this.kontakService
      .update(input, input._id)
      .then(this.getKontak)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteKontak = (input: IKontak) => {
    this.setState({ loading: true })
    this.kontakService
      .delete(input._id)
      .then(this.getKontak)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
      telp: {
        label: "Telpon",
        validations: [Validation.required, Validation.numeric],
      },
    }

    return (
      <Fragment>
        <Header content="Kontak" subheader="Kumpulan data kontak" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.kontak}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Kontak"
            updateTitle="Ubah Kontak"
            onCreate={this.createKontak}
            onUpdate={this.updateKontak}
            onDelete={this.deleteKontak}
          />
        </Container>
      </Fragment>
    )
  }
}
