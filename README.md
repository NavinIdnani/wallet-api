📱 React Native Wallet App / Backend-Driven Expense & Budget Tracker

A full-stack mobile application designed to track personal expenses and budgets, backed by a secure API and a production-grade PostgreSQL database.
This project focuses on backend architecture, authentication, database design, and API integration with a mobile client, rather than just UI.

🔐 Authentication & User Management
* Secure authentication using Clerk with email verification
* Signup & login flow with 6-digit email OTP
* User-specific data isolation (each user sees only their own transactions)
* Secure logout and session handling

💼 Core Application Features
* Home screen displaying current balance and transaction history.
* Create income and expense transactions via API.
* Automatic balance recalculation on every transaction.
* Delete transactions with real-time balance update.
* Pull-to-refresh implemented from scratch.
* Clean navigation flow using React Navigation.

🧠 Backend & Database Architecture
* REST API built using Node.js & Express
* PostgreSQL (Neon) used for persistent data storage
* Well-structured database schema for users, transactions, and balances
* API-level validation and error handling
* Rate limiting implemented using Redis to prevent abuse
* Environment-based configuration using .env

🛠 Tech Stack

  Backend:

    Node.js, Express.js 
    
    PostgreSQL (Neon)
    
    Redis (Rate Limiting)
    
    Clerk (Authentication)
    
    REST APIs
    
  Mobile: 
    
    React Native
    
    Expo
    
    React Navigation


🚀 What This Project Demonstrates
* Designing and consuming backend APIs from a mobile client
* Secure authentication with email verification
* Database-driven application logic (not hard-coded state)
* Backend performance considerations (rate limiting, validation)
* Real-world application flow for financial data
* End-to-end full-stack development mindset
