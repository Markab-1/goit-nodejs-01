const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

const fs = require("fs/promises");
const { nanoid } = require("nanoid");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  if (!JSON.parse(data)) {
    throw "there are no contacts";
  }
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === String(contactId));
  if (!result) {
    throw `there is no contact with id ${contactId}`;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (index === -1) {
    throw `there is no contact with id ${contactId}`;
  }
  const removeContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
