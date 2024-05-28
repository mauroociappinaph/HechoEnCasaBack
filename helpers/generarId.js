const generarId = () => {
  return Date.now().toString(32) + Math.random().toString(36).substring(2, 15);
};

module.exports = generarId;
