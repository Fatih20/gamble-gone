import getArgVariable from "./getArgVariable";
import { resetUpsertMetadata } from "./manageUpsertMetadata";
import upsert from "./upsert";

(async () => {
  const reset = getArgVariable("reset") === "true";
  const isUpsert = getArgVariable("upsert") === "true";

  if (reset) {
    resetUpsertMetadata();
  }

  if (isUpsert) {
    await upsert();
  }
})();
