> Adaptive Throttling spike

# Requirements

- node 12
- docker

# Set up

- `npm install`
- `npm run build && docker-compose up --build -d` to compile ts and start both client and api servers
- `./node_modules/.bin/artillery run config.yaml` to start generating load

Load is defined in `config.yaml`, refer to artillery documentation.
