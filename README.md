# copper-typescript
> A lightweight Typescript library for Copper CRM API -> https://developer.copper.com/

## Install

```sh
npm install github:Gamesight/copper-typescript
```

## Usage

```ts
import Copper, { Lead } from "@gamesight/copper-typescript"

// initialize Copper with your access token and email
const copper: Copper = new Copper("access_token", "email")

// create a lead
const lead: Lead = {
  name: "John Doe",
  title: "VP marketing"
}
await copper.createLead(lead)

// fetch leads
let leads: Lead[] = await copper.listLeads()
```
