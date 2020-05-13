# copper-typescript
> A lightweight Typescript library for Copper CRM API -> https://developer.copper.com/

## Install
If this is your first time using the Github package repository, you must [auth](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages)

```sh
# Tell npm to use the Github package repository
echo registry=https://npm.pkg.github.com/gamesight > .npmrc

# Install the package
npm install @gamesight/copper-typescript
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
