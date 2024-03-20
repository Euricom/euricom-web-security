This sample is based on the original [csrf-sample-app](https://auth0.com/blog/cross-site-request-forgery-csrf/) from Auth0.

# Demo

Add the following to your `/etc/hosts` file:

```
##
# Host Database
#
127.0.0.1	evilhacker.com
127.0.0.1	goodwebsite.com
```

Then, run the following commands:

```shell
# install dependencies
pnpm install

# launch the Vulnerable app
pnpm start

# launch the Safe app
pnpm start:safe

# launch the attacker application
# run this in another terminal
pnpm start:attacker
```

Please, read [Prevent Cross-Site Request Forgery (CSRF) Attacks](https://auth0.com/blog/cross-site-request-forgery-csrf/) to learn more about CSRF attacks and how to prevent them.

