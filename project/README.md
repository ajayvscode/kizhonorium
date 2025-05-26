# Google Backlink Counter

A web application that retrieves and displays the number of backlinks (search results) from Google Search for a given keyword.

## Features

- Python FastAPI backend for scraping Google Search results
- React frontend with a clean, modern UI
- Docker containerization for easy deployment
- Proxy support for Google Search requests
- Responsive design for all device sizes

## Project Structure

```
.
├── backend/
│   ├── app.py             # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # Backend container configuration
├── src/
│   ├── components/        # React components
│   ├── services/          # API services
│   └── ...                # Other frontend files
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Frontend container configuration
└── README.md              # Project documentation
```

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.12 (for local development)

### Running with Docker Compose

1. Clone the repository
2. Start the application:

```bash
docker-compose up
```

3. Access the application at http://localhost:3000

### Local Development

#### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:

```bash
uvicorn app:app --reload
```

4. The API will be available at http://localhost:8000

#### Frontend

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. The frontend will be available at http://localhost:5173

## API Documentation

### Endpoint: GET /backlinks

Returns the number of backlinks (search results) from Google Search for a given keyword.

#### Query Parameters

- `keyword` (string, required): The search keyword or phrase
- `proxy` (string, optional): Proxy URL (e.g., http://user:pass@host:port)

#### Response

```json
{
  "keyword": "example keyword",
  "backlink_count": 123000
}
```

## Usage

1. Enter a keyword in the search box
2. Click the "Get Backlinks" button
3. View the number of backlinks (search results) for your keyword

## License

This project is licensed under the MIT License - see the LICENSE file for details.