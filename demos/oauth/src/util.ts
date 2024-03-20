import getPkceRaw from "oauth-pkce";

export const splitSearchParams = (search: string) => {
  if (!search) return "";
  const parts = search.split("&");
  return parts.reduce((acc, part) => {
    const [key, value] = part.split("=");
    if (acc.length > 0) {
      acc += "  &";
    }
    acc += key + "=" + value + "<br/>";
    return acc;
  }, "");
};

export const getPkce = (): Promise<{ verifier: string; challenge: string }> => {
  return new Promise((resolve, reject) => {
    getPkceRaw(50, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
