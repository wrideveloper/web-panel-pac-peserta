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
import { HadiahService } from "../../services/HadiahService"

interface IState {
  hadiah: IHadiah[]
  loading: boolean
  error?: Error
}

export default class Hadiah extends Component<{}, IState> {
  public state: IState = {
    hadiah: [],
    loading: false,
  }

  public hadiahService = new HadiahService()

  public componentDidMount() {
    this.getHadiah()
  }

  public getHadiah = () => {
    this.setState({ loading: true })
    this.hadiahService
      .get()
      .then((hadiah) => this.setState({ hadiah }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createHadiah = (input: IHadiah) => {
    this.setState({ loading: true })
    this.hadiahService
      .create(input)
      .then(this.getHadiah)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateHadiah = (input: IHadiah) => {
    this.setState({ loading: true })
    this.hadiahService
      .update(input, input._id)
      .then(this.getHadiah)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteHadiah = (input: IHadiah) => {
    this.setState({ loading: true })
    this.hadiahService
      .delete(input._id)
      .then(this.getHadiah)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      judul: {
        label: "Judul",
        validations: [Validation.required],
      },
      nominal: {
        label: "Nominal",
        validations: [Validation.required, Validation.numeric],
      },
    }

    return (
      <Fragment>
        <Header content="Hadiah" subheader="Kumpulan data hadiah" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.hadiah}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Hadiah"
            updateTitle="Ubah Hadiah"
            onCreate={this.createHadiah}
            onUpdate={this.updateHadiah}
            onDelete={this.deleteHadiah}
          />
        </Container>
      </Fragment>
    )
  }
}
