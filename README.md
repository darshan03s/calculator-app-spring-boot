# A basic calculator app with frontend and backend

Frontend using React, Backend using spring boot for calculation 😜

```bash
git clone https://github.com/darshan03s/calculator-app-spring-boot.git
```

```bash
cd frontend
pnpm install
pnpm dev
```

```bash
cd backend/calculator
mvn spring-boot:run
```

Frontend deployed on Vercel, Backend deployed on Railway

## Backend application.properties

```
spring.application.name=<your-app-name>
app.frontend-url=https://<your-frontend-url>
```

### Frontend .env

```
VITE_API_URL=https://<your-backend-url>
```
