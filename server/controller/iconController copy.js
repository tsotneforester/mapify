let Icon = require('../models/iconModel');
const multer = require('multer');
const upload = multer();
const sharp = require('sharp');
const Marker = require('../models/markerModel');

async function addIcon(req, res, next) {
  try {
    const { name } = req.body;
    console.log(req.file);
    const { originalname, mimetype, size, buffer } = req.file;

    const resizedImage = await sharp(buffer).resize({ width: 64, height: 64 }).toBuffer();

    // Process the data
    // Create a new instance of the Icon model
    const newIcon = new Icon({ name, binData: resizedImage, originalname, mimetype, size });

    // Save the new icon document to the MongoDB database
    await newIcon.save();

    // Send a response back to the client
    res.status(201).send('newIcon');
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteIcon(req, res, next) {
  try {
    let { id } = req.params;

    const markersWithIcons = await Icon.aggregate([
      {
        $lookup: {
          from: 'markers', // Collection name of Model2
          localField: 'name', // Field in Model1 to match
          foreignField: 'icon', // Field in Model2 to match
          as: 'matchedDocs',
        },
      },
      {
        $match: {
          $expr: { $gt: [{ $size: '$matchedDocs' }, 0] }, // Matches if there's at least one match
        },
      },
    ]);

    console.log(markersWithIcons);
    // if (markersWithIcons) {
    //   throw new Error("icon can't  be deleted, marker exists");
    // }

    const deletedDocument = await Icon.findByIdAndDelete(id);
    // const { originalname, mimetype, size, buffer } = req.file;

    // const resizedImage = await sharp(buffer).resize({ width: 64, height: 64 }).toBuffer();

    // const newIcon = new Icon({ name, binData: resizedImage, originalname, mimetype, size });

    // await newIcon.save();

    res.status(201).redirect('http://localhost:5173/icons');
  } catch (err) {
    res.status(400).json({ stats: 'error', text: err.message });
  }
}

async function getIcons(req, res, next) {
  try {
    let docs = await Icon.find();

    const imageList = docs.map(img => ({
      id: img._id,
      name: img.name,
      data: img.binData.toString('base64'),
    }));

    res.status(200).json({
      status: 'success',
      data: imageList,
    });
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  addIcon,
  getIcons,
  deleteIcon,
};
