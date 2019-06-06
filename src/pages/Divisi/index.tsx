import React, { Component, Fragment } from "react"
import { Button, Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable2"
import Form from "../../components/DataTable2/Form"
import CreateButton from "../../components/DataTable2/Form/CreateButton"
import Table from "../../components/DataTable2/Table"
import ErrorMessage from "../../components/ErrorMessage"
import { DivisiService } from "../../services/DivisiService"

interface IState {
  divisi: IDivisi[]
  loading: boolean
  error?: Error
}

export default class Divisi extends Component<{}, IState> {
  public state: IState = {
    divisi: [],
    loading: false,
  }

  public divisiService = new DivisiService()

  public componentDidMount() {
    this.getDivisi()
  }

  public getDivisi = () => {
    this.setState({ loading: true })
    this.divisiService
      .get()
      .then((divisi) => this.setState({ divisi }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }))
  }

  public createDivisi = (input: IDivisi) => {
    this.setState({ loading: true })
    this.divisiService
      .create(input)
      .then(this.getDivisi)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public updateDivisi = (input: IDivisi) => {
    this.setState({ loading: true })
    this.divisiService
      .update(input, input._id)
      .then(this.getDivisi)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public deleteDivisi = (input: IDivisi) => {
    this.setState({ loading: true })
    this.divisiService
      .delete(input._id)
      .then(this.getDivisi)
      .catch((error) => this.setState({ error, loading: false }))
  }

  public render() {
    const fields: IField[] = [
      {
        name: "nama",
        label: "Nama Divisi",
        validations: ["required"],
      },
    ]

    return (
      <Fragment>
        <Header content="Divisi" subheader="Kumpulan data divisi" />
        <ErrorMessage
          error={this.state.error}
          onDismiss={() => this.setState({ error: undefined })}
        />

        <DataTable fields={fields}>
          <Form
            onCreate={this.createDivisi}
            onUpdate={this.updateDivisi}
            onDelete={this.deleteDivisi}
          />
          <CreateButton />
          <Table data={this.state.divisi} loading={this.state.loading} />
        </DataTable>
      </Fragment>
    )
  }
}
