# HingeDev Api;

## authRouter

- POST /signup
- POST /login
- POST /logout
- DELETE /delete (additional)

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // for updating the password or forget password.

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

-> these two apis can be combined as :

- POST /request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

-> these two apis can be combined as :

- POST /request/review/:status/:requestId

Status : ignored, interested, accepted, rejected.

## userRouter

- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed - get the profiles of the other users (say 28 users)
