# Gear Swap

![Gear Swap screenshot](/client/src/screenshot.PNG "Gear Swap screenshot")

## Description 

Gear Swap is an online swap meet for musicians looking to buy, sell, or trade musical instruments, recording equipment, live sound gear, and more. Users can list the gear they are looking to trade, see what others in their area have available, and make trade offers with each other. The group structure allows for admins to remove users who act in bad faith.

### User Story

AS A musician with musical instruments, recording equipment, etc.,

I WANT a marketplace to organize trades and sales with other musicians in my area

SO THAT I can acquire new gear at reduced prices and avoid shipping costs and seller fees from selling on sites like Reverb and eBay

### Overview of Intended Functionality

Users can create or join a Group (e.g. NC Triangle). Once in a group, the user can post listings of gear with title, description, photo, estimated value, etc., and another user can see the listing and send a swap offer for a listing of their own and/or some amount of cash (actual transactions are handled offline, a la Craigslist). Users can also message each other to coordinate a meet-up. If the transaction is completed, both users can mark the swap as completed, and the number of a user’s completed swaps will be visible to other users as a sort of endorsement to trade with them.

The app is meant to merge the local advantages of Craigslist, the hands-on moderation and community-based trust of trading subreddits, and the in-app communication of Reverb.

## Technology Used

The application uses the MERN stack, with a MongoDB database (using Mongoose ODM), Express.js server, React front-end, and Node.js environment. User authentication uses JSON Web Tokens. It is hosted using MongoDBAtlas and Heroku.

## Collaborators

This project is a collaboration between:

- [Brett Piper](https://github.com/bpiper91)
- [Tien Ngo](https://github.com/Tien24196)
- [Kyle Carter](https://github.com/KCarter134)
- [Griffin Honeycutt](https://github.com/fghoneycutt)

## Deployed Application

The project is deployed at [obscure-sea-74366.herokuapp.com](https://obscure-sea-74366.herokuapp.com/).