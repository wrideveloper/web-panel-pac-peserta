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
import { MediaPartnerService } from "../../services/MediaPartnerService"

interface IState {
  mediaPartner: IMediaPartner[]
  loading: boolean
  error?: Error
}

export default class MediaPartner extends Component<{}, IState> {
  public state: IState = {
    mediaPartner: [],
    loading: false,
  }

  public mediaPartnerService = new MediaPartnerService()

  public componentDidMount() {
    this.getMediaPartner()
  }

  public getMediaPartner = () => {
    this.setState({ loading: true })
    this.mediaPartnerService
      .get()
      .then((mediaPartner) => this.setState({ mediaPartner }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createMediaPartner = (input: IMediaPartner) => {
    this.setState({ loading: true })
    this.mediaPartnerService
      .create(input)
      .then(this.getMediaPartner)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateMediaPartner = (input: IMediaPartner) => {
    this.setState({ loading: true })
    this.mediaPartnerService
      .update(input, input._id)
      .then(this.getMediaPartner)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteMediaPartner = (input: IMediaPartner) => {
    this.setState({ loading: true })
    this.mediaPartnerService
      .delete(input._id)
      .then(this.getMediaPartner)
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
        <Header
          content="Media Partner"
          subheader="Kumpulan data media partner"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.mediaPartner}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Media Partner"
            updateTitle="Ubah Media Partner"
            onCreate={this.createMediaPartner}
            onUpdate={this.updateMediaPartner}
            onDelete={this.deleteMediaPartner}
          />
        </Container>
      </Fragment>
    )
  }
}
