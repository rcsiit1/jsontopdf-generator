const pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');

var data = [
  {
    'invoice': '1234',
    'billed_to': {
      'name': 'Rajan sharma',
      'street': '2 krishna duplex',
      'city': 'vadodara'
    },
    'shipped_to': {
      'name': 'Mayur Chhapra',
      'street': '2 Radha Bungalows',
      'city': 'Ahemdabad'
    },
    'payment': 'Netbanking,SBI',
    'order_date': '21 August,2018',
    'transactions': [
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur pancharisht',
        'price': '10',
        'quantity': '4',
        'totals': '40rs'

      },
      {
        'item': 'Dabur honey',
        'price': '10',
        'quantity': '4',
        'totals': '40rs'

      },
      {
        'item': 'Dabur chavanprash',
        'price': '10',
        'quantity': '4',
        'totals': '40rs'

      },
      {
        'item': 'Dabur su khabar',
        'price': '10',
        'quantity': '4',
        'totals': '40rs'
      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },

      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },{
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },

      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },{
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },
      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      },

      {
        'item': 'Dabur toothpaste',
        'price': '10',
        'quantity': '4',
        'total': '40rs'

      }

    ],
    'subtotal': '200 rs',
    'shipping': '10 rs',
    'total': '210 rs'
  }

];

const HtmltoPDF = async (req, res) => {
  var template = fs.readFileSync('views/pages/businesscard.ejs', 'utf8');
  var html = ejs.render(template, { data: data });
  let htmlOptions = {
    format: 'Letter',
    'border': '0cm'
  };

  let downloadPath = `${__dirname.split('controllers')[0]}/download/report.pdf`;

  pdf.create(html, htmlOptions).toFile(downloadPath, (error, success) => {

    if (error) {
      res.json({ data: error });
    }
    else {
      
      //res.view('pages/businesscard', { data: data });
      res.json({success:success});
    }
  });
};

module.exports = {
  HtmltoPDF
};


