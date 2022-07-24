const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contactOperations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactOperations.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactOperations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactOperations.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const arr = hideBin(process.argv);

const { argv } = yargs(arr);

invokeAction(argv);
