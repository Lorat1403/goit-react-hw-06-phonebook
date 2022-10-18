import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import { Section, Title } from './Phonebook.styled';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
    return value ?? initialState;
  });

  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
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
    setFilter(value);
  };

  const filteredContacts = contactFilter();

  const removeContact = contactId => {
    setContacts(prevContacts => {
      const newContacts = prevContacts.filter(
        contact => contact.id !== contactId
      );
      return newContacts;
    });
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
        <ContactList contacts={filteredContacts} onClick={removeContact} />
        <Filter filterValue={filter} onChange={searchFilter} />
      </Section>
    </>
  );
}

// export default class Phonebook extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   componentDidMount() {
// const contacts = localStorage.getItem('contacts');
// const parsedContacts = JSON.parse(contacts);
// if (parsedContacts) {
//   this.setState({ contacts: parsedContacts });
// }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   reset = () => {
//     this.setState({ name: '', number: '' });
//   };

// handleInputChange = e => {
//   this.setState({ [e.currentTarget.name]: e.currentTarget.value });
// };

// handleSubmit = e => {
//   e.preventDefault();

//   const name = e.target.name.value;
//   const number = e.target.number.value;
//   const contactsNames = this.state.contacts.find(
//     contact => contact.name === name
//   );
//   const contactsNumbers = this.state.contacts.find(
//     contact => contact.number === number
//   );

//   if (contactsNames) {
//     alert(`${name} is already in contacts`);
//     this.reset();
//     return;
//   }

//   if (contactsNumbers) {
//     alert(`${number} is already in contacts`);
//     this.reset();
//     return;
//   }

//   this.setState(prevState => {
//     const newContact = {
//       id: nanoid(),
//       name: this.state.name,
//       number: this.state.number,
//     };
//     return {
//       contacts: [newContact, ...prevState.contacts],
//       name: '',
//       number: '',
//     };
//   });
// };

//   searchFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   contactFilter = () => {
//     const { filter, contacts } = this.state;
//     const normalizeFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   removeContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const filter = this.contactFilter();

//     return (
//       <Section>
//         <Title>Phonebook</Title>
//         <ContactForm
//           onSubmit={this.handleSubmit}
//           onChange={this.handleInputChange}
//           nameValue={this.state.name}
//           numberValue={this.state.number}
//         />
//         <ContactList contacts={filter} onClick={this.removeContact} />
//         <Filter filterValue={this.state.filter} onChange={this.searchFilter} />
//       </Section>
//     );
//   }
// }
