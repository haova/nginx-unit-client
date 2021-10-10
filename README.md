# Nginx Unit Client

## Usage

**Create and config**

```js
const createClient = require('nginx-unit-client');

const client = createClient({
  unixPath: '/var/run/control.unit.sock' // default: /var/run/control.unit.sock
});

;(async () => {
  await client.delete(); // reset configs

  await client.put('/config/routes', [
    {
      "match": { "host": "example.com" },
      "action": { "proxy": "http://127.0.0.1:8080" }
    }
  ]); // create routes
})();
```

**Support methods**

- `client.get(path)`
- `client.put(path, payload)`
- `client.delete(path)`

## References

You can read more about the Nginx Unit at: [https://unit.nginx.org/](https://unit.nginx.org/)

## License

MIT