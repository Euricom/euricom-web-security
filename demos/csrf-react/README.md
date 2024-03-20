# csrf-react-demo

## Prepare the environment

Add the following to your `/etc/hosts` file:

```
##
# Host Database
#
127.0.0.1	evilhacker.com
127.0.0.1	goodwebsite.com
127.0.0.1	evil.goodwebsite.com
```

Make sure you installed pnpm

## Scripts

Then, run the following commands:

```shell
# install dependencies
pnpm install

# build the react application and start the server
# which launches the https://goodwebsite.com site
pnpm start

# launch the attacker application (http://evil.evilhacker.com)
# run this in another terminal
pnpm start:attacker

# starts the react application in dev mode
# make sure the server is running before running this command
pnpm dev
```

Please, read [Prevent Cross-Site Request Forgery (CSRF) Attacks](https://auth0.com/blog/cross-site-request-forgery-csrf/) to learn more about CSRF attacks and how to prevent them.

## Demo

1. Fetch POST request (from evilhacker.com) will be blocked by CORS policy.
  - This is standard behavior for modern browsers.
  - Browsers from before 2008 will not block this request.
  - https://caniuse.com/?search=cors

2. Form POST will not be blocked by CORS policy.
  - see vulnerability in `app.use(express.urlencoded());`

3. Form POST (with JSON) not be blocked by CORS policy
  - we need `"credentials": "include"` in the fetch options to include the token
  - see vulnerability in `app.use(express.json());`
  - input validation will help to prevent this attack
 
4. Fix is by using 'samesite' cookie policy
  - no more cookie passed from the attacker site 

5. Be aware of the post without a body, it will NOT be blocked by CORS policy (/api/reviews/clear)
  - logout & clear the reviews
  - can be fixed by adding a `x-scrf=1` header to the request & enforce it.
  - also for a preflight request for a GET request

