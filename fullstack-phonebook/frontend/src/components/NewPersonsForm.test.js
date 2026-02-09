import React from "react";
import '@testing-library/jest-dom'
import { render} from '@testing-library/react'

import NewPersonsForm from './NewPersonsForm'

describe('<NewPersonsForm />', () => {

  test('renders NewPersonsFom', () => {
    const component = render(
      <NewPersonsForm />
    ).container
   
    expect(component).toHaveTextContent('Add a new')
    expect(component).toHaveTextContent('name:')
    expect(component).toHaveTextContent('number:')
    expect(component).toHaveTextContent('add')
  })

})

