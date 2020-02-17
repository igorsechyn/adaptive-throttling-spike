# Contributing

## Guidelines for pull requests

- Write tests for any changes
- Follow existing code style and conventions
- Separate unrelated changes into multiple pull requests
- For bigger changes, make sure you start a discussion first by creating an issue and explaining the intended change

## Development dependencies

- nvm 0.30.2

## Setting up a development machine

Install nodejs
```
nvm install
```

Install project dependencies
```
npm install
```

Ensure your environment is working by running the pre-commit check
```
npm test
```

## During development

- `npm test` - A pre-commit check to be run before pushing any changes.
- `npm run watch` - Starts a watch loop for unit tests
