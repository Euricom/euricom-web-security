/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const report = body["csp-report"];
      console.error(
        "❌ CSP Report: '%s' blocked by '%s' in '%s'",
        report["blocked-uri"],
        report["violated-directive"],
        report["document-uri"],
      );
      res.status(200).send("ok");
    } catch (err) {
      console.error(err);
      res.status(500).send("error");
    }
    return;
  }
  res.status(404).send("not found");
}
