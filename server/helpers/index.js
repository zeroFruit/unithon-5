import moment from 'moment-timezone';

const responseByCode = (res, code, status = 200) => res.status(status).json({ code });

const selectConfidenceMessage = confidence => {

};

const appendTsToDocs = docs => {
  return docs.map(doc => {
    let ts = moment(doc._id.getTimestamp()).format('YYYY-MM-DD');
    return { doc, ts };
  });
};

const aggregateDocsByTs = docs => {
  let _ts;
  let sameDays = [];
  let result = {};

  docs.forEach((doc, i) => {
    let __doc = doc.doc;
    let ts = doc.ts;

    if (i === 0) {
      _ts = ts;
      sameDays.push({ link: __doc.link, desc: __doc.description });
    } else {
      if(_ts === ts) {
        sameDays.push({ link: __doc.link, desc: __doc.description });
      } else {
        result[_ts] = sameDays;
        sameDays = [];
      }
    }
  });

  console.log('result', result);
  return result;
};

const addTextWithConfidence = confidence => {
  let suffix = '';
  if (confidence <= 0.7) {
    suffix = '(아마도) ';
  } else {
    suffix = '(확실히) ';
  }

  return suffix;
}

module.exports = {
  selectConfidenceMessage,
  appendTsToDocs,
  aggregateDocsByTs,
  addTextWithConfidence
};
