const sendEmail = require('../utils/sendEmail');
const Subscriber = require('../models/subscriberModel');
const createTemplate = require('../utils/createTemplate');
const appError = require('../utils/appError');

async function addUser(req, res, next) {
  try {
    const { fname, lname, email, mjml = 'subscribe', files, mode = false } = req.body;
    console.log(req.body);
    await Subscriber.create({ lname, fname, email });
    let html = await createTemplate(`${mjml}.mjml`, { userName: lname });

    mode &&
      (await sendEmail({
        from: 'GeoJsone <noreply@geojs.one>',
        to: email,
        subject: 'გამარჯობა! შენი გამოწერა შევინახე 🎉',
        html,
        files,
      }));

    //res.status(200).render('subscribe', { status: 'good' });
    res.status(200).redirect('/subscribe');
    // res.status(200).json({
    //   status: mode ? `User added and email sent successfully!` : 'User added',
    //   data: doc,
    // });
  } catch (err) {
    next(new appError(err.message, 533));
  }
}

exports.addUser = addUser;
