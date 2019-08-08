import { Field, FieldProps } from "formik"
import React, { Component } from "react"
import { Form, Input } from "semantic-ui-react"

export class Akun extends Component {
  public render() {
    return (
      <>
        <Form.Field>
          <Field
            name="username"
            render={({ field }: FieldProps) => (
              <Input {...field} label="Username" />
            )}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="password"
            render={({ field }: FieldProps) => (
              <Input type="password" {...field} label="Password" />
            )}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="konfirmasi"
            render={({ field }: FieldProps) => (
              <Input type="password" {...field} label="Konfirmasi Password" />
            )}
          />
        </Form.Field>
      </>
    )
  }
}
