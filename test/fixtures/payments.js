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
     redirectUrl: 'http://localhost:3000/payments/123'
   }
}

var requestedPayment = {
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
  metadata: null,
  details:
   { consumerName: 'T. TEST',
     consumerAccount: 'NL17RABO0213698412',
     consumerBic: 'TESTNL99' },
  links: { redirectUrl: 'http://localhost:3000/payments/123' }
}

var creation_request = {
  amount: 20,
  description: "Premium content Sputnik9.nl",
  redirectUrl: "http://www.sputnik9.nl/checkout"
}

module.exports.createdPayment = createdPayment;
module.exports.requestedPayment = requestedPayment;
module.exports.creation_request = creation_request;
