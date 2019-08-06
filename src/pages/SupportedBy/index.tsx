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
import { SupportedByService } from "../../services/SupportedByService"

interface IState {
  supportedBy: ISupportedBy[]
  loading: boolean
  error?: Error
}

export default class SupportedBy extends Component<{}, IState> {
  public state: IState = {
    supportedBy: [],
    loading: false,
  }

  public supportedByService = new SupportedByService()

  public componentDidMount() {
    this.getSupportedBy()
  }

  public getSupportedBy = () => {
    this.setState({ loading: true })
    this.supportedByService
      .get()
      .then((supportedBy) => this.setState({ supportedBy }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createSupportedBy = (input: ISupportedBy) => {
    this.setState({ loading: true })
    this.supportedByService
      .create(input)
      .then(this.getSupportedBy)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateSupportedBy = (input: ISupportedBy) => {
    this.setState({ loading: true })
    this.supportedByService
      .update(input, input._id)
      .then(this.getSupportedBy)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteSupportedBy = (input: ISupportedBy) => {
    this.setState({ loading: true })
    this.supportedByService
      .delete(input._id)
      .then(this.getSupportedBy)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
      logo: {
        label: "Logo",
        validations: [Validation.required],
        hideOnTable: true,
      },
    }

    return (
      <Fragment>
        <Header content="Supported By" subheader="Kumpulan data supported by" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.supportedBy}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Supported By"
            updateTitle="Ubah Supported By"
            onCreate={this.createSupportedBy}
            onUpdate={this.updateSupportedBy}
            onDelete={this.deleteSupportedBy}
          />
        </Container>
      </Fragment>
    )
  }
}
