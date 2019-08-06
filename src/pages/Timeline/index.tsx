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
import { TimelineService } from "../../services/TimelineService"

interface IState {
  timeline: ITimeline[]
  loading: boolean
  error?: Error
}

export default class Timeline extends Component<{}, IState> {
  public state: IState = {
    timeline: [],
    loading: false,
  }

  public timelineService = new TimelineService()

  public componentDidMount() {
    this.getTimeline()
  }

  public getTimeline = () => {
    this.setState({ loading: true })
    this.timelineService
      .get()
      .then((timeline) => this.setState({ timeline }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createTimeline = (input: ITimeline) => {
    this.setState({ loading: true })
    this.timelineService
      .create(input)
      .then(this.getTimeline)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateTimeline = (input: ITimeline) => {
    this.setState({ loading: true })
    this.timelineService
      .update(input, input._id)
      .then(this.getTimeline)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteTimeline = (input: ITimeline) => {
    this.setState({ loading: true })
    this.timelineService
      .delete(input._id)
      .then(this.getTimeline)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
      deskripsi: {
        label: "Deskripsi",
        validations: [Validation.required],
        hideOnTable: true,
      },
      tgl_mulai: {
        label: "Tanggal Mulai",
        type: "date",
        validations: [Validation.required],
      },
      tgl_selesai: {
        label: "Tanggal Selesai",
        type: "date",
        validations: [Validation.required],
      },
    }

    return (
      <Fragment>
        <Header content="Timeline" subheader="Kumpulan data timeline" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.timeline}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Timeline"
            updateTitle="Ubah Timeline"
            onCreate={this.createTimeline}
            onUpdate={this.updateTimeline}
            onDelete={this.deleteTimeline}
          />
        </Container>
      </Fragment>
    )
  }
}
