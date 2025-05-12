# njoy
**With nJoy its all about enjoying the movies and or series you watch.**
## Running the application (from Source /w Docker & Docker-Compse)
**This is how I would run it without an CI/CD integration and before I have integrated it into the backend as an template.**
**Clone the repository to your host**
```bash
git clone https://github.com/njoy/njoy-frontend.git
# change directory
cd njoy-frontend
```
**I am sorry for what comes next**
If you want to run in *production* you need to edit the api source
*accounts.api.ts*
```bash
nano src/api/accounts/accounts.api.ts
# edit the base_url to match your DNS-Record
```
```JS
private static readonly BASE_URL: string = window.location.host.includes("localhost") ? "http://localhost:6692/api/v1" : "https://api.yourhost.com/api/v1";
```
*video.api.ts*
```bash
nano src/api/video/video.api.ts
# edit the base_url to match your DNS-Record
```
```JS
private static readonly BASE_URL: string = window.location.host.includes("localhost") ? "http://localhost:6692/api/v1" : "https://api.yourhost.com/api/v1";
```
**Build Docker-Image**
```bash
docker build -f dockerfile . -t njoy-frontend
```
**Spin up container**
```bash
docker compose -p njoy-frontend -f docker-compose.yaml up -d
```
**Visit your page**
```bash
#copy and open address
http://localhost:8080
```