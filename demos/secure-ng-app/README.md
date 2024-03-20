# secure-ng-app

## Quick Start

```bash
pnpm run build

# preview build with CSP enabled
pnpm preview:csp --log --pretty       # log CSP in readable format
pnpm preview:csp --log --evaluate     # evaluate CSP
pnpm preview:csp --log --reportOnly   # report only, don't fail on CSP violations

# docker
docker build -t secure-ng-app .
docker run --rm -it -p 8081:80 secure-ng-app
```
