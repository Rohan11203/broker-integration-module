# Broker Integration Module #

A robust and extensible backend module for syncing trade data from various third-party brokers. This project demonstrates a scalable architecture using Adapter and Factory patterns for broker integration, alongside comprehensive data normalization, efficient token management, and resilience features like caching and retry logic.

## Architecture Diagram ##
<img width="2191" height="1230" alt="Broker_Intergration_diagram1" src="https://github.com/user-attachments/assets/bba8c9bf-a189-47d0-975a-f0d6f15697ac" />

## ✨ Key Features

- **Extensible Broker Integration:** Designed with **Adapter** and **Factory** patterns to easily onboard new broker APIs (e.g., Zerodha, Alpaca).
- **Trade Data Normalization:** A dedicated `NormalizationService` converts diverse raw data formats from different brokers into a single, consistent `NormalizedTrade` model for internal application use.
- **Dynamic Sync Logic:** An orchestration service (`performSync`) manages the full data flow: token acquisition, broker API calls, and data normalization.
- **Secure Token Management:** Includes a mock `TokenManager` to demonstrate per-user token storage, expiry, and refresh mechanisms.
- **RESTful API Endpoint:** Exposes sync functionality via a `POST` endpoint (`/api/v1/trades/sync`) for external requests.
- **Unit Testing:** Comprehensive Jest test suite for the `NormalizationService` ensures data transformation accuracy.

## Tech Stack
- Backend: Node.js, Express.js
- Language: Typescript
- Testing: Jest, ts-jest
- HTTP Client: Axios

# Getting Stared
follow these instructions to set up and run the project locally

## Prerequisites
- Node.js (v18 or later recommended)
- npm 

## 1. Clone the Repository
```
git clone https://github.com/Rohan11203/broker-integration-module/
cd broker-integration-module
```

## 2. Install Dependencies
```
npm install
```
## 3. Configure Environment Variables
```
copy .env.example .env
```
Now, open the .env file and fill in the necessary values:

- PORT: The port the server will run on (defaults to 3000).

- ZERODHA_API_KEY: The API key for your broker application. For a real test, replace "placeholder_api_key" with a valid key.

- ZERODHA_ACCESS_TOKEN: This is used for end-to-end testing with a real, valid accessToken.

## 4. Run the Application
```
npm run dev
```
The server will start on the port specified in your .env file (e.g., http://localhost:3000).

## 🧪 Testing the Application

## Running Unit Tests
To verify the core data transformation logic, run the Jest test suite:
```
npm test
```
## Testing the API Endpoint with Postman

You can test the main sync endpoint using a tool like Postman.

- URL: POST http://localhost:3000/api/v1/trades/sync
- Headers: Set Content-Type to application/json.
- Body: Select raw and JSON.

## Scenario 1: Testing the Token Refresh Simulation
To test the application's ability to handle token expiry and refresh, leave the TEST_USER_ACCESS_TOKEN in your .env file empty.

Request Body:
```
{
    "userId": "testUser", // use only this values for testing 
    "brokerName": "Zerodha"
}

```
The console will log the full refresh flow from the TokenManager, and the final API call will fail (as expected) because it uses a dummy token.

## Scenario 2: Performing a Real End-to-End Test
To test the full integration with a real broker API:

1. In your .env file, set ZERODHA_API_KEY to your real API key.
2. In your .env file, set TEST_USER_ACCESS_TOKEN to a valid, non-expired accessToken you have
generated from the broker

Now, send the same Postman request as above. The TokenManager will bypass the simulation and provide the real accessToken from the .env file, resulting in a successful API call.

# 🏗️ Architectural Design Decisions
- Adapter & Factory Patterns:  The core of the architecture relies on the Adapter Pattern to handle inconsistencies between different broker APIs. Each broker has its own Adapter that implements a common IBrokerAdapter interface. This makes our internal SyncService completely decoupled from any specific broker. A Factory Pattern (createBrokerAdapter) is used to dynamically select and instantiate the correct adapter at runtime based on the brokerName

- The Normalization Boundary: A key design choice was to create a strict boundary between the "outside world" (inconsistent raw data) and our "internal application" (clean, consistent data). The NormalizationService acts as this boundary. Adapters fetch raw, broker-specific data (e.g., ZerodhaRawTradeData), but this data is immediately passed to the NormalizationService. Only the standardized NormalizedTrade objects are allowed to proceed into the core application logic. This protects the application from external API changes and simplifies all internal logic.

- Functional Core, Class-based Adapters: Most of the core logic (services, managers) is written using a functional approach for simplicity and clear data flow. However, the Adapters are implemented as classes to cleanly adhere to the IBrokerAdapter interface contract (implements IBrokerAdapter), which is a core tenet of the Adapter pattern.

## ➕ How to Add a New Broker

The architecture makes it simple to add support for a new broker (e.g., "NewBroker"). The process involves four clear steps:

1.  **Define the Raw Data Model:** Create a new `interface` for the broker's specific trade data structure in `src/interfaces/newbroker-raw-trade.ts`.

2.  **Create the Adapter:** Create a new file `src/adapters/newbroker.adapter.ts`. Implement the `IBrokerAdapter` interface, making the real API call to fetch raw data.

3.  **Update the Factory:** Open `src/adapters/adapter.factory.ts`, import your new `NewBrokerAdapter`, and add a `case 'newbroker'` to the `switch` statement to return an instance of it.

4.  **Add Normalization Rules:** Open `src/services/normalization.service.ts` and add a `case 'newbroker'` with the logic to convert `NewBrokerRawTradeData` into a `NormalizedTrade`.

*No other part of the application needs to be changed.*
