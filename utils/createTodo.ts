import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import config from "@/src/amplifyconfiguration.json";
import * as mutations from "@/src/graphql/mutations";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

async function createTodo(formData: FormData) {
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
