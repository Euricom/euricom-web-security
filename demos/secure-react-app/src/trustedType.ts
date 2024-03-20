/* eslint-disable @typescript-eslint/no-explicit-any */
import DOMPurify from "dompurify";

export const policy = window.trustedTypes?.createPolicy("default", {
  createHTML: (input: string) => {
    return DOMPurify.sanitize(input);
  },
  createScriptURL: (input: string) => {
    // Validate the input and allow only trusted URLs from a whitelist
    const whitelist = ["https://www.google.com", "https://mywebsite.com"];
    if (whitelist.some((utl) => input.includes(utl))) {
      return input;
    }
    return `${input}?invalid=true`;
  },
  createScript(payload) {
    if (payload === "void(0)") {
      // javascript:void(0) navigation or, e.g. eval('void(0)')
      return "void(0)" as any;
    }
    // returning undefined rejects a value and stops navigation.
    return undefined as any;
  },
});
