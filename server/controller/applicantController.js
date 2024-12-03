const sendEmail = require('../utils/sendEmail');
const createTemplate = require('../utils/createTemplate');
const appError = require('../utils/appError');
const dateFormatter = require('../utils/dateFormatter');
const Applicant = require('../models/applicantModel');

async function sendCV(req, res, next) {
  try {
    let { email, company, subject, mode, coverLetter, me, jobTitle, comment, lang } = req.body;

    mode = mode == 'true' ? true : false;

    let files = req.files.map(file => {
      let obj = {};
      obj.filename = file.originalname;
      obj.content = file.buffer;
      return obj;
    });

    await Applicant.create(req.body);

    let count = await Applicant.aggregate([
      {
        $count: 'count',
      },
    ]);

    const html1 = await createTemplate(`apply_${lang}.mjml`, {
      coverLetter: coverLetter
        .split('\r\n')
        .map(paragraph => `<p class="paragraph">${paragraph}&nbsp;</p>`)
        .join(''),
      company,
      date: dateFormatter.long(new Date(), lang),
    });

    const html2 = await createTemplate('wife.mjml', { company, jobTitle, comment, date: dateFormatter.long(new Date(), lang), count: count[0].count });

    const emailOptions = [
      {
        from: `${me} <noreply@geojs.one>`,
        to: email,
        subject,
        html: html1,
        files: files,
        bcc: mode ? 'tsotne.meladze@geojs.one' : '',
      },
      {
        from: 'მუჟიჩოკი 🧔🏻 <noreply@geojs.one>',
        to: 'tsotne.meladze@geojs.one',
        subject: 'CV გაგზავნილია 🔰',
        html: html2,
      },
    ];

    await sendEmail(emailOptions[0]);
    mode && (await sendEmail(emailOptions[1]));

    req.flash('success', 'Your application has been submitted successfully!');

    res.status(200).redirect('/apply');
  } catch (err) {
    next(new appError(err.message, 533));
  }
}

async function getAllCVs(req, res, next) {
  try {
    let docs = await Applicant.find({}, ['company', 'email', 'date']);

    let formattedDocs = docs.map(doc => {
      return { company: doc.company, email: doc.email, date: dateFormatter.short(doc.date) };
    });

    const successMessage = req.flash('success');
    // console.log(successMessage);

    res.status(200).render('apply', { formattedDocs, successMessage });
  } catch (err) {
    next(new appError(err.message, 533));
  }
}

module.exports = {
  sendCV,
  getAllCVs,
};
