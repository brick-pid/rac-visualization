# Microservices Root Cause Analysis System (MRCA)

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Technologies](#technologies)
- [Root Cause Analysis Algorithm](#root-cause-analysis-algorithm)
- [Frontend Implementation](#frontend-implementation)
- [Getting Started](#getting-started)
- [License](#license)

## Introduction

With the growing adoption of microservices architecture, quickly identifying the root cause of failures has become essential. The Microservices Root Cause Analysis System (MRCA) offers a user-friendly and efficient way to visualize microservices topology, pinpoint failures, and aid in problem-solving. This project focuses on the front-end aspect of the system.

## Key Features

1.  **Intuitive User Interface**: The user interface should be easy to use and provide a friendly experience for operators. It includes microservices topology maps and service invocation paths, allowing users to view specific service status and performance metrics.
2.  **Microservices Topology Visualization**: Visualize microservices topology for users to quickly understand the overall architecture and dependencies between services. Topology maps should support common interaction operations and update automatically based on service status changes.
3.  **Efficient and Accurate Fault Root Cause Query**: Provide efficient and accurate fault root cause query capabilities, quickly locating the root cause and assisting operators in solving anomalies and failures in microservices systems.
4.  **Multiple Root Cause Analysis Methods**: Support multiple root cause analysis methods, allowing operators to choose the most suitable method for specific situations.

## Technologies

MRCA uses a web-based frontend-backend architecture with three main layers: interaction, business logic, and data persistence. The frontend is developed with React, Ant Design UI components, and Graphin visualization components. The backend is built with Spring Boot and implements the RCA algorithm. The data persistence layer handles database design and connects the backend with the database.

## Root Cause Analysis Algorithm

The project has implemented the TraceRCA root cause analysis algorithm, which consists of three parts: anomaly detection, suspicious microservices set mining, and microservices ranking. This algorithm helps operators perform root cause analysis, improving fault localization efficiency and reducing the risk of prolonged system failures.

## Frontend Implementation

The frontend visualization page has been developed with user experience and operational convenience in mind. The page layout is clear, and functional areas are well-defined. The frontend mainly includes the following modules:

1.  **Visualization Module**: Display the microservices topology and fault propagation paths.
2.  **Query, Search, and Filtering Module**: Quickly locate required microservices information through keyword input and filtering conditions.
3.  **User Interaction Interface Module**: Provides an easy-to-use interface for users to efficiently troubleshoot faults.

## Getting Started

To set up the project locally, follow these steps:

1.  Clone the repository:

bash

```bash
git clone https://github.com/username/microservices-root-cause-analysis.git
```

2.  Install frontend dependencies:

bash

```bash
cd frontend
npm install
```

3.  Start the frontend development server:

sql

```sql
npm start
```

4.  Install backend dependencies and start the backend server:

bash

```bash
cd backend
./mvnw spring-boot:run
```

5.  Open a web browser and navigate to `http://localhost:3000` to access the application.

## License

This project is licensed under the [MIT License](LICENSE).
