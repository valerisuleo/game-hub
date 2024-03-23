Got it, here's the streamlined version:

1. **Install React Query**
```
npm install @tanstack/react-query
```
or
```
yarn add @tanstack/react-query
```

2. **Set Up React Query in Your Project**

- Create a `queryClient.js`:

```javascript
// src/queryClient.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();
```

- Wrap your app with `QueryClientProvider` in `index.js` or `App.js`:

```javascript
// src/index.js or src/App.js
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import App from './App';

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
```

3. **Use React Query**

- Fetch data in your component:

```javascript
// In any component
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('YOUR_API_ENDPOINT');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function MyComponent() {
  const { data, error, isLoading } = useQuery(['dataKey'], fetchData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

That's it, you're all set with React Query!