# Food Delivery App

A full-stack food ordering application with a customer storefront, an admin dashboard, and a REST API. Customers can browse food items, register, manage a cart, pay through Stripe Checkout, and track orders. Administrators can manage menu items and order statuses.

## Tech stack

- Customer app and admin dashboard: React 18, Vite, React Router, Axios
- API: Node.js, Express, MongoDB/Mongoose, JWT, Passport, Multer, Stripe
- Deployment: Render Blueprint

## Project structure

```text
FoodDeliveryApp-main/
├── React-Frontend/   # Customer-facing React app
├── AdminPanel/       # Menu and order-management dashboard
├── Node-Backend/     # Express API, MongoDB models, uploads, Stripe integration
└── render.yaml       # Render deployment blueprint
```

## Local setup

Prerequisites: Node.js 18+, npm, a MongoDB database, and a Stripe secret key.

Create environment files from the examples:

```bash
cp Node-Backend/.env.example Node-Backend/.env
cp React-Frontend/.env.example React-Frontend/.env
cp AdminPanel/.env.example AdminPanel/.env
```

Set the real MongoDB, JWT, and Stripe values in `Node-Backend/.env`. The frontend examples already point at the local API.

Install and run each service in a separate terminal:

```bash
cd Node-Backend && npm install && npm start
cd React-Frontend && npm install && npm run dev
cd AdminPanel && npm install && npm run dev
```

The storefront normally runs at `http://localhost:5173`, the admin panel at `http://localhost:5174`, and the API at `http://localhost:4000`.

## Environment variables

### API (`Node-Backend/.env`)

| Variable | Purpose |
| --- | --- |
| `MONGO_CONNECTION_SECRET` | MongoDB connection URI |
| `JWT_SECRET` | Secret used to sign customer tokens |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe signing secret for `/api/order/webhook` |
| `SESSION_SECRET` | Secret for Passport session cookies |
| `FRONTEND_URL` | Storefront URL used for Stripe return URLs |
| `CORS_ORIGINS` | Comma-separated storefront and admin URLs allowed to call the API |
| `UPLOADS_DIR` | Directory used for uploaded food images; defaults to `uploads` |
| `PORT` | Optional API port; defaults to `4000` |

### Frontends

Both `React-Frontend/.env` and `AdminPanel/.env` use:

```env
VITE_API_URL=http://localhost:4000
```

For production, set this to the deployed API URL without a trailing slash.

## Deploy on Render

1. Create an empty GitHub repository and push this project. Do not commit `.env` files.
2. In Render, select **New → Blueprint** and choose the GitHub repository. Render reads [`render.yaml`](render.yaml).
3. Set the prompted API variables:
   - `MONGO_CONNECTION_SECRET`
   - `STRIPE_SECRET_KEY`
   - `FRONTEND_URL` — the deployed storefront URL, for example `https://food-delivery-storefront.onrender.com`
   - `CORS_ORIGINS` — both deployed frontend URLs, comma-separated, for example `https://food-delivery-storefront.onrender.com,https://food-delivery-admin.onrender.com`
4. Set `VITE_API_URL` for **both** static sites to the API URL, for example `https://food-delivery-api.onrender.com`, then redeploy the static sites.
5. In Stripe, use test mode while testing. Add the API endpoint `https://<your-api-domain>/api/order/webhook` as a Stripe webhook, subscribe it to `checkout.session.completed`, and copy its signing secret to `STRIPE_WEBHOOK_SECRET`.
6. The app generates the checkout success and cancel return URLs from `FRONTEND_URL`; Stripe payment confirmation is performed by the signed webhook, not the browser redirect.

The blueprint adds a persistent disk for uploaded food images. Its mount path matches the API upload directory.

## Verification

Run these before pushing changes:

```bash
cd React-Frontend && npm run lint && npm run build
cd ../AdminPanel && npm run lint && npm run build
cd ../Node-Backend && node --check server.js
```

## Security note

Customer cart and order routes require JWT authentication. The current admin dashboard has no administrator sign-in or role model, so add real administrator authentication before exposing the admin URL broadly.

## License

No license has been selected. Add a license file before sharing the code publicly if you want to grant reuse rights.
