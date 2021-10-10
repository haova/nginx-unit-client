const { expect, assert } = require('chai');

const createClient = require('../lib');

describe('Main test', () => {
  it('should be create client with default config', async () => {
    const client = createClient();

    expect(client).to.has.property('get');
  });

  it('should be create client without default config', async () => {
    const client = createClient({
      socketPath: '/var/run/control.unit.sock'
    });

    expect(client).to.has.property('get');
  });

  it('should clear data', async () => {
    const client = createClient();
    const res = await client.delete('/config/');

    expect(res).to.has.property('success', 'Reconfiguration done.');
  });

  it('should get data', async () => {
    const client = createClient();
    const res = await client.get('/');

    expect(res).to.has.property('certificates');
    expect(res).to.has.property('config');
    expect(res.config).not.to.has.property('routes');
  });

  it('should put config', async () => {
    const client = createClient();
    const res = await client.put('/config/routes', [
      {
        "match": { "host": "example.com" },
        "action": { "proxy": "http://127.0.0.1:8080" }
      }
    ]);

    expect(res).to.has.property('success', 'Reconfiguration done.');
  });

  it('should get data after config', async () => {
    const client = createClient();
    const res = await client.get('/');

    expect(res).to.has.property('certificates');
    expect(res).to.has.property('config');
    expect(res.config).to.has.property('routes');
  });

  it('should throw error', async () => {
    const client = createClient();

    try {
      await client.delete('/');
      assert.fail('not throw error');
    } catch(err){
      expect(err).to.has.property('message', 'Invalid method. ');
    }

    try {
      await client.put('/config/routes', [
        {
          "match": { "host": "example.com" },
          "action": { "pass": "http://127.0.0.1:8080" }
        }
      ]);
      assert.fail('not throw error');
    } catch(err){
      expect(err).to.has.property('message', 'Invalid configuration. Request "pass" value "http://127.0.0.1:8080" is invalid.');
    }
  });
});