# task.fund

Telegram Mini App: Next.js фронтенд + NestJS сервер + MySQL. Запускается одной командой через Docker Compose.

## Быстрый старт

### 1. Заполнить env-файлы

```bash
cp server/.env.example server/.env
cp frontend/.env.example frontend/.env
```

Затем открыть `server/.env` и заполнить пустые значения:

- `MYSQL_ROOT_PASSWORD` — пароль root для MySQL
- `MYSQL_PASSWORD` / `PASSWORD` — пароль пользователя БД (должны совпадать)
- `TELEGRAM_BOT_TOKEN` — токен бота из [@BotFather](https://t.me/BotFather)
- `APP_URL` — публичный URL мини-приложения (например `https://your-domain.com` или `http://your-server-ip:3000`)

`frontend/.env` обычно менять не нужно — `API_URL` пробрасывается на build-time из `docker-compose.yml`.

### 2. Запустить

```bash
docker compose up -d --build
```

После старта:

- Фронтенд — http://localhost:3000
- API — http://localhost:5094
- MySQL — внутри сети compose (наружу не пробрасывается)

### 3. Остановить

```bash
docker compose down
```

Чтобы очистить данные БД и загруженные файлы:

```bash
docker compose down -v
```

## Структура

- `frontend/` — Next.js 15 + Tailwind + Effector
- `server/` — NestJS + TypeORM + MySQL
- `docker-compose.yml` — оркестрация трёх сервисов (`db`, `server`, `frontend`)
