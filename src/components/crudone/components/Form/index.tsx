import React, { useContext, useEffect, useState } from "react"
import { Button, Grid, Header, Modal } from "semantic-ui-react"
import { CrudoneContext } from "../../contexts/CrudoneContext"
import FormInput from "./FormInput"
import FormInputError from "./FormInputError"
import FormValidator from "./FormValidator"

interface IProps {
  onCreate?: (input: any) => void
  onUpdate?: (input: any) => void
  onDelete?: (input: any) => void
}

const Form: React.FC<IProps> = (props) => {
  const context = useContext(CrudoneContext)
  const [input, setInput] = useState(context.selectedData)
  const [inputErrors, setInputErrors] = useState({} as any)

  useEffect(
    () => {
      if (context.open) {
        setInput(context.selectedData)
      } else if (!context.open) {
        setInput({})
        setInputErrors({})
      }
    },
    [context.open],
  )

  function removeError(name: string) {
    const newInputErrors = Object.assign({}, inputErrors)
    delete newInputErrors[name]
    setInputErrors(newInputErrors)
  }

  function changeInput(name: string, value: any) {
    const newInput = Object.assign({}, input)
    newInput[name] = value
    setInput(newInput)
    removeError(name)
  }

  function renderFormInputs() {
    return context.getFormFields().map((field) => (
      <Grid.Column key={field.name}>
        <FormInput
          field={field}
          onChange={(value) => changeInput(field.name, value)}
          value={input[field.name]}
          readOnly={!props.onUpdate && context.isUpdateMode}
        />
        <FormInputError errorMessage={inputErrors[field.name]} />
      </Grid.Column>
    ))
  }

  function addError(name: string, message: string) {
    const newInputErrors = Object.assign({}, inputErrors)
    newInputErrors[name] = message
    setInputErrors(newInputErrors)
  }

  function validateInputs() {
    let isValid = true
    context.getFormFields().forEach((field) => {
      if (field.validations)
        new FormValidator(field, input[field.name]).validate(
          (name, message) => {
            addError(name, message)
            isValid = false
          },
        )
    })
    return isValid
  }

  function submit() {
    if (validateInputs()) {
      if (context.isUpdateMode) props.onUpdate!(input)
      else props.onCreate!(input)
      context.closeForm()
    }
  }

  function renderSubmitButton() {
    return props.onUpdate || !context.isUpdateMode ? (
      <Button color="green" content="Simpan" onClick={submit} />
    ) : null
  }

  function renderDeleteButton() {
    return (
      props.onDelete &&
      context.isUpdateMode && (
        <Button
          content="Hapus"
          color="red"
          onClick={() => {
            props.onDelete!(input)
            context.closeForm()
          }}
        />
      )
    )
  }

  return (
    <Modal open={context.open} size="large" onClose={context.closeForm}>
      <Header content={context.isUpdateMode ? "Ubah Data" : "Tambah Data"} />
      <Modal.Content>
        <Grid columns="2">{renderFormInputs()}</Grid>
      </Modal.Content>
      <Modal.Actions>
        {renderDeleteButton()}
        {renderSubmitButton()}
      </Modal.Actions>
    </Modal>
  )
}

export default Form