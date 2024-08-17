import type { UserFormInterface, UserInterface } from "@/shared/interfaces";
import axios from "axios";

const BASE_URL = "/api/users";

export async function createUser(partialUser: UserFormInterface): Promise<UserInterface | null> {
  const response = await axios.post(BASE_URL, partialUser);
  if (!response.data.error) {
    return response.data;
  } else {
    throw new Error("Create user n'a pas fonctionné " + response.data.error);
  }
}

export async function fetchCurrentUser(): Promise<UserInterface | null> {
  const response = await axios.get(BASE_URL);
  if (!response.data?.error) {
    return response.data;
  } else {
    throw new Error("Erreur dans Fetch Current User " + response.data.error);
  }
}
