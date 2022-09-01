const HttpAgent = require("agentkeepalive");
const got = require("got");

const DEFAULT_USER_AGENT = `Mozilla/5.0 (compatible; allOrigins/${global.AO_VERSION}; +http://allorigins.win/)`;
const get = async (data) => {
  const gotOptions = {
    agent: {
      http: new HttpAgent({
        keepAlive: true,
      }),
      https: new HttpAgent.HttpsAgent({
        keepAlive: true,
      }),
    },
    responseType: data.type,
    dnsCache: true,
    headers: { "user-agent": data.ua, referer: "https://www.google.com" },
  };

  return got(data.url, gotOptions);
};

module.exports = get;
