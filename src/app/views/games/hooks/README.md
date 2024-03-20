# useGames Hook Documentation

## Introduction

The `useGames` hook is designed for fetching, displaying, and managing a collection of games in React applications. This hook simplifies asynchronous data handling, supports dynamic query parameters, and integrates with application state management.

## Importing the Hook

First, import the `useState` and `useEffect` hooks from React, and any other necessary components or services.

```javascript
import { useEffect, useState } from 'react';
import { gameService } from '../service';
import { IGame } from '../interfaces';
import { iconMap } from '../../../common/utilities';
import { IEventEmitted, useDataContext } from '../../../common/context/data';
```

## Hook Structure

### Initializing State

The hook starts by initializing state variables for loading status, the collection of games, and query parameters.

```javascript
const [isLoading, setSpinner] = useState(false);
const [collection, setCollection] = useState<IGame[]>([]);
const [queries, setQuery] = useState({
    platforms: { isActive: false, value: '' },
    genres: { isActive: false, value: '' },
    ordering: { isActive: false, value: '' },
    search: { isActive: false, value: '' },
});
```

### useEffect for Initial Fetch

An `useEffect` with an empty dependency array is used to perform the initial fetch of game data when the component mounts.

```javascript
useEffect(() => {
    getAll();
}, []);
```

### useEffect for Event-driven Updates

Another `useEffect` listens for changes to an event object, triggering the `getAll` function based on specific event names.

```javascript
useEffect(() => {
    if (event?.name) {
        getAll(event);
    }
}, [event]);
```

### Fetching Data

The `getAll` function demonstrates handling both initial data fetching and updates based on query changes. It showcases conditional query parameter assembly and calls `fetchGames` with the constructed endpoint.

```javascript
function getAll(item?: IEventEmitted): void {
    setSpinner(true);

    // Building query URL or resetting queries based on the presence of an item
    // Fetching games with updated queries or resetting to default

    setSpinner(false);
}
```

### Utility Functions

- `fetchGames`: Calls the API service and updates the game collection.
- `addIconProp`: Adds icon URLs to the games based on a mapping.
- `createQueryURL`: Constructs a query URL from the active queries.

```javascript
function fetchGames(endPoint: string): void {
    gameService.get(endPoint).then((response) =>
        setCollection(addIconProp(response.data.results))
    );
}

function createQueryURL(object): string {
    // Implementation
}
```

## Using the Hook

Here's how you can use the `useGames` hook in a React component:

```javascript
import React from 'react';
import useGames from './useGames';

function GameList() {
    const { games, isLoading } = useGames();

    if (isLoading) return <div>Loading...</div>;

    return (
        <ul>
            {games.map(game => <li key={game.id}>{game.name}</li>)}
        </ul>
    );
}
```

## Conclusion

The `useGames` hook abstracts the complexity of fetching and managing game data, making it easier to build responsive and dynamic interfaces. By encapsulating data fetching logic, state management, and effects into a reusable hook, developers can significantly streamline their React components and improve code readability.