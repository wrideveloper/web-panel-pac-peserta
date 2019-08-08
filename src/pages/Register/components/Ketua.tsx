import { Field, FieldProps } from "formik"
import React, { Component } from "react"
import { Form, Input, Select } from "semantic-ui-react"

export class Ketua extends Component {
  public render() {
    return (
      <>
        <Form.Field>
          <Field
            name="ketua"
            render={({ form }: FieldProps) => (
              <Select
                name="universitas"
                options={form.values.peserta.map((item: any) => ({
                  value: item.nim,
                  text: item.nama,
                }))}
                placeholder="Pilih Ketua Tim"
                search
                onBlur={() => form.setFieldTouched("ketua", true)}
                onChange={(event, { value }) =>
                  form.setFieldValue("ketua", value)}
              />
            )}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="email"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Email" />
            )}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="telp"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Telpon" />
            )}
          />
        </Form.Field>
      </>
    )
  }
}
