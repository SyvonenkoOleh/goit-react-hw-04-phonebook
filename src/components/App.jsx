import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { Container, MainHeader, SubHeader } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const notifySettings = {
  width: '380px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  borderRadius: '12px',
};

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const useLocalStorage = (key, defaultValue) => {
    const dataFromStorage = JSON.parse(window.localStorage.getItem(key));
  
    const [state, setState] = useState(() => {
      if (dataFromStorage && dataFromStorage.length === 0) {
        Notiflix.Notify.info(`No ${key} in your list yet`, notifySettings);
      }
      return dataFromStorage ?? defaultValue;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
  
    return [state, setState];
  };
  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);
  const [filter, setFilter] = useState('');

  const onAddBtnClick = FormData => {
    const { name, number } = FormData;
    const id = nanoid();

    const includesName = contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (includesName) {
      return Notiflix.Notify.warning(
        `${name} is already in contacts`,
        notifySettings
      );
    } else {
      const contact = { id, name, number };
      setContacts(prevContacts => [...prevContacts, contact]);
      Notiflix.Notify.success(
        `${name} was successfully added to your contacts`,
        notifySettings
      );
    }
  };

  const onDeleteBtnClick = (id, name) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
    Notiflix.Notify.info(
      `${name} was successfully deleted from your contacts`,
      notifySettings
    );
  };

  const onFilterChange = event => {
    setFilter(event.target.value);
  };

  const filterContacts = () => {
    const query = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(query)
    );

    if (query && !filteredContacts.length) {
      Notiflix.Notify.warning(
        'No contacts matching your request',
        notifySettings
      );
    }

    return filteredContacts;
  };

  return (
    <Container>
      <MainHeader>Phonebook</MainHeader>
      <ContactForm onAddBtnClick={onAddBtnClick} />
      <SubHeader>Contacts</SubHeader>
      <Filter value={filter} onChange={onFilterChange} />
      <ContactList
        contacts={filterContacts()}
        onDeleteBtnClick={onDeleteBtnClick}
      />
    </Container>
  );
};
