import {client} from "boot/apollo";
import {handleError, handleResponse} from "src/utils";

export const userService = {
  index() {
    // return all users
    return client
      .query({
        query: User
      })
      .then(handleResponse)
      .catch(handleError)
  }
}
