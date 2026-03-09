import { initialEmails } from "./src/components/emails-data";

console.log("Number of emails:", initialEmails.length);
console.log("First email:", initialEmails[0]?.subject);
console.log("Last email:", initialEmails[initialEmails.length - 1]?.subject);
