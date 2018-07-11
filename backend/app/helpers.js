module.exports = {
  transformTextToJson(text) {
    try {
      return JSON.parse(`{"${text.replace(/&/g, '", "').replace(/=/g, '": "')}"}`);
    } catch (err) {
      return {};
    }
  },
};
