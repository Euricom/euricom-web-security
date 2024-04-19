# Cookie Basis 

## Demo's

Prepare 

```
pnpm start
pnpm start:sub
pnpm start:hacker
```

### Cookie create by server

Look at 

* http://goodwebsite.com:8080/ application cookies.
* http://goodwebsite.com:8080/ network traffic
* Add another cookie and view the network traffic

### Create cookie on client

```
document.cookie="test=12345";
document.cookie="test=12345 Secure; SameSite=None";
```

### Enable page visit counter

```
window.onload = displayInfo;
```

Look at:

* server logs (read the page visit counter)

### Set cookie domain 

```
pnpm start:sub
```

See that the cookie is blocked on a sub domain (default)

* http://app.goodwebsite.com:8081/
  
Set domain on server side

```
res.cookie("serverCookie", "12345", { domain: "goodwebsite.com" });
```

### Set MaxAge and Expires

```
res.cookie("serverCookie", "1", { maxAge: 3600 });
```

Look at network & application cookies

### Secure and HttpOnly

```
res.cookie("serverCookie", "1", { HttpOnly: true, Secure: true });
```

Look at network & application cookies

### __Secure- 

https://goodwebsite.com:8433/

```
# with __Secure (will work on http & https)
res.cookie("serverCookie", "12345", { secure: true });

# with __Secure (only work on https)
res.cookie("__Secure-serverCookie", "12345", { secure: true });
```

View cookie of https://www.google.com

### Overwrite cookie via sub domain

1. login at https://goodwebsite.com:8433/

2. view and overwrite cookie at https://evil.goodwebsite.com:3099/

### __Host- prefix