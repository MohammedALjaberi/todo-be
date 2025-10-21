# Search Feature Documentation

## Overview

The API now supports searching tasks by title and description using the `search` query parameter.

## How to Use

### Basic Search

Search for tasks containing specific text in either title or description:

```
GET /api/tasks?search=project
```

This will return all tasks where:

- Title contains "project" (case-insensitive), OR
- Description contains "project" (case-insensitive)

### Examples

#### 1. Search for "documentation"

```bash
curl "http://localhost:3000/api/tasks?search=documentation"
```

#### 2. Search combined with status filter

```bash
curl "http://localhost:3000/api/tasks?search=API&status=TODO"
```

#### 3. Search with sorting

```bash
curl "http://localhost:3000/api/tasks?search=project&sortBy=createdAt&order=desc"
```

### From Frontend

**JavaScript/TypeScript:**

```javascript
// Basic search
const response = await fetch("http://localhost:3000/api/tasks?search=project");
const data = await response.json();

// Search with filters
const searchParams = new URLSearchParams({
  search: "documentation",
  status: "TODO",
  sortBy: "title",
  order: "asc",
});

const response = await fetch(`http://localhost:3000/api/tasks?${searchParams}`);
const data = await response.json();
```

**React Example:**

```jsx
const [searchTerm, setSearchTerm] = useState('');
const [tasks, setTasks] = useState([]);

const searchTasks = async () => {
  const params = new URLSearchParams();
  if (searchTerm) params.append('search', searchTerm);

  const response = await fetch(`http://localhost:3000/api/tasks?${params}`);
  const data = await response.json();
  setTasks(data.data);
};

// In your component
<input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search tasks..."
/>
<button onClick={searchTasks}>Search</button>
```

**Axios Example:**

```javascript
import axios from "axios";

const searchTasks = async (searchTerm) => {
  const response = await axios.get("http://localhost:3000/api/tasks", {
    params: {
      search: searchTerm,
      status: "TODO", // optional
      sortBy: "createdAt", // optional
      order: "desc", // optional
    },
  });
  return response.data;
};
```

## Query Parameters

| Parameter | Type   | Required | Description                                                                     |
| --------- | ------ | -------- | ------------------------------------------------------------------------------- |
| `search`  | string | No       | Search term to find in title or description                                     |
| `status`  | string | No       | Filter by status: `TODO`, `IN_PROGRESS`, or `DONE`                              |
| `sortBy`  | string | No       | Sort field: `title`, `status`, `createdAt`, `updatedAt`, `startDate`, `endDate` |
| `order`   | string | No       | Sort order: `asc` or `desc` (default: `desc`)                                   |

## Response Format

```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "6530f3a2b8c9d4e5f6a7b8c9",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "status": "TODO",
      "startDate": "2024-10-19T10:00:00.000Z",
      "endDate": "2024-10-21T18:00:00.000Z",
      "createdAt": "2024-10-19T08:30:00.000Z",
      "updatedAt": "2024-10-19T08:30:00.000Z"
    }
  ],
  "count": 1
}
```

## Search Behavior

- **Case-insensitive**: Searches are not case-sensitive
- **Partial matching**: Finds tasks containing the search term anywhere in title or description
- **OR logic**: Returns tasks matching in either title OR description
- **Combines with filters**: Can be used together with status filter and sorting

## Examples

### Search for "API"

```
GET /api/tasks?search=API
```

Returns tasks with "API", "api", or "Api" in title or description.

### Search for "urgent" with TODO status

```
GET /api/tasks?search=urgent&status=TODO
```

Returns only TODO tasks containing "urgent".

### Search and sort by creation date

```
GET /api/tasks?search=project&sortBy=createdAt&order=desc
```

Returns tasks containing "project", sorted by newest first.

## Testing with Postman

1. Open Postman
2. Create a new GET request
3. URL: `http://localhost:3000/api/tasks`
4. Add query parameter: `search` = `your search term`
5. Click Send

## Testing with cURL

```bash
# Simple search
curl "http://localhost:3000/api/tasks?search=documentation"

# URL-encoded search (for spaces)
curl "http://localhost:3000/api/tasks?search=API%20documentation"

# Combined with filters
curl "http://localhost:3000/api/tasks?search=project&status=IN_PROGRESS&sortBy=title&order=asc"
```

## Notes

- Empty search parameter returns all tasks
- Search is performed on both title and description fields
- Special characters in search terms should be URL-encoded
- MongoDB's text search is used for efficient searching

Happy searching! 🔍
