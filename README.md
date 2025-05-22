# Backlink Counter API

A FastAPI service that retrieves the number of backlinks (total search results) from Google Search for a given keyword.

## Features

- GET endpoint to retrieve backlink count for any keyword
- Proxy support for making requests
- Rate limiting and user agent rotation
- Docker containerization
- Comprehensive error handling
- CORS support
- OpenAPI documentation

## Tech Stack

- Python 3.12
- FastAPI
- BeautifulSoup4
- HTTPX
- Docker

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Python 3.12+ (for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/backlink-counter-api.git
cd backlink-counter-api
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Update the `.env` file with your proxy settings (if needed)

### Running with Docker

```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000`

### Local Development

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Once the server is running, visit:
- OpenAPI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

### Endpoint

```
GET /backlinks?keyword=your_keyword
```

#### Parameters

- `keyword` (required): The search term to get backlinks for

#### Response

```json
{
  "keyword": "example keyword",
  "backlink_count": 123000
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- 400: Bad Request (missing or invalid keyword)
- 500: Internal Server Error (scraping or parsing failed)

## License

MIT