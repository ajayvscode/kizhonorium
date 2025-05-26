from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
import re
from bs4 import BeautifulSoup
from typing import Optional
import os
from pydantic import BaseModel

app = FastAPI(
    title="Backlink Count API",
    description="API to retrieve backlink count from Google Search for a given keyword",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BacklinkResponse(BaseModel):
    keyword: str
    backlink_count: int

@app.get("/backlinks", response_model=BacklinkResponse)
async def get_backlinks(
    keyword: str = Query(..., description="The search keyword or phrase"),
    proxy: Optional[str] = Query(None, description="Proxy URL (e.g., http://user:pass@host:port)")
):
    if not keyword:
        raise HTTPException(status_code=400, detail="Keyword parameter is required")
    
    try:
        # Prepare the Google search URL
        search_url = f"https://www.google.com/search?q={keyword}"
        
        # Set up headers to mimic a browser
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        }
        
        # Set up proxy if provided
        proxies = None
        if proxy:
            proxies = {
                "http://": proxy,
                "https://": proxy,
            }
        
        # Make the request to Google
        async with httpx.AsyncClient(proxies=proxies, follow_redirects=True) as client:
            response = await client.get(search_url, headers=headers, timeout=30.0)
            response.raise_for_status()
            
            # Parse the HTML content
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Find the result stats text (e.g., "About 123,456 results (0.67 seconds)")
            result_stats = soup.find("div", {"id": "result-stats"})
            
            if not result_stats or not result_stats.text:
                raise HTTPException(status_code=500, detail="Could not extract result count from Google")
            
            # Extract the number from the result stats text
            match = re.search(r"About ([\d,]+) results", result_stats.text)
            if not match:
                raise HTTPException(status_code=500, detail="Could not parse result count from Google")
            
            # Convert the extracted string to an integer (removing commas)
            backlink_count = int(match.group(1).replace(",", ""))
            
            return {
                "keyword": keyword,
                "backlink_count": backlink_count
            }
    
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error: {str(e)}")
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching backlinks: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Welcome to the Backlink Count API"}