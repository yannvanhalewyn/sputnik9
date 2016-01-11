var createdPayment = {
  id: 'tr_vZ64usRgrC',
  mode: 'test',
  amount: '3.00',
  description: 'My first API payment',
  method: null,
  status: 'open',
  createdDatetime: '2015-11-11T15:06:37.0Z',
  paidDatetime: undefined,
  cancelledDatetime: undefined,
  expiredDatetime: undefined,
  metadata: null,
  details: null,
  links:
   { paymentUrl: 'https://www.mollie.com/payscreen/pay/vZ64usRgrC',
     redirectUrl: 'https://localhost:3000/thankyou'
   }
}

var paidPayment = {
  id: 'tr_vZ64usRgrC',
  mode: 'test',
  amount: '3.00',
  description: 'My first API payment',
  method: 'ideal',
  status: 'paid',
  createdDatetime: '2015-11-11T15:06:37.0Z',
  paidDatetime: '2015-11-11T15:09:39.0Z',
  cancelledDatetime: undefined,
  expiredDatetime: undefined,
  metadata: { user_id: "1898abbe890a8e8f90cd1238" },
  details:
   { consumerName: 'T. TEST',
     consumerAccount: 'NL17RABO0213698412',
     consumerBic: 'TESTNL99' },
  links: { redirectUrl: 'https://localhost:3000/thankyou' }
}

var paidPayment_db = {
  _id : "564abbe3d4ade27d43d4ef3b",
  amount : 20,
  description : "Premium content Sputnik9.nl",
  method : "ideal",
  status : "paid",
  metadata : { "user_id" : "564a5f7e89e7872f6daf03f7" },
  mollie_id : "tr_8VvFb4J34h",
  links : { "redirectUrl" : "https://localhost:3000/thankyou" },
  __v : 0,
  details : {
    consumerName : "T. TEST",
    consumerAccount : "NL17RABO0213698412", "consumerBic" : "TESTNL99"
  }
}

var refundedPayment = {
  id: 'tr_vZ64usRgrC',
  mode: 'test',
  amount: '3.00',
  description: 'My first API payment',
  method: 'ideal',
  status: 'refunded',
  createdDatetime: '2015-11-11T15:06:37.0Z',
  paidDatetime: '2015-11-11T15:09:39.0Z',
  cancelledDatetime: undefined,
  expiredDatetime: undefined,
  metadata: { user_id: "1898abbe890a8e8f90cd1238" },
  details:
   { consumerName: 'T. TEST',
     consumerAccount: 'NL17RABO0213698412',
     consumerBic: 'TESTNL99' },
  links: { redirectUrl: 'https://localhost:3000/thankyou' }
}

var cancelledPayment = {
  id: 'tr_vZ64usRgrC',
  mode: 'test',
  amount: '3.00',
  description: 'My first API payment',
  method: 'ideal',
  status: 'cancelled',
  createdDatetime: '2015-11-11T15:06:37.0Z',
  paidDatetime: undefined,
  cancelledDatetime: '2015-11-11T15:09:39.0Z',
  expiredDatetime: undefined,
  metadata: { user_id: "1898abbe890a8e8f90cd1238" },
  details:
   { consumerName: 'T. TEST',
     consumerAccount: 'NL17RABO0213698412',
     consumerBic: 'TESTNL99' },
  links: { redirectUrl: 'https://localhost:3000/thankyou' }
}

var creation_request = {
  amount: 20,
  description: "Premium content Sputnik9.nl",
  redirectUrl: "https://sputnik9.nl/thankyou"
}

module.exports.createdPayment = createdPayment;
module.exports.paidPayment = paidPayment;
module.exports.refundedPayment = refundedPayment;
module.exports.cancelledPayment = cancelledPayment;
module.exports.paidPayment_db = paidPayment_db;
module.exports.creation_request = creation_request;
