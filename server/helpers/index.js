const responseByCode = (res, code, status = 200) => res.status(status).json({ code });

const selectConfidenceMessage = confidence => {
  
};

module.exports = {
  responseByCode
};
