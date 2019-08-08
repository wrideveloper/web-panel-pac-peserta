import { ErrorMessage, Field, FieldProps } from "formik"
import React, { Component } from "react"
import { Form, Input, Message } from "semantic-ui-react"

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
          <ErrorMessage
            name="username"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="password"
            render={({ field }: FieldProps) => (
              <Input type="password" {...field} label="Password" />
            )}
          />
          <ErrorMessage
            name="password"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>

        <Form.Field>
          <Field
            name="konfirmasi"
            render={({ field }: FieldProps) => (
              <Input type="password" {...field} label="Konfirmasi Password" />
            )}
          />
          <ErrorMessage
            name="konfirmasi"
            render={(message) => <Message content={message} color="red" />}
          />
        </Form.Field>
      </>
    )
  }
}
