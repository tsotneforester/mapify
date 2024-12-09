let Icon = require('../models/iconModel');
const multer = require('multer');
const upload = multer();
const sharp = require('sharp');
const Marker = require('../models/markerModel');
const { ObjectId } = require('mongoose').Types;

async function addIcon(req, res, next) {
  try {
    const { name } = req?.body;

    const { originalname, mimetype, size, buffer } = req.file;

    const resizedImage = await sharp(buffer).resize({ width: 48, height: 48 }).toBuffer();

    // Process the data
    // Create a new instance of the Icon model
    const newIcon = new Icon({ name: name || 'koko', binData: resizedImage, originalname, mimetype, size });

    // Save the new icon document to the MongoDB database
    await newIcon.save();

    // Send a response back to the client
    res.status(200).send(`'${newIcon.name}' uploaded`);
  } catch (err) {
    res.status(401).send(err.message);
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
        $addFields: {
          productCount: { $size: '$matchedDocs' }, // Calculate the length of the products array
        },
      },
      {
        $project: {
          binData: 0,
          // name: 1,
          // coords: 1,
          // iconName: 1,
          mimetype: 0, // Add buffer from 'iconData'
        },
      },
      {
        $match: {
          _id: ObjectId.createFromHexString(id),
          productCount: { $gt: 0 },
        },
      },
    ]);

    //console.log(markersWithIcons.length);
    if (markersWithIcons.length > 0) {
      throw new Error('Icon used in marker!');
    }

    const deletedDocument = await Icon.findByIdAndDelete(id);
    // const { originalname, mimetype, size, buffer } = req.file;

    // const resizedImage = await sharp(buffer).resize({ width: 64, height: 64 }).toBuffer();

    // const newIcon = new Icon({ name, binData: resizedImage, originalname, mimetype, size });

    // await newIcon.save();

    // res.status(201).redirect('http://localhost:5173/icons?status=success&message=icondeletedsuccessfully');
    res.status(201).send('Icon deleted');
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
}

async function getIcons(req, res, next) {
  try {
    let docs = await Icon.find({ author: process.env.USER });

    const imageList = docs.map(img => ({
      id: img._id,
      name: img.name,
      imgData: img.binData.toString('base64'),
      mimetype: img.mimetype,
    }));

    console.log(imageList);

    res.status(200).json({
      status: 'success',
      data: imageList,
    });
  } catch (err) {}
}

module.exports = {
  addIcon,
  getIcons,
  deleteIcon,
};
