import React, { Component } from "react"
import { Grid, Header, Tab, Table } from "semantic-ui-react"
import { Consumer } from "../../App"
import { PesertaService } from "../../services/PesertaService"

interface ITim {
  anggota: IPeserta[]
}

export default class Tim extends Component<{}, ITim> {
  public state: ITim = {
    anggota: [],
  }

  public pesertaService = new PesertaService()

  public componentDidMount() {
    this.pesertaService
      .getAnggotaTim()
      .then((anggota) => this.setState({ anggota }))
  }

  public render() {
    return (
      <Consumer>
        {({ user }) => (
          <>
            <Grid columns="2">
              <Grid.Column width="4">
                <Header content="Informasi Tim" />

                <Header>
                  <Header.Subheader>Nama Tim</Header.Subheader>
                  {user.nama}
                </Header>
                <Header>
                  <Header.Subheader>Status Tim</Header.Subheader>
                  {user.status.nama}
                </Header>
                <Header>
                  <Header.Subheader>Nama Aplikasi</Header.Subheader>
                  {user.namaAplikasi}
                </Header>

                <Header>
                  <Header.Subheader>Ketua Tim</Header.Subheader>
                  {user.ketua.nama}
                </Header>
                <Header>
                  <Header.Subheader>Universitas</Header.Subheader>
                  {user.universitas.nama}
                </Header>
              </Grid.Column>
              <Grid.Column width="12">
                <Header content="Anggota Tim" />

                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>No</Table.HeaderCell>
                      <Table.HeaderCell>NIM</Table.HeaderCell>
                      <Table.HeaderCell>Nama</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.anggota.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{item.nim}</Table.Cell>
                        <Table.Cell>{item.nama}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid>
          </>
        )}
      </Consumer>
    )
  }
}
