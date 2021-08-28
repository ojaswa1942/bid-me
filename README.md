# bid-me


An E2E application for auctions. A user can:
- Create an account
- Sign in
- Add a product
- Set deadline for an added product
- Place bid on a product
- List all products
- List added products
- List bids
- List won auctions
 
This application was made purely for learning purposes.

## functions
The backend is exposed using Firebase functions and can be found in the [functions](./functions) directory. The backend is based on a 3-layer architecture and hence uses: Controllers, Services, & Models. 

Furthermore, pubsub schedules can be found in the [src/schedules](./functions/src/schedules) directory. 


## web
The web (frontend) is created using AngularJs and can be found in the [web](./web) directory. Similar to backend, the angular project uses Components, Services, & Interfaces.
