# Vkrun Benchmark

## Installation

##### NPM

```bash
npm install
```

##### YARN

```bash
yarn install
```

## Running the Benchmark

### Start the Server

Before running the benchmark, you need to start the server locally.

##### NPM

```bash
npm start
```

##### YARN

```bash
yarn start
```

### Run the Benchmark

Use Autocannon to test Vkrun's performance with 100 simultaneous connections for 20 seconds, with a pipeline factor of 10.

##### NPM

```bash
npm autocannon -c 100 -d 20 -p 10 http://localhost:3000/hello-world'
```

##### YARN

```bash
yarn autocannon -c 100 -d 20 -p 10 http://localhost:3000/hello-world'
```
