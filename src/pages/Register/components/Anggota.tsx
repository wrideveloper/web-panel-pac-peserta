import { ObjectID } from "bson"
import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldArrayRenderProps,
  FieldProps,
  Formik,
} from "formik"
import React, { Component } from "react"
import { Button, Card, Form, Grid, Input, Message } from "semantic-ui-react"

import * as yup from "yup"

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
  public addPeserta(peserta: any, fieldArray: FieldArrayRenderProps) {
    peserta._id = new ObjectID().toHexString()
    fieldArray.push(peserta)
  }

  public getValidationSchema(nim: string[]) {
    return yup.object().shape({
      nim: yup
        .string()
        .required("nim wajib diisi")
        .notOneOf(nim, "nim sudah ada"),
      nama: yup.string().required("nama wajib diisi"),
    })
  }

  public render() {
    return (
      <FieldArray name="peserta">
        {(fieldArray) => (
          <Grid columns="2" celled="internally">
            <Grid.Column>
              <Message
                info
                content="Masukkan data anggota tim, termasuk ketua tim"
              />
              <Formik
                initialValues={initialValues}
                onSubmit={(peserta) => this.addPeserta(peserta, fieldArray)}
                validationSchema={this.getValidationSchema(
                  fieldArray.form.values.peserta.map((item: any) => item.nim),
                )}
              >
                {({ handleSubmit }) => (
                  <Form
                    onSubmit={(e) => {
                      e.stopPropagation()
                      handleSubmit(e)
                    }}
                  >
                    <Form.Field>
                      <Field
                        name="nim"
                        render={({ field }: FieldProps) => (
                          <Input {...field} label="NIM" />
                        )}
                      />
                      <ErrorMessage
                        name="nim"
                        render={(message) => (
                          <Message content={message} color="red" />
                        )}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Field
                        name="nama"
                        render={({ field }: FieldProps) => (
                          <Input {...field} label="Nama" />
                        )}
                      />
                      <ErrorMessage
                        name="nama"
                        render={(message) => (
                          <Message content={message} color="red" />
                        )}
                      />
                    </Form.Field>

                    <Form.Field>
                      <Button
                        type="submit"
                        color="green"
                        content="Tambahkan Anggota"
                      />
                    </Form.Field>
                  </Form>
                )}
              </Formik>
            </Grid.Column>
            <Grid.Column>
              <ErrorMessage
                name="peserta"
                render={(message) => <Message content={message} color="red" />}
              />
              {fieldArray.form.values.peserta.map(
                (item: any, index: number) => (
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
                        onClick={() => fieldArray.remove(index)}
                      />
                    </Card.Content>
                  </Card>
                ),
              )}
            </Grid.Column>
          </Grid>
        )}
      </FieldArray>
    )
  }
}
