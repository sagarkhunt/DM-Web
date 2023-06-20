import { v4 as uuidv4 } from "uuid";
export const uniqueId = () => {
    const NewUniqueId = uuidv4()
    const uniqueLocalId =
      typeof window !== "undefined" &&  localStorage.getItem("UID");

    const body = {}
    if (!uniqueLocalId) {
        typeof window !== "undefined" &&
          localStorage.setItem("UID", NewUniqueId);
        body.uid = NewUniqueId ?? '';
    } else {
        body.uid = uniqueLocalId ?? '';
    }
  return body;
};
