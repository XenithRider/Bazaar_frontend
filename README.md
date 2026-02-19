# EcoBazaar

EcoBazaar is a sustainable e-commerce marketplace built with React and Tailwind CSS. It enables users to purchase products while tracking their carbon footprint, offers sellers a platform to manage eco-friendly goods, and provides admins with tools for certification and user management.

## Live Demo
```
https://bazaar-frontend-ruddy.vercel.app/
```

## Features
**Sustainability Tracking:** Monitor total carbon used and saved across orders.

**Eco-Swap Suggestions:** Intelligent cart recommendations to switch standard products for eco-friendly alternatives.

**Role-Based Access Control:** Tailored dashboards for Admin, Seller, and Customer roles.

**Eco-Certification Workflow:** Sellers can request eco-labels, which Admins review and approve.

**Modern UI:** Fully responsive design powered by Tailwind CSS and DaisyUI components.

## Project Structure

```
src/
├── api/          # Axios instances and API services (auth, products, cart, etc.)
├── components/   # Reusable UI components (StatCards, Loaders, Layout)
├── context/      # Authentication and global state
├── hooks/        # Custom hooks for data fetching
├── pages/        # Route-level components (Marketplace, Dashboards, Admin)
├── utils/        # Formatters (currency, carbon) and constants
└── App.jsx       # Routing and guard configuration
```

## Installation & SetupClone the repository:
```
git clone https://github.com/xenithrider/bazaar_frontend.git
```
```
cd bazaar_frontend
```
***Install dependencies:***
```
npm install
```


