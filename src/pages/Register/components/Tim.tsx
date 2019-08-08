import { Field, FieldProps } from "formik"
import React, { Component } from "react"
import { Form, Input, Select } from "semantic-ui-react"
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
        </Form.Field>

        <Form.Field>
          <Field
            name="namaAplikasi"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Nama Aplikasi" />
            )}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="universitas"
            render={({ form }: FieldProps) => (
              <Select
                name="universitas"
                options={this.getUniversitasOptions()}
                placeholder="Pilih Universitas"
                search
                onBlur={() => form.setFieldTouched("universitas", true)}
                onChange={(event, { value }) =>
                  form.setFieldValue("universitas", value)}
              />
            )}
          />
        </Form.Field>
      </>
    )
  }
}
