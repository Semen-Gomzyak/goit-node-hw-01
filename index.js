const {
  addContact,
  removeContacts,
  listContacts,
  getContact,
} = require('./db/contact');
const { Command } = require('commander');

async function invokeAction({ action, name, email, phone, id }) {
  switch (action) {
    case 'add':
      console.log('invoke add', name);
      await addContact(name, email, phone, id);
      console.log(
        `contact name-${name}, email-${email}, phone-${phone}  successfully added`,
      );
      break;
    case 'remove':
      console.log('invoke remove');
      await removeContacts(id);
      break;
    case 'list':
      console.log('invoke list');
      const contacts = await listContacts();
      console.table(contacts);
      break;
    case 'get':
      console.log('invoke getContact');
      const contact = await getContact(id);
      console.log(contact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
