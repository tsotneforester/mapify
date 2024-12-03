let Marker = require('../models/markerModel');

//FIX restrict outside GEOrgia 41.1063, 43.5879 lat 40  46.73644)

async function addMarker(req, res, next) {
  try {
    const { name, coords, icon } = req.body;

    let doc = await Marker.create({ name, coords: coords.split(','), icon });
    console.log(doc);

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
}
async function getMarkers(req, res, next) {
  try {
    //let docs = await Marker.find();

    const markersWithIcons = await Marker.aggregate([
      {
        $lookup: {
          from: 'icons', // Name of the 'icons' collection in MongoDB
          localField: 'icon', // Field in 'markers' to match
          foreignField: 'name', // Field in 'icons' to match
          as: 'iconData', // Output array containing matching 'icons'
        },
      },
      {
        $unwind: '$iconData', // Flatten the iconData array
        // $unwind: {
        //   path: '$icons',
        //   preserveNullAndEmptyArrays: true, // Preserve users without orders
        // },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          coords: 1,
          iconName: 1,
          buffer: '$iconData.binData', // Add buffer from 'iconData'
          mimetype: '$iconData.mimetype', // Add buffer from 'iconData'
        },
      },
      //{ $count: 'totalDocuments' },
    ]);

    res.status(200).json({
      status: 'success',
      data: markersWithIcons,
    });
  } catch (err) {
    console.log(err.message);
  }
}
async function getMyMarkers(req, res, next) {
  try {
    //let docs = await Marker.find();

    const markersWithIcons = await Marker.aggregate([
      {
        $lookup: {
          from: 'icons', // Name of the 'icons' collection in MongoDB
          localField: 'icon', // Field in 'markers' to match
          foreignField: 'name', // Field in 'icons' to match
          as: 'iconData', // Output array containing matching 'icons'
        },
      },
      {
        $unwind: '$iconData', // Flatten the iconData array
        // $unwind: {
        //   path: '$icons',
        //   preserveNullAndEmptyArrays: true, // Preserve users without orders
        // },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          coords: 1,
          iconName: 1,
          author: 1,
          buffer: '$iconData.binData', // Add buffer from 'iconData'
          mimetype: '$iconData.mimetype', // Add buffer from 'iconData'
        },
      },
      { $match: { author: 'tsotne' } },
    ]);

    console.log(markersWithIcons);

    res.status(200).json({
      status: 'success',
      data: markersWithIcons,
    }); 
  } catch (err) {
    console.log(err.message);
  }
}

async function deleteMarker(req, res, next) {
  try {
    let { id } = req.params;

    //console.log(markersWithIcons.length);

    const deletedDocument = await Marker.findByIdAndDelete(id);
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

module.exports = {
  addMarker,
  getMarkers,
  getMyMarkers,
  deleteMarker,
};
