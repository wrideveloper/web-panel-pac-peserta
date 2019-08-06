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
import { JenisPengumpulanService } from "../../services/JenisPengumpulanService"
import { StatusService } from "../../services/StatusService"
import { TimelineService } from "../../services/TimelineService"

interface IState {
  jenisPengumpulan: IJenisPengumpulan[]
  timeline: ITimeline[]
  status: IStatus[]
  loading: boolean
  error?: Error
}

export default class JenisPengumpulan extends Component<{}, IState> {
  public state: IState = {
    jenisPengumpulan: [],
    timeline: [],
    status: [],
    loading: false,
  }

  public jenisPengumpulanService = new JenisPengumpulanService()
  public timelineService = new TimelineService()
  public statusService = new StatusService()

  public componentDidMount() {
    this.getJenisPengumpulan()
    this.getTimeline()
    this.getStatus()
  }

  public getTimeline() {
    this.timelineService.get().then((timeline) => this.setState({ timeline }))
  }

  public getStatus() {
    this.statusService.get().then((status) => this.setState({ status }))
  }

  public getJenisPengumpulan = () => {
    this.setState({ loading: true })
    this.jenisPengumpulanService
      .get()
      .then((jenisPengumpulan) => this.setState({ jenisPengumpulan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createJenisPengumpulan = (input: IJenisPengumpulan) => {
    this.setState({ loading: true })
    this.jenisPengumpulanService
      .create(input)
      .then(this.getJenisPengumpulan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateJenisPengumpulan = (input: IJenisPengumpulan) => {
    this.setState({ loading: true })
    this.jenisPengumpulanService
      .update(input, input._id)
      .then(this.getJenisPengumpulan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteJenisPengumpulan = (input: IJenisPengumpulan) => {
    this.setState({ loading: true })
    this.jenisPengumpulanService
      .delete(input._id)
      .then(this.getJenisPengumpulan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      nama: {
        label: "Nama",
        validations: [Validation.required],
      },
      timeline: {
        label: "Timeline",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.timeline,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      status: {
        label: "Status",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.status,
          textKey: "nama",
          valueKey: "_id",
        },
      },
    }

    return (
      <Fragment>
        <Header
          content="Jenis Pengumpulan"
          subheader="Kumpulan data jenis pengumpulan"
        />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.jenisPengumpulan}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Limiter text="Item Per Halaman" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Jenis Pengumpulan"
            updateTitle="Ubah jenis Pengumpulan"
            onCreate={this.createJenisPengumpulan}
            onUpdate={this.updateJenisPengumpulan}
            onDelete={this.deleteJenisPengumpulan}
          />
        </Container>
      </Fragment>
    )
  }
}
