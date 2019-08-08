import { ErrorMessage, Field, FieldProps } from "formik"
import React, { Component } from "react"
import { Form, Input, Message, Select } from "semantic-ui-react"

export class Ketua extends Component {
  public render() {
    return (
      <>
        <Form.Field>
          <Field
            name="ketua"
            render={({ form }: FieldProps) => (
              <Select
                name="ketua"
                options={form.values.peserta.map((item: any) => ({
                  value: item._id,
                  text: item.nama,
                }))}
                placeholder="Pilih Ketua Tim"
                value={form.values.ketua}
                search
                onBlur={() => form.setFieldTouched("ketua", true)}
                onChange={(event, { value }) =>
                  form.setFieldValue("ketua", value)}
              />
            )}
          />
          <ErrorMessage
            name="ketua"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="email"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Email" />
            )}
          />
          <ErrorMessage
            name="email"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="telp"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Telpon" />
            )}
          />
          <ErrorMessage
            name="telp"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>
      </>
    )
  }
}
