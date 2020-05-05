# copper-typescript
> Typescript Library for Copper CRM API

## Install

```sh
npm install github:Gamesight/copper-typescript
```

## Usage

```ts
import Copper, { Lead } from "@gamesight/copper-typescript"

// initialize Copper with your access token and email
const copper: Copper = new Copper("access_token", "email")

// fetch leads
let leads: Lead[] = await copper.listLeads()
```
