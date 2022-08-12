import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

test('renders without errors', () => {
  render(<ContactForm />)
})

test('renders the contact form header', () => {
  render(<ContactForm />)

  const header = screen.queryByText(/contact form/i)
  expect(header).toBeInTheDocument()
  expect(header).toBeTruthy()
  expect(header).toHaveTextContent(/contact form/i)
})

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />)

  const firstName = screen.getByLabelText(/First Name*/i)
  userEvent.type(firstName, '123')

  const errorMessage = await screen.findAllByTestId('error')
  expect(errorMessage).toHaveLength(1)
})

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)
  const submitBtn = screen.getByRole('button')
  userEvent.click(submitBtn)
  await waitFor(() => {
    const errorMessage = screen.queryAllByTestId('error')
    expect(errorMessage).toHaveLength(3)
  })
})

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />)

  const firstName = screen.getByLabelText(/first name*/i)
  userEvent.type(firstName, 'Olivia')

  const lastName = screen.getByLabelText(/last name/i)
  userEvent.type(lastName, 'vonPingel')

  const button = screen.getByRole('button')
  userEvent.click(button)

  const errorMessage = await screen.findAllByTestId('error')
  expect(errorMessage).toHaveLength(1)
})

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />)

  const email = screen.getByLabelText(/email*/i)
  userEvent.type(email, 'livalossy@gmail')

  const errorMessage = await screen.findByText(
    /email must be a valid email address/i
  )
  expect(errorMessage).toBeInTheDocument()
})

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />)
  const submitBtn = screen.getByRole('button')
  userEvent.click(submitBtn)

  const errorMessage = await screen.findByText(/lastName is a required field/i)
  expect(errorMessage).toBeInTheDocument()
})

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />)

  const first = screen.getByLabelText(/first name*/i)
  const last = screen.getByLabelText(/last name*/i)
  const email = screen.getByLabelText(/email*/i)

  userEvent.type(first, 'olivia')
  userEvent.type(last, 'vonPingel')
  userEvent.type(email, 'livalossy@gmail.com')

  const submitBtn = screen.getByRole('button')
  userEvent.click(submitBtn)

  await waitFor(() => {
    const firstDisplay = screen.queryByText('olivia')
    const lastDisplay = screen.queryByText('vonPingel')
    const emailDisplay = screen.queryByText('livalossy@gmail.com')
    const messDisplay = screen.queryByTestId('messageDisplay')

    expect(firstDisplay).toBeInTheDocument()
    expect(lastDisplay).toBeInTheDocument()
    expect(emailDisplay).toBeInTheDocument()
    expect(messDisplay).not.toBeInTheDocument()
  })
})

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />)

  const first = screen.getByLabelText(/first name*/i)
  const last = screen.getByLabelText(/last name*/i)
  const email = screen.getByLabelText(/email*/i)
  const message = screen.getByLabelText(/message/i)

  userEvent.type(first, 'olivia')
  userEvent.type(last, 'vonPingel')
  userEvent.type(email, 'livalossy@gmail.com')
  userEvent.type(message, 'message')

  const submitBtn = screen.getByRole('button')
  userEvent.click(submitBtn)

  await waitFor(() => {
    const firstDisplay = screen.queryByText('olivia')
    const lastDisplay = screen.queryByText('vonPingel')
    const emailDisplay = screen.queryByText('livalossy@gmail.com')
    const messDisplay = screen.queryByTestId('messageDisplay')

    expect(firstDisplay).toBeInTheDocument()
    expect(lastDisplay).toBeInTheDocument()
    expect(emailDisplay).toBeInTheDocument()
    expect(messDisplay).toBeInTheDocument()
  })
})
