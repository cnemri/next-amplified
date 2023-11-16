import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import config from "@/src/amplifyconfiguration.json";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";

import * as mutations from "@/src/graphql/mutations";

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

export async function createTodo(formData: FormData) {
  "use server";

  await cookiesClient.graphql({
    query: mutations.createTodo,
    variables: {
      input: {
        name: formData.get("name")?.toString() ?? "",
        description: formData.get("description")?.toString() ?? "",
      },
    },
  });

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  "use server";
  await cookiesClient.graphql({
    query: mutations.deleteTodo,
    variables: {
      input: {
        id: id,
      },
    },
  });

  revalidatePath("/");
}
