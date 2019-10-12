const debug = process.env.debug === '1';
const envUrl = process.env.envUrl;

export default {
  define: {
    debug,
    'process.env.envUrl': envUrl,
  }
}
