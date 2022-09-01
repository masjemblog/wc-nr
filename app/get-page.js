const get = require("./http-client.js");

const DEFAULT_USER_AGENT = `Mozilla/5.0 (compatible; allOrigins/${global.AO_VERSION}; +http://allorigins.win/)`;

const getPage = async (url, ua, type) => {
  try {
    if (ua == null) {
      ua = DEFAULT_USER_AGENT;
    }
    const data = {
      url: url,
      ua: ua,
      type: type,
    };
    const page = await get(data);
    if (page.statusCode == 200) {
      return {
        headers: page.headers,
        content: page.body,
        code: page.statusCode,
      };
    } else {
      return "err";
    }
  } catch (e) {
    return "err";
  }
};

module.exports = getPage;
