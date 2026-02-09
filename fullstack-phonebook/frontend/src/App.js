import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import FilteredPersonsShow from './components/FilteredPersonsShow'
import NewPersonForm from './components/NewPersonsForm'
import NotificationMessage from './components/NotificationMessage'
import apiService from './services/api'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorHappened, setErrorHappened] = useState(false)


  useEffect(() => {
    apiService
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const removePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const result = window.confirm(`Delete ${person.name}?`)

    if (result) {
      apiService
        .removePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          console.log('response after delete', response.data)

          setNotificationMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)

        })
        .catch(error => {
          console.log('error', error.response.data)

          setNotificationMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setErrorHappened(true)
          setTimeout(() => {
            setNotificationMessage(null); setErrorHappened(false);
          }, 3000)

        })
    }
  }


  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {

      if (persons.some(person => person.number !== newNumber)) {

        const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

        if (result) {
          apiService
            .updatePerson(persons.find(person => person.name === newName).id, nameObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))

              setNotificationMessage(
                `Updated ${nameObject.name}'s number`
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 3000)

            }
            )
            .catch(error => { 
              console.log('error', error.response.data)

              setNotificationMessage(
                error.response.data.error
              )
              setErrorHappened(true)
              setTimeout(() => {
                setNotificationMessage(null); setErrorHappened(false);
              }, 3000)

            }

            )
        }
      }
    }

    else {

      apiService
        .createPerson(nameObject)
        .then(response => {
          console.log('response after post', response.data)
          setPersons(persons.concat(nameObject))

          setNotificationMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)

        })
        .catch(error => {
          console.log('error', error.response.data)

          setNotificationMessage(
            error.response.data.error
          )
          setErrorHappened(true)
          setTimeout(() => {
            setNotificationMessage(null); setErrorHappened(false);
          }, 3000)

        }
        )
    }
    setNewName('')
    setNewNumber('')
  }


  const filteredPersons = newFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  return (
    <div className="container">

      <h1>Phonebook</h1>

      <NotificationMessage notificationMessage={notificationMessage} errorHappened={errorHappened} />

      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />

      <NewPersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <FilteredPersonsShow filteredPersons={filteredPersons} removePerson={removePerson} />

    </div>
  )

}


export default App