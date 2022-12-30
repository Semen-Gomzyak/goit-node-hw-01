const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve(__dirname, 'contacts.json');

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

async function addContact(name, email, phone, id) {
  const contact = { id, name, email, phone };

  const contacts = await readContacts();
  contacts.push(contact);
  await writeContacts(contacts);
}

async function removeContacts(id) {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(contact => contact.id !== id);
  await writeContacts(updatedContacts);
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContact(id) {
  const contacts = await readContacts();
  const getContactByID = contacts.filter(contact => contact.id === id);
  return getContactByID;
}

module.exports = {
  addContact,
  removeContacts,
  listContacts,
  getContact,
};
