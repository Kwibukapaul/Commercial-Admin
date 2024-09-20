import { Account, Client } from "appwrite";

 const client = new Client();

 client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66ed86b2000aff9435f4');

  export const account = Account(client);





