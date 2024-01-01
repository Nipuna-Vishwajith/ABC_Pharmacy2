
## Server Setup

1. **Dependencies**
    - [Go](https://golang.org/) (v1.16 or higher)
    - [Gin](https://gin-gonic.com/) (Golang web framework)
    - [Gorm](https://gorm.io/) (Golang ORM)
    - [Cors](https://github.com/gin-contrib/cors) (Middleware for handling Cross-Origin Resource Sharing)
    - PostgreSQL Database

2. **Installation Steps**
    ```bash
    # Install Go packages
    go get -u github.com/gin-gonic/gin
    go get -u github.com/jinzhu/gorm
    go get -u github.com/gin-contrib/cors
    go get -u github.com/jinzhu/gorm/dialects/postgres
    ```

3. **Run the Server**
    ```bash
    go run main.go
    ```
    The server will run on `http://localhost:8080`.


# Frontend Setup

## Installation

1. **Dependencies**
    - [Node.js](https://nodejs.org/) (v14 or higher)
    - [React](https://reactjs.org/) (v18)
    - [React Router](https://reactrouter.com/) (v6)
    - [Axios](https://axios-http.com/) (v0.24)

2. **Installation Steps**
    ```bash
    # Install Node.js packages
    npm install
    ```

## Usage

1. **Start the Development Server**
    ```bash
    npm start
    ```
    The application will be accessible at `http://localhost:3000`.

ABC_Pharmacy.sql is attached here.