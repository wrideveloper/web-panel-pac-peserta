import { ErrorMessage, Field, FieldProps } from "formik"
import React, { Component } from "react"
import { Form, Input, Message, Select } from "semantic-ui-react"
import { UniversitasService } from "../../../services/UniversitasService"

interface IState {
  universitas: IUniversitas[]
}

export class Tim extends Component<{}, IState> {
  public state: IState = {
    universitas: [],
  }

  public universitasService = new UniversitasService()

  public componentDidMount() {
    this.getUniversitas()
  }

  public getUniversitas() {
    this.universitasService
      .get()
      .then((universitas) => this.setState({ universitas }))
  }

  public getUniversitasOptions() {
    return this.state.universitas.map((item) => ({
      value: item._id,
      text: item.nama,
    }))
  }

  public render() {
    return (
      <>
        <Form.Field>
          <Field
            name="nama"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Nama" />
            )}
          />
          <ErrorMessage
            name="nama"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="namaAplikasi"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Nama Aplikasi" />
            )}
          />
          <ErrorMessage
            name="namaAplikasi"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>

        <Form.Field>
          <Message
            color="yellow"
            content="Apabila universitas tidak ditemukan, silahkan hubungi contact person"
          />
          <Field
            name="universitas"
            render={({ form }: FieldProps) => (
              <Select
                name="universitas"
                options={this.getUniversitasOptions()}
                placeholder="Pilih Universitas"
                value={form.values.universitas}
                search
                onBlur={() => form.setFieldTouched("universitas", true)}
                onChange={(event, { value }) =>
                  form.setFieldValue("universitas", value)}
              />
            )}
          />
          <ErrorMessage
            name="universitas"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>
      </>
    )
  }
}
