const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface BacklinkResponse {
  keyword: string;
  backlink_count: number;
}

export interface ApiError {
  status: number;
  message: string;
}

/**
 * Fetch backlink count for a keyword
 */
export const getBacklinkCount = async (keyword: string): Promise<BacklinkResponse> => {
  try {
    const response = await fetch(`${API_URL}/backlinks?keyword=${encodeURIComponent(keyword)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        message: errorData.detail || 'An error occurred while fetching backlink data',
      };
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw {
        status: 500,
        message: error.message || 'Network error occurred',
      };
    }
    throw error;
  }
};