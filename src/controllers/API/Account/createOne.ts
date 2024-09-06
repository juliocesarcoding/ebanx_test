import { Request, Response } from "express";

interface Account {
 id: string;
 balance: number;
}

interface Event {
 type: string;
 origin?: string;
 destination?: string;
 amount: number;
}

const accounts: { [key: string]: Account } = {};

const performActionIntoAccount = (req: Request, res: Response) => {
 const event: Event = req.body;

 switch (event.type) {
  case "deposit":
   if (!event.destination) {
    return res
     .status(400)
     .send("Destination account is required for deposit.");
   }
   if (!accounts[event.destination]) {
    accounts[event.destination] = { id: event.destination, balance: 0 };
   }
   accounts[event.destination].balance += event.amount;
   return res.status(201).json({ destination: accounts[event.destination] });

  case "withdraw":
   if (!event.origin) {
    return res.status(400).send("Origin account is required for withdraw.");
   }
   if (
    !accounts[event.origin] ||
    accounts[event.origin].balance < event.amount
   ) {
    return res.status(404).send("0");
   }
   accounts[event.origin].balance -= event.amount;
   return res.status(201).json({ origin: accounts[event.origin] });

  case "transfer":
   if (!event.origin || !event.destination) {
    return res
     .status(400)
     .send("Origin and destination accounts are required for transfer.");
   }
   if (
    !accounts[event.origin] ||
    accounts[event.origin].balance < event.amount
   ) {
    return res.status(404).send("0");
   }
   if (!accounts[event.destination]) {
    accounts[event.destination] = { id: event.destination, balance: 0 };
   }
   accounts[event.origin].balance -= event.amount;
   accounts[event.destination].balance += event.amount;
   return res.status(201).send({
    origin: accounts[event.origin],
    destination: accounts[event.destination],
   });

  default:
   return res.status(400).send("Invalid event type.");
 }
};

const resetAccounts = (req: Request, res: Response) => {
 for (const account in accounts) {
  delete accounts[account];
 }
 return res.status(200).send("OK");
};

const getAccountById = (req: Request, res: Response) => {
 const accountId: string = req.query.account_id as string;

 if (!accounts[accountId]) {
  return res.status(404).send("0");
 }

 console.log(accounts[accountId].balance);
 return res.status(200).json(accounts[accountId].balance);
};

export { performActionIntoAccount, resetAccounts, getAccountById };
