import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import { Section, Title } from './App.styled';
import {
  addContact,
  removeContact,
  filterChange,
  getContacts,
  getFilterValue,
} from 'redux/contactSlise';

export const App = () => {
  const items = useSelector(getContacts);
  const filterValueReducer = useSelector(getFilterValue);
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState(items);

  const [filter, setFilter] = useState(filterValueReducer);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      case 'filter':
        return setFilter(value);

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactsNames = contacts.find(contact => contact.name === name);
    const contactsNumbers = contacts.find(contact => contact.number === number);
    const contact = { id: nanoid(), name, number };
    if (contactsNames) {
      alert(`${name} is already in contacts`);
      reset();
      return;
    }

    if (contactsNumbers) {
      alert(`${number} is already in contacts`);
      reset();
      return;
    }

    dispatch(addContact(contact));

    setContacts(prevContacts => {
      return [contact, ...prevContacts];
    });
    return reset();
  };

  const contactFilter = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const searchFilter = e => {
    const value = e.currentTarget.value;
    dispatch(filterChange(value));
    setFilter(value);
  };

  const filteredContacts = contactFilter();

  const deleteContact = contactId => {
    const filtered = items.filter(item => item.id !== contactId);
    dispatch(removeContact(contactId));
    setContacts(filtered);
  };

  return (
    <>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          nameValue={name}
          numberValue={number}
        />
        <ContactList contacts={filteredContacts} onClick={deleteContact} />
        <Filter filterValue={filter} onChange={searchFilter} />
      </Section>
    </>
  );
};
