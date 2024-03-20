# secure-react-app

## Quick Start

```bash
pnpm build

# preview build with CSP enabled
pnpm preview:csp --log --pretty       # log CSP in readable format
pnpm preview:csp --log --evaluate     # evaluate CSP
pnpm preview:csp --log --reportOnly   # report only, don't fail on CSP violations

# docker
docker build -t secure-react-app .
docker run --rm -it -p 8081:80 secure-react-app
```
