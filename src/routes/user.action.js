import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT_ID)
  .setProject(process.env.APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export async function getUsers() {
   
  let promise = databases.listDocuments(
    process.env.APPWRITE_DATABSE_ID,
    process.env.APPWRITE_USERS_COLLECTION_ID,
    [Query.equal("title", "Hamlet")]
  );

  promise.then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
}
