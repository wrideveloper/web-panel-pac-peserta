import {
  Field,
  FieldArray,
  FieldArrayRenderProps,
  FieldProps,
  Formik,
} from "formik"
import React, { Component } from "react"
import { Button, Card, Form, Grid, Input, Message } from "semantic-ui-react"

interface IFormState {
  nim: string
  nama: string
  ktm?: File
  foto?: File
}

const initialValues: IFormState = {
  nim: "",
  nama: "",
}

export class Anggota extends Component {
  public render() {
    return (
      <FieldArray name="peserta">
        {({ push, remove, form }) => (
          <Grid columns="2" celled="internally">
            <Grid.Column>
              <Message
                info
                content="Masukkan data anggota tim, termasuk ketua tim"
              />
              <Formik initialValues={initialValues} onSubmit={push}>
                {({ handleSubmit }) => (
                  <Form
                    onSubmit={(e) => {
                      e.stopPropagation()
                      handleSubmit(e)
                    }}
                  >
                    <Form.Group>
                      <Field
                        name="nim"
                        render={({ field }: FieldProps) => (
                          <Input {...field} label="NIM" />
                        )}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Field
                        name="nama"
                        render={({ field }: FieldProps) => (
                          <Input {...field} label="Nama" />
                        )}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Button
                        type="submit"
                        color="green"
                        content="Tambahkan Anggota"
                      />
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </Grid.Column>
            <Grid.Column>
              {form.values.peserta.map((item: any, index: number) => (
                <Card>
                  <Card.Content>
                    <Card.Header>{item.nama}</Card.Header>
                    <Card.Meta>{item.nim}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Button
                      type="button"
                      color="red"
                      content="Hapus"
                      basic
                      onClick={() => remove(index)}
                    />
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid>
        )}
      </FieldArray>
    )
  }
}
