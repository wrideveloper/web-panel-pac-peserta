import { Container, CreateButton, Form, ISchema, Table } from "crudone"
import React, { Component, Fragment } from "react"
import { Header, Message } from "semantic-ui-react"
import ErrorMessage from "../../components/ErrorMessage"
import { JenisPengumpulanService } from "../../services/JenisPengumpulanService"
import { PengumpulanService } from "../../services/PengumpulanService"

interface IState {
  pengumpulan: IPengumpulan[]
  jenisPengumpulan: IJenisPengumpulan[]
  loading: boolean
  error?: Error
}

export default class JenisPengumpulan extends Component<{}, IState> {
  public state: IState = {
    pengumpulan: [],
    jenisPengumpulan: [],
    loading: false,
  }

  public pengumpulanService = new PengumpulanService()
  public jenisPengumpulan = new JenisPengumpulanService()

  public componentDidMount() {
    this.getPengumpulan()
    this.getJenisPengumpulan()
  }

  public getJenisPengumpulan() {
    this.jenisPengumpulan
      .get()
      .then((jenisPengumpulan) => this.setState({ jenisPengumpulan }))
  }

  // public getFilteredJenisPengumpulan() {
  //   const id = (JSON.parse(localStorage.getItem("authUser") || "{}") as ITim)
  //     .status._id
  //   const date = new Date()

  //   return this.state.jenisPengumpulan.filter(
  //     (item) =>
  //       item.status._id === id &&
  //       date.getTime() >= new Date(item.timeline.tgl_mulai).getTime() &&
  //       date.getTime() <= new Date(item.timeline.tgl_selesai).getTime(),
  //   )
  // }

  public getPengumpulan = () => {
    this.setState({ loading: true })
    this.pengumpulanService
      .get()
      .then((pengumpulan) => this.setState({ pengumpulan }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createPengumpulan = (input: IPengumpulan) => {
    this.setState({ loading: true })
    this.pengumpulanService
      .create(input)
      .then(this.getPengumpulan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updatePengumpulan = (input: IPengumpulan) => {
    this.setState({ loading: true })
    this.pengumpulanService
      .update(input, input._id)
      .then(this.getPengumpulan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deletePengumpulan = (input: IPengumpulan) => {
    this.setState({ loading: true })
    this.pengumpulanService
      .delete(input._id)
      .then(this.getPengumpulan)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const schema: ISchema = {
      jenisPengumpulan: {
        label: "Jenis Pengumpulan",
        type: "option",
        validations: ["required"],
        optionData: {
          data: this.state.jenisPengumpulan,
          textKey: "nama",
          valueKey: "_id",
        },
      },
      file: {
        label: "URL File",
        validations: ["required"],
      },
    }

    return (
      <Fragment>
        <Header content="Pengumpulan" subheader="Kumpulan data pengumpulan" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />
        <Container schema={schema}>
          <CreateButton text="Tambah" />
          <Table.Container
            data={this.state.pengumpulan}
            loading={this.state.loading}
          >
            <Table.Search placeholder="Pencarian" />
            <Table.Display emptyText="Data Kosong" />
          </Table.Container>
          <Form
            createTitle="Tambah Pengumpulan"
            onCreate={this.createPengumpulan}
            onUpdate={this.updatePengumpulan}
            onDelete={this.deletePengumpulan}
          />
        </Container>
      </Fragment>
    )
  }
}
