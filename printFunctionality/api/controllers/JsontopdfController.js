const pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');
const async = require('async');
const nodemailer = require('nodemailer');

var data = [
  {
    'user_email': 'rajansharma9697@gmail.com',
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

      }, {
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

const HtmltoPDF = function (req, res) {

  var createPDF = (callback) => {
    let template = fs.readFileSync('views/pages/businesscard.ejs', 'utf8');
    let html = ejs.render(template, { data: data });
    let htmlOptions = {
      format: 'Letter',
      'border': '0cm'
    };

    let downloadPath = `${__dirname.split('controllers')[0]}/download/report.pdf`;

    pdf.create(html, htmlOptions).toFile(downloadPath, (error, path) => {

      if (error) {
        return callback(error);
      }
      else {
        return callback(null, path);
      }
    });
  };
  var mailUser = (path, callback) => {

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'stenoclever.project@gmail.com',
        pass: 'stenoclever@2018'
      }
    });

    let mailCredentials = {
      from: 'stenoclever.project@gmail.com',
      to: data[0].user_email,
      subject: 'Invoice - Rajan Sharma',
      text: 'Invoice for your purchase.',
      attachments: [{
        filename: 'report.pdf',
        path: path.filename,
        contentType: 'application/pdf'
      }]
    };
    transporter.sendMail(mailCredentials, (error, info) => {

      if (error) {
        return callback(error);
      }
      else {

        return callback(null, info);
      }
    });

  };
  async.waterfall([
    createPDF,
    mailUser,
  ], (err, result) => {

    if (err) {
      res.json({ error: err });
    }
    else {
      res.json({ result: result });
    }

  });
};


module.exports = {
  HtmltoPDF
};


