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
        return filterValueReducer(value);

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactsNames = items.find(item => item.name === name);
    const contactsNumbers = items.find(item => item.number === number);
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

    return reset();
  };

  const contactFilter = () => {
    const normalizeFilter = filterValueReducer.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const searchFilter = e => {
    const value = e.currentTarget.value;
    dispatch(filterChange(value));
  };

  const filteredContacts = contactFilter();

  const deleteContact = contactId => {
    dispatch(removeContact(contactId));
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
        <Filter filterValue={filterValueReducer} onChange={searchFilter} />
      </Section>
    </>
  );
};
