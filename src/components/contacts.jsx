import React, { useState } from "react";
import contactsData from "../contacts.json";
import "../App.css"

function Contact() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(
    contactsData.slice(5)
  );

  const renderTrophyIcon = (won) => {
    return won ? "🏆" : "";
  };

  const getRandomContact = () => {
    if (remainingContacts.length === 0) {
      alert("No hay más contactos para agregar.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);

    const randomContact = remainingContacts[randomIndex];

    setContacts((prevContacts) => [...prevContacts, randomContact]);
    setRemainingContacts((prevRemaining) =>
      prevRemaining.filter((contact) => contact.id !== randomContact.id)
    );
  };

  const sortByName = () => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sortedContacts);
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    setContacts(updatedContacts);
  };

  return (
    <div className="container">
    <button className="add-btn" onClick={getRandomContact}>Agregar contacto aleatorio +</button>
      <h1 className="title">Lista de contactos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>
              <button className="sort-btn" onClick={sortByName}>Ordenar por Nombre</button>
            </th>
            <th><button className="sort-btn" onClick={sortByPopularity}>Ordenar por Popularidad</button></th>
            <th>Ganó un Oscar</th>
            <th>Ganó un Emmy</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  className="contact-img"
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{renderTrophyIcon(contact.wonOscar)}</td>
              <td>{renderTrophyIcon(contact.wonEmmy)}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteContact(contact.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contact;

  