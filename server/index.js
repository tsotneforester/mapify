const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock endpoints
app.get('/api/home', (req, res) => {
  res.json({ message: 'Welcome to the Home Page!' });
});

app.get('/api/tbilisi', (req, res) => {
  const markers = [
    {
      name: 'Bus Station',
      coords: [41.693593, 44.785984],
      icon: 'mypost',
    },
    {
      name: 'Funicular',
      coords: [41.694948, 44.786924],
      icon: 'magentatrace',
    },
    {
      name: 'Info Board / Bus Station',
      coords: [41.690116, 44.775033],
      icon: 'bluepolice',
    },
    {
      name: 'Mtatsminda Park Entrance',
      coords: [41.693952, 44.786351],
      icon: 'bluelake',
    },
    {
      name: 'St. George Church',
      coords: [41.703417, 44.769127],
      icon: 'greenviewpoint',
    },
    {
      name: 'Picnic Area',
      coords: [41.830606, 44.828457],
      icon: 'myarrow',
    },
    {
      name: 'Scenic Viewpoint',
      coords: [41.830549, 44.828805],
      icon: 'blackruins',
    },
    {
      name: 'Spring',
      coords: [41.83228, 44.838476],
      icon: 'greentopo',
    },
    {
      name: 'Start Point',
      coords: [41.833616, 44.864095],
      icon: 'cyanmonastery',
    },
    {
      name: 'dafa',
      coords: [41.822776990011334, 44.90559001453221],
      icon: 'greenbridge',
    },
    {
      name: 'dafas',
      coords: [41.86518003232777, 44.928465988487005],
      icon: 'blackmuseum',
    },
    {
      name: 'Picnic Area',
      coords: [41.83060602284968, 44.82845697551966],
      icon: 'magentatrace',
    },
    {
      name: 'Scenic Viewpoint',
      coords: [41.83054902590811, 44.82880499213934],
      icon: 'bluepolice',
    },
    {
      name: 'Spring',
      coords: [41.83227997273207, 44.83847603201866],
      icon: 'magentacanion',
    },
    {
      name: 'wyali',
      coords: [41.833023028448224, 44.87553502433002],
      icon: 'magentarelic',
    },
    {
      name: 'wyaros nishani',
      coords: [41.82525602169335, 44.88394098356366],
      icon: 'blacksettings',
    },
    {
      name: 'Picnic Area',
      coords: [41.8306064, 44.8284571],
      icon: 'magentacanion',
    },
    {
      name: 'Scenic Viewpoint',
      coords: [41.830549, 44.828805],
      icon: 'greenbridge',
    },
    {
      name: 'Spring',
      coords: [41.8322798, 44.8384761],
      icon: 'mypass',
    },
    {
      name: 'Start Point',
      coords: [41.833616, 44.8640948],
      icon: 'myhotel',
    },
    {
      name: 'Mamkoda Monastery',
      coords: [41.83371, 44.872898],
      icon: 'blacksettings',
    },
    {
      name: 'Martkophi Monastery',
      coords: [41.82744, 44.967739],
      icon: 'cyanmonastery',
    },
    {
      name: 'Picnic Area 1',
      coords: [41.82465, 44.8987694],
      icon: 'greenbridge',
    },
    {
      name: 'Picnic Area 2',
      coords: [41.8274292, 44.9689259],
      icon: 'cyanmonastery',
    },
    {
      name: 'Scenic Viewpoint 1',
      coords: [41.833563, 44.873054],
      icon: 'greentree',
    },
    {
      name: 'Scenic Viewpoint 2',
      coords: [41.8245299, 44.8980417],
      icon: 'bluelake',
    },
    {
      name: 'Spring 1',
      coords: [41.8257582, 44.9012082],
      icon: 'mypicnic',
    },
    {
      name: 'Spring 2',
      coords: [41.8648485, 44.9284153],
      icon: 'greenforest',
    },
    {
      name: 'Spring 3',
      coords: [41.8274696, 44.9682021],
      icon: 'greentopo',
    },
    {
      name: 'St. George Church',
      coords: [41.8649922, 44.9282508],
      icon: 'cyancastle',
    },
    {
      name: 'Start Point',
      coords: [41.833616, 44.8640948],
      icon: 'whitesummit',
    },
    {
      name: 'Mamkoda Monastery',
      coords: [41.83371, 44.872898],
      icon: 'cyanchapel',
    },
    {
      name: 'Martkophi Monastery',
      coords: [41.82744, 44.967739],
      icon: 'cyanchurch',
    },
    {
      name: 'Picnic Area 1',
      coords: [41.8274292, 44.9689259],
      icon: 'whitesummit',
    },
    {
      name: 'Picnic Area 2',
      coords: [41.82465, 44.8987694],
      icon: 'mydesk',
    },
    {
      name: 'Scenic Viewpoint 1',
      coords: [41.8245299, 44.8980417],
      icon: 'myarrow',
    },
    {
      name: 'Scenic Viewpoint 2',
      coords: [41.833563, 44.873054],
      icon: 'whiteshelter',
    },
    {
      name: 'Spring 1',
      coords: [41.8648485, 44.9284153],
      icon: 'blacksettings',
    },
    {
      name: 'Spring 2',
      coords: [41.8274696, 44.9682021],
      icon: 'cyanchurch',
    },
    {
      name: 'Spring 3',
      coords: [41.8257582, 44.9012082],
      icon: 'bluewaterfall',
    },
    {
      name: 'St. George Church',
      coords: [41.8649922, 44.9282508],
      icon: 'yellowranger',
    },
    {
      name: 'Start Point',
      coords: [41.833616, 44.8640948],
      icon: 'mypost',
    },
    {
      name: 'amaRlebis eklesia',
      coords: [41.6173802, 44.7856799],
      icon: 'myarrow',
    },
    {
      name: 'andria pirvelwodebulis saxelobis ek',
      coords: [41.7105361, 44.7629144],
      icon: 'mywc',
    },
    {
      name: 'armazis RvTismSoblis eklesia',
      coords: [41.8330473, 44.6804745],
      icon: 'cyanchapel',
    },
    {
      name: 'geTsamaniis monasteri',
      coords: [41.8399603, 44.7116861],
      icon: 'greentopo',
    },
    {
      name: 'davaTis dedaRvTismSoblis kompleqsi',
      coords: [41.9850318, 44.8139036],
      icon: 'yellowcarefull',
    },
    {
      name: 'daviT aRmaSeneblis eklesia',
      coords: [41.8485629, 44.7061071],
      icon: 'yellowbus',
    },
    {
      name: 'didubis RvTismSoblis eklesia',
      coords: [41.7296679, 44.7858931],
      icon: 'myhut',
    },
    {
      name: 'diRmis eklesia',
      coords: [41.8169992, 44.7794767],
      icon: 'greenbasin',
    },
    {
      name: 'eklesia',
      coords: [41.5682261, 44.9771202],
      icon: 'magentatrace',
    },
    {
      name: 'zedaznis monasteri',
      coords: [41.8711843, 44.7656797],
      icon: 'mydesk',
    },
    {
      name: 'Tbilisis wm mowameTa kvirikesa da ivlitas taZari',
      coords: [41.7243328, 44.7723734],
      icon: 'greenbridge',
    },
    {
      name: 'TeleTis wm. giorgis eklesia',
      coords: [41.6468865, 44.8156357],
      icon: 'myhotel',
    },
    {
      name: 'TeZamis adgilis deda',
      coords: [41.8846042, 44.954653],
      icon: 'whiteshelter',
    },
    {
      name: 'TeZamis wm. giorgis sax. eklesia',
      coords: [41.8859518, 44.9489848],
      icon: 'yellowbus',
    },
    {
      name: 'ioane naTlismcemlis eklesia',
      coords: [41.8209, 44.7814624],
      icon: 'mywc',
    },
    {
      name: 'kaloubani',
      coords: [41.8446589, 44.6939505],
      icon: 'mypass',
    },
    {
      name: 'kaloubnis wm. giorgis eklesia',
      coords: [41.8435096, 44.6761177],
      icon: 'myhotel',
    },
    {
      name: 'lisis wm.evstati plakidas saxelobis',
      coords: [41.7582529, 44.6813638],
      icon: 'cyanchurch',
    },
    {
      name: 'luTeranuli eklesia',
      coords: [41.5912322, 44.6685597],
      icon: 'greenviewpoint',
    },
    {
      name: 'mama daviTis eklesia',
      coords: [41.6284577, 44.8181149],
      icon: 'yellowbus',
    },
    {
      name: 'mamkodis RvTismSoblis eklesia da mam',
      coords: [41.8335835, 44.8728235],
      icon: 'bluespring',
    },
    {
      name: 'martyofis RvTaebis monasteri',
      coords: [41.8274885, 44.9681362],
      icon: 'yellowranger',
    },
    {
      name: 'monasteri da samTavros',
      coords: [41.8460872, 44.7178425],
      icon: 'mycamp',
    },
    {
      name: 'norios RvTismSoblis saxelobis ekles',
      coords: [41.7817252, 44.9867398],
      icon: 'greenbasin',
    },
    {
      name: 'saguramos wm.ilia marTlis taZari',
      coords: [41.8908096, 44.7623848],
      icon: 'yellowbus',
    },
    {
      name: 'sioni',
      coords: [41.6913838, 44.8077288],
      icon: 'cyanchurch',
    },
    {
      name: 'sxaltbis kviracxovlis saxelobis ekl',
      coords: [41.8711829, 44.6570536],
      icon: 'redberry',
    },
    {
      name: 'RvTaebis monasteri',
      coords: [41.8275365, 44.9677608],
      icon: 'mydesk',
    },
    {
      name: 'RvTismSoblis eklesia',
      coords: [41.8507247, 44.6997658],
      icon: 'mybridge',
    },
    {
      name: 'RvTismSoblis eklesia',
      coords: [41.651867, 44.762911],
      icon: 'bluewaterfall',
    },
    {
      name: 'RvTismSoblis miZinebis eklesia',
      coords: [41.6605698, 44.7139558],
      icon: 'whitesummit',
    },
    {
      name: 'RvTismSoblis miZinebis eklesia',
      coords: [41.6493216, 44.758638],
      icon: 'bluebee',
    },
    {
      name: 'RvTismSoblis miZinebis saxelobis ek',
      coords: [41.7566533, 44.6715671],
      icon: 'blackruins',
    },
    {
      name: 'RvTismSoblis Sobis eklesia',
      coords: [41.7997801, 45.0646995],
      icon: 'myhut',
    },
    {
      name: 'RvTismSoblis Sobis sax.eklesia',
      coords: [41.671858, 44.8693563],
      icon: 'bluelake',
    },
    {
      name: 'RvTismSoblis Sobis saxelobis eklesi',
      coords: [41.7720118, 44.8243242],
      icon: 'greenpine',
    },
    {
      name: 'SiomRvime',
      coords: [41.8624558, 44.6405577],
      icon: 'myhut',
    },
    {
      name: 'SiomRvimis jvris amaRlebis eklesia',
      coords: [41.8588087, 44.6414475],
      icon: 'blackmuseum',
    },
    {
      name: 'cilkanis eklesia',
      coords: [41.949519, 44.6578627],
      icon: 'bluepolice',
    },
    {
      name: 'wm. 13 asureli mamis saxelobis eklesia',
      coords: [41.9050449, 44.6095955],
      icon: 'mypicnic',
    },
    {
      name: 'wm. anton martyofelis saxelobis ekle',
      coords: [41.7209322, 44.7600517],
      icon: 'magentazip',
    },
    {
      name: 'wm. giorgi',
      coords: [41.7535655, 44.7765379],
      icon: 'bluewater',
    },
    {
      name: 'wm. giorgis eklesia',
      coords: [41.8522114, 44.6966005],
      icon: 'greentopo',
    },
    {
      name: 'wm. giorgis eklesia',
      coords: [41.5652632, 45.0602816],
      icon: 'magentarelic',
    },
    {
      name: 'wm. giorgis saxelobis eklesia',
      coords: [41.8728899, 44.6676861],
      icon: 'bluespring',
    },
    {
      name: 'wm. daviT aRmaSeneblis saxelobis taZ',
      coords: [41.7862861, 44.8317757],
      icon: 'mydesk',
    },
    {
      name: 'wm. demetres eklesia',
      coords: [41.8455225, 44.698875],
      icon: 'magentarelic',
    },
    {
      name: 'wm. nikolozis taZari',
      coords: [41.6845593, 44.820073],
      icon: 'blackruins',
    },
    {
      name: 'wm. ninos eklesia',
      coords: [41.5830614, 44.7779877],
      icon: 'mycanon',
    },
    {
      name: 'wm. ninos eklesia',
      coords: [41.7623842, 45.0772267],
      icon: 'blackmuseum',
    },
    {
      name: 'wm. ninos saxelobis eklesia',
      coords: [41.7010472, 44.8092058],
      icon: 'bluepolice',
    },
    {
      name: 'wminda barbares eklesia',
      coords: [41.8441396, 44.7141961],
      icon: 'bluespring',
    },
    {
      name: 'wminda barbares eklesia',
      coords: [41.7236254, 44.7323412],
      icon: 'blackruins',
    },
    {
      name: 'wminda giorgis saxelobis Savnabadas',
      coords: [41.6517466, 44.8398891],
      icon: 'magentacanion',
    },
    {
      name: 'wminda giorgis saxelobis Savnabadis',
      coords: [41.6519283, 44.8399923],
      icon: 'yellowcarefull',
    },
    {
      name: 'wminda ioane zedaznelis saxelobis ma',
      coords: [41.8707528, 44.7662451],
      icon: 'blacksettings',
    },
    {
      name: 'wminda nikolozis eklesia',
      coords: [41.6824871, 44.9536598],
      icon: 'cyanshrine',
    },
    {
      name: 'wminda nikolozis saxelobis eklesia',
      coords: [41.7015095, 44.8070644],
      icon: 'whiteshelter',
    },
    {
      name: 'wminda ninos eklesia',
      coords: [41.6709871, 44.7367252],
      icon: 'whiteshelter',
    },
    {
      name: 'wminda ninos eklesia',
      coords: [41.7160094, 44.7425854],
      icon: 'magentacanion',
    },
    {
      name: 'wminda ninos eklesia',
      coords: [41.5688012, 45.0715311],
      icon: 'mypicnic',
    },
    {
      name: 'wminda ninos eklesia',
      coords: [41.567488, 44.9664148],
      icon: 'magentarelic',
    },
    {
      name: 'wminda ninos salocavi',
      coords: [41.8369805, 44.731504],
      icon: 'bluewater',
    },
    {
      name: 'wminda ninos saxelobis eklesia',
      coords: [41.8833032, 44.9573766],
      icon: 'greentopo',
    },
    {
      name: 'wminda samebis taZari',
      coords: [41.7147905, 44.7311491],
      icon: 'myarrow',
    },
    {
      name: 'wminda samebis taZari',
      coords: [41.7113435, 44.7583147],
      icon: 'greentopo',
    },
    {
      name: 'wminda qeTevan wamebulis saxelobis e',
      coords: [41.8225231, 44.7844664],
      icon: 'yellowquestion',
    },
    {
      name: 'wminda qeTevanis taZari',
      coords: [41.6673671, 44.8883357],
      icon: 'yellowcarefull',
    },
    {
      name: 'jvarTamaRlebis saxelobis eklesia',
      coords: [41.7189004, 44.7663626],
      icon: 'mycanon',
    },
    {
      name: 'jvari',
      coords: [41.7710707, 44.8046863],
      icon: 'mybridge',
    },
    {
      name: null,
      coords: [41.8405009, 44.637673],
      icon: 'myhotel',
    },
    {
      name: null,
      coords: [41.7667415, 44.6541649],
      icon: 'magentacanion',
    },
    {
      name: null,
      coords: [41.6944581, 44.6939096],
      icon: 'yellowbus',
    },
    {
      name: null,
      coords: [41.7060209, 44.7005968],
      icon: 'mycamp',
    },
    {
      name: null,
      coords: [41.8465383, 44.7187308],
      icon: 'mypost',
    },
    {
      name: null,
      coords: [41.7278469, 44.7251732],
      icon: 'mycanon',
    },
    {
      name: null,
      coords: [41.8070662, 44.7292437],
      icon: 'mywc',
    },
    {
      name: null,
      coords: [41.9194494, 44.7300775],
      icon: 'bluelake',
    },
    {
      name: null,
      coords: [41.8067415, 44.730577],
      icon: 'whitesummit',
    },
    {
      name: null,
      coords: [41.7298713, 44.7307447],
      icon: 'greenpine',
    },
    {
      name: null,
      coords: [41.9479176, 44.7350703],
      icon: 'greeninfo',
    },
    {
      name: null,
      coords: [41.9668068, 44.7378635],
      icon: 'yellowbus',
    },
    {
      name: null,
      coords: [41.7253468, 44.7384505],
      icon: 'cyanchapel',
    },
    {
      name: null,
      coords: [41.8433457, 44.7520311],
      icon: 'yellowranger',
    },
    {
      name: null,
      coords: [41.7374069, 44.7578818],
      icon: 'mypass',
    },
    {
      name: null,
      coords: [41.6603648, 44.7609754],
      icon: 'magentarelic',
    },
    {
      name: null,
      coords: [41.7617871, 44.7657918],
      icon: 'greeninfo',
    },
    {
      name: null,
      coords: [41.8055164, 44.7704176],
      icon: 'mycamp',
    },
    {
      name: null,
      coords: [41.7428547, 44.7731213],
      icon: 'bluewater',
    },
    {
      name: null,
      coords: [41.5831975, 44.7782564],
      icon: 'cyancastle',
    },
    {
      name: null,
      coords: [41.6890492, 44.7828327],
      icon: 'greenpine',
    },
    {
      name: null,
      coords: [41.6183479, 44.7854866],
      icon: 'blackmuseum',
    },
    {
      name: null,
      coords: [41.6958146, 44.7888432],
      icon: 'mycanon',
    },
    {
      name: null,
      coords: [41.7807177, 44.802721],
      icon: 'greentree',
    },
    {
      name: null,
      coords: [41.7083481, 44.8132428],
      icon: 'cyanchurch',
    },
    {
      name: null,
      coords: [41.7819421, 44.8270893],
      icon: 'cyanshrine',
    },
    {
      name: null,
      coords: [41.6927422, 44.8273491],
      icon: 'cyanmonastery',
    },
    {
      name: null,
      coords: [41.7171561, 44.8278822],
      icon: 'myhotel',
    },
    {
      name: null,
      coords: [41.8080106, 44.8339231],
      icon: 'myarrow',
    },
    {
      name: null,
      coords: [41.810451, 44.8340989],
      icon: 'myhotel',
    },
    {
      name: null,
      coords: [41.7125214, 44.8367323],
      icon: 'greenbasin',
    },
    {
      name: null,
      coords: [41.6773896, 44.8392342],
      icon: 'greenbasin',
    },
    {
      name: null,
      coords: [41.6911999, 44.8624914],
      icon: 'yellowcarefull',
    },
    {
      name: null,
      coords: [41.6594035, 44.9427629],
      icon: 'blacksettings',
    },
    {
      name: null,
      coords: [41.6269703, 44.9578529],
      icon: 'cyanmonastery',
    },
    {
      name: null,
      coords: [41.8276055, 44.9673208],
      icon: 'cyanchapel',
    },
    {
      name: null,
      coords: [41.7950029, 44.9732901],
      icon: 'yellowbus',
    },
    {
      name: null,
      coords: [41.5791088, 44.9841649],
      icon: 'magentacanion',
    },
    {
      name: null,
      coords: [41.5958379, 44.9842721],
      icon: 'mydesk',
    },
    {
      name: null,
      coords: [41.7851514, 44.9916303],
      icon: 'greentopo',
    },
    {
      name: null,
      coords: [41.795788, 45.0143781],
      icon: 'greenforest',
    },
    {
      name: null,
      coords: [41.7008483, 45.0146724],
      icon: 'greentopo',
    },
    {
      name: null,
      coords: [41.7862289, 45.0218358],
      icon: 'cyanchurch',
    },
    {
      name: null,
      coords: [41.7814999, 45.0228437],
      icon: 'yellowranger',
    },
    {
      name: '016',
      coords: [41.81760803796351, 45.02715602517128],
      icon: 'mycamp',
    },
    {
      name: '017',
      coords: [41.81827096268535, 45.03117498010397],
      icon: 'yellowranger',
    },
    {
      name: '018',
      coords: [41.823530020192266, 45.0524640083313],
      icon: 'mydesk',
    },
    {
      name: '019',
      coords: [41.82517304085195, 45.051357010379434],
      icon: 'bluelake',
    },
    {
      name: '020',
      coords: [41.82564502581954, 45.051702009513974],
      icon: 'blackmuseum',
    },
    {
      name: '021',
      coords: [41.837546993047, 45.052799033001065],
      icon: 'greenpine',
    },
    {
      name: '022',
      coords: [41.84046699665487, 45.053591039031744],
      icon: 'mycanon',
    },
    {
      name: '023',
      coords: [41.8428519833833, 45.054667023941875],
      icon: 'myhotel',
    },
    {
      name: '024',
      coords: [41.836831010878086, 45.08117697201669],
      icon: 'greenpine',
    },
    {
      name: '025',
      coords: [41.825032979249954, 45.055570006370544],
      icon: 'mybridge',
    },
    {
      name: '026',
      coords: [41.818739008158445, 45.02955601550639],
      icon: 'cyancastle',
    },
    {
      name: '027',
      coords: [41.819299003109336, 45.028134025633335],
      icon: 'blackmuseum',
    },
    {
      name: '028',
      coords: [41.79942701943219, 45.03170597366989],
      icon: 'greenbridge',
    },
    {
      name: 'Photo',
      coords: [41.825848, 44.877638],
      icon: 'mycamp',
    },
    {
      name: 'Photo',
      coords: [41.82626, 44.878579],
      icon: 'magentarelic',
    },
    {
      name: 'Photo',
      coords: [41.819206, 44.893756],
      icon: 'cyanshrine',
    },
    {
      name: 'Photo',
      coords: [41.819505, 44.894865],
      icon: 'redberry',
    },
    {
      name: 'Photo',
      coords: [41.822578, 44.90038],
      icon: 'redberry',
    },
    {
      name: 'Photo',
      coords: [41.822777, 44.90559],
      icon: 'blackmuseum',
    },
    {
      name: 'Photo',
      coords: [41.821645, 44.913393],
      icon: 'myarrow',
    },
    {
      name: 'Photo',
      coords: [41.821824, 44.922653],
      icon: 'greenbridge',
    },
    {
      name: 'Photo',
      coords: [41.83101, 44.932895],
      icon: 'greentree',
    },
    {
      name: 'Photo',
      coords: [41.83763, 44.929061],
      icon: 'bluewater',
    },
    {
      name: 'Photo',
      coords: [41.841526, 44.930043],
      icon: 'whiteshelter',
    },
    {
      name: 'Photo',
      coords: [41.846345, 44.929672],
      icon: 'whiteshelter',
    },
    {
      name: 'Photo',
      coords: [41.846766, 44.929955],
      icon: 'myhut',
    },
    {
      name: 'Photo',
      coords: [41.86518, 44.928466],
      icon: 'cyanchurch',
    },
    {
      name: 'sawyisi',
      coords: [41.83355, 44.864264],
      icon: 'bluespring',
    },
    {
      name: 'dasruleba',
      coords: [41.833439, 44.864106],
      icon: 'bluewater',
    },
    {
      name: 'mamkodis mamata monasteri',
      coords: [41.833463, 44.873743],
      icon: 'mypost',
    },
    {
      name: 'wyali',
      coords: [41.833023, 44.875535],
      icon: 'mypost',
    },
    {
      name: 'wyaros nishani',
      coords: [41.825256, 44.883941],
      icon: 'mypass',
    },
    {
      name: 'Bridge N 1',
      coords: [41.805223021656275, 45.0028960313648],
      icon: 'yellowquestion',
    },
    {
      name: 'Bus Stop',
      coords: [41.78853423334658, 44.9796143732965],
      icon: 'magentatrace',
    },
    {
      name: 'Chapel',
      coords: [41.827735556289554, 44.969229782000184],
      icon: 'whiteshelter',
    },
    {
      name: 'Choose Left Side',
      coords: [41.820134008303285, 44.9908509850502],
      icon: 'magentarelic',
    },
    {
      name: 'Choose Right Side',
      coords: [41.784323416650295, 45.01254796050489],
      icon: 'magentatrace',
    },
    {
      name: 'Ghvtaeba Church',
      coords: [41.8275260925293, 44.96777057647705],
      icon: 'bluebee',
    },
    {
      name: 'Kartli 1',
      coords: [41.808916088193655, 45.0005042552948],
      icon: 'whiteshelter',
    },
    {
      name: 'Market',
      coords: [41.82769984938204, 44.969109669327736],
      icon: 'mybridge',
    },
    {
      name: 'Martkopi Cemetery',
      coords: [41.78950544446707, 45.01167615875602],
      icon: 'greeninfo',
    },
    {
      name: 'Martkopi Chapel',
      coords: [41.78647505119443, 45.02216703258455],
      icon: 'greenbasin',
    },
    {
      name: 'Martkopi Overwatch',
      coords: [41.79265704005957, 45.01110199838877],
      icon: 'mypicnic',
    },
    {
      name: 'Monastery Monk House',
      coords: [41.82264296337962, 44.973710998892784],
      icon: 'greenforest',
    },
    {
      name: 'Picnic Area',
      coords: [41.82527203112841, 44.968147007748485],
      icon: 'bluepolice',
    },
    {
      name: 'Picnic Area 2',
      coords: [41.82029795832932, 44.96565196663141],
      icon: 'yellowcarefull',
    },
    {
      name: 'Picnic Area For Rent',
      coords: [41.81614397093654, 44.96419100090861],
      icon: 'whitesummit',
    },
    {
      name: 'Road Bridge',
      coords: [41.81701183319092, 44.96186971664429],
      icon: 'bluebee',
    },
    {
      name: 'Road to Monastery',
      coords: [41.81307300925255, 44.99682099558413],
      icon: 'myhut',
    },
    {
      name: 'Ruins',
      coords: [41.812036000192165, 44.996641958132386],
      icon: 'myarrow',
    },
    {
      name: 'Water 1',
      coords: [41.78635016083717, 45.02094411291182],
      icon: 'mycanon',
    },
    {
      name: 'Water 2',
      coords: [41.82762449607253, 44.9691875372082],
      icon: 'bluepolice',
    },
    {
      name: 'Cycleway=opposite',
      coords: [41.664173947647214, 44.91493055596948],
      icon: 'magentarelic',
    },
    {
      name: 'ft',
      coords: [41.70912265777588, 44.779651165008545],
      icon: 'blackruins',
    },
    {
      name: 'Rails',
      coords: [41.67566335760057, 44.87723152153194],
      icon: 'blacksettings',
    },
    {
      name: 'Restaurant',
      coords: [41.70487403869629, 44.78932857513428],
      icon: 'magentacanion',
    },
    {
      name: 'Tbilisi-Baku - Georgian Railway Ltd.',
      coords: [41.66448751464486, 44.91886996664107],
      icon: 'yellowquestion',
    },
    {
      name: 'tertiary',
      coords: [41.67281694710255, 44.88371073268354],
      icon: 'greentopo',
    },
    {
      name: 'ვაკე',
      coords: [41.709269592538476, 44.776802994310856],
      icon: 'yellowranger',
    },
    {
      name: 'მოსკოვის გამზირი',
      coords: [41.68009176850319, 44.87066983245313],
      icon: 'bluespring',
    },
    {
      name: 'პეტრე მელიქიშვილის გამზირი and ft',
      coords: [41.708242893218994, 44.78231191635132],
      icon: 'cyanmonastery',
    },
    {
      name: 'სამგორი',
      coords: [41.6847038269043, 44.85468864440918],
      icon: 'mycamp',
    },
    {
      name: 'ქინძმარაულის ქუჩა',
      coords: [41.672626258805394, 44.893959034234285],
      icon: 'yellowcarefull',
    },
  ];

  res.json(markers);
});

app.get('/api/bknp', (req, res) => {
  const markers = [
    {
      name: 'Amarati Shelter2',
      coords: [41.81045316159725, 43.11876053921878],
      icon: 'yellowquestion',
    },
    {
      name: 'Amarati Shelter3',
      coords: [41.81045299395919, 43.11876003630459],
      icon: 'blacksettings',
    },
    {
      name: 'Ranger Station',
      coords: [41.74741303548217, 43.177335960790515],
      icon: 'greenbridge',
    },
    {
      name: 'Ranger Station 1',
      coords: [41.74741303548217, 43.177335960790515],
      icon: 'myhut',
    },
    {
      name: 'Ranger Station 11',
      coords: [41.7876888345927, 43.237051824107766],
      icon: 'bluespring',
    },
    {
      name: 'Tiselis wm.giorgis saxelobis gumbaTo',
      coords: [41.7107126, 43.233645],
      icon: 'myhut',
    },
    {
      name: 'kvirike wminda',
      coords: [41.7630544, 43.2492658],
      icon: 'redberry',
    },
    {
      name: 'mariamwminda',
      coords: [41.786894, 43.2391758],
      icon: 'yellowranger',
    },
    {
      name: 'wminda giorgi',
      coords: [41.6860383, 43.1278149],
      icon: 'cyanchurch',
    },
    {
      name: 'wminda giorgis saxelobis',
      coords: [41.7725846, 43.265869],
      icon: 'cyanmonastery',
    },
    {
      name: 'wminda giorgis saxelobis eklesia',
      coords: [41.7789969, 43.2432247],
      icon: 'whitesummit',
    },
    {
      name: 'wminda mariamis saxelobis',
      coords: [41.7753265, 43.2583724],
      icon: 'whitesummit',
    },
    {
      name: null,
      coords: [41.7123263, 43.075236],
      icon: 'magentazip',
    },
    {
      name: null,
      coords: [41.6943612, 43.1110183],
      icon: 'mypicnic',
    },
    {
      name: null,
      coords: [41.6951738, 43.1119679],
      icon: 'magentarelic',
    },
    {
      name: null,
      coords: [41.7243535, 43.1162593],
      icon: 'mycanon',
    },
    {
      name: null,
      coords: [41.6855413, 43.1275671],
      icon: 'myhut',
    },
    {
      name: null,
      coords: [41.705359, 43.1650714],
      icon: 'mydesk',
    },
    {
      name: 'Photo',
      coords: [41.730786, 43.1367115],
      icon: 'greenbasin',
    },
    {
      name: 'Photo',
      coords: [41.7352118, 43.1324564],
      icon: 'bluepolice',
    },
    {
      name: 'გზა იყოფა',
      coords: [41.7418669, 43.1280563],
      icon: 'mywc',
    },
    {
      name: 'Photo',
      coords: [41.7424857, 43.1270978],
      icon: 'greenforest',
    },
    {
      name: 'გზა',
      coords: [41.7586328, 43.1213495],
      icon: 'bluespring',
    },
    {
      name: 'გზა იყოფა',
      coords: [41.7644812, 43.1183908],
      icon: 'mydesk',
    },
    {
      name: 'Photo',
      coords: [41.7763231, 43.1132914],
      icon: 'mycanon',
    },
    {
      name: 'გი',
      coords: [41.7788826, 43.1139408],
      icon: 'yellowranger',
    },
    {
      name: 'emanuel',
      coords: [41.7816784, 43.1165722],
      icon: 'yellowquestion',
    },
    {
      name: 'gilza',
      coords: [41.7850108, 43.1199833],
      icon: 'blackruins',
    },
    {
      name: 'Amarati Shelter',
      coords: [41.81038074, 43.11888719],
      icon: 'bluepolice',
    },
    {
      name: 'Atskuri Ranger Shelter',
      coords: [41.74762602, 43.17685903],
      icon: 'myhut',
    },
    {
      name: 'Bear',
      coords: [41.79235697, 43.13425222],
      icon: 'bluebee',
    },
    {
      name: 'Rest/Camping',
      coords: [41.77430562, 43.17908686],
      icon: 'cyanchapel',
    },
    {
      name: 'Cliffs',
      coords: [41.76911387, 43.17916037],
      icon: 'greentree',
    },
    {
      name: 'Cliffs',
      coords: [41.76276298, 43.16719897],
      icon: 'cyanchapel',
    },
    {
      name: 'Cranberries',
      coords: [41.83296251, 43.12954637],
      icon: 'cyancastle',
    },
    {
      name: 'Crossroad',
      coords: [41.76304067, 43.16106945],
      icon: 'bluebee',
    },
    {
      name: 'Crossroad',
      coords: [41.76742399, 43.15627601],
      icon: 'mybridge',
    },
    {
      name: 'Currant, Raspberries',
      coords: [41.81782303, 43.14034],
      icon: 'mypicnic',
    },
    {
      name: 'Foresters Hut',
      coords: [41.81025267, 43.12105894],
      icon: 'greenbasin',
    },
    {
      name: 'Ground Water',
      coords: [41.78162796, 43.15489601],
      icon: 'bluepolice',
    },
    {
      name: 'Ground Water',
      coords: [41.82708797, 43.13027602],
      icon: 'magentatrace',
    },
    {
      name: 'Ground Water',
      coords: [41.79144904, 43.12988601],
      icon: 'whitesummit',
    },
    {
      name: 'Ground Water',
      coords: [41.81154298, 43.11988899],
      icon: 'mypost',
    },
    {
      name: 'Ground Water',
      coords: [41.81144399, 43.12209503],
      icon: 'greenbridge',
    },
    {
      name: 'Ground Water',
      coords: [41.75769503, 43.15590302],
      icon: 'cyanmonastery',
    },
    {
      name: 'Ground Water',
      coords: [41.76138332, 43.17090838],
      icon: 'yellowranger',
    },
    {
      name: 'Ground Water',
      coords: [41.75300997, 43.17510202],
      icon: 'greenpine',
    },
    {
      name: 'Die Hard',
      coords: [41.75955749, 43.18689686],
      icon: 'greenpine',
    },
    {
      name: 'Die Hard',
      coords: [41.76113991, 43.18396588],
      icon: 'cyancastle',
    },
    {
      name: 'Die Hard',
      coords: [41.7622863, 43.1833431],
      icon: 'blackmuseum',
    },
    {
      name: 'Iron Green Door',
      coords: [41.77253804, 43.14033397],
      icon: 'myhotel',
    },
    {
      name: 'Join to Official Trek',
      coords: [41.76119448, 43.15711428],
      icon: 'whiteshelter',
    },
    {
      name: "Kukura's Hut",
      coords: [41.77856036, 43.13426279],
      icon: 'mycanon',
    },
    {
      name: 'land1',
      coords: [41.79016099, 43.16992309],
      icon: 'greenforest',
    },
    {
      name: 'West',
      coords: [41.73685201, 43.16132904],
      icon: 'mycamp',
    },
    {
      name: 'Mountain Pass',
      coords: [41.79352297, 43.16346198],
      icon: 'bluelake',
    },
    {
      name: 'Nigoztavi',
      coords: [41.75280302, 43.15399596],
      icon: 'redberry',
    },
    {
      name: 'Panoramic',
      coords: [41.76920003, 43.14496798],
      icon: 'blackruins',
    },
    {
      name: 'Panoramic',
      coords: [41.78711442, 43.17498375],
      icon: 'greenbridge',
    },
    {
      name: 'Qata',
      coords: [41.7791745, 43.13529678],
      icon: 'yellowcarefull',
    },
    {
      name: 'Rest',
      coords: [41.75315103, 43.1931703],
      icon: 'greenbridge',
    },
    {
      name: 'West (Can Try East)',
      coords: [41.79947119, 43.15948117],
      icon: 'blackruins',
    },
    {
      name: 'East',
      coords: [41.735068, 43.16322603],
      icon: 'mypass',
    },
    {
      name: 'Crossroad',
      coords: [41.76190183, 43.17131549],
      icon: 'whitesummit',
    },
    {
      name: 'Crossroad',
      coords: [41.78038602, 43.15321703],
      icon: 'cyanshrine',
    },
    {
      name: 'Sairme Hut 1',
      coords: [41.79145231, 43.13149349],
      icon: 'greenbasin',
    },
    {
      name: 'Sairme Hut 2',
      coords: [41.79140277, 43.13166129],
      icon: 'mybridge',
    },
    {
      name: 'Sairme Hut 3',
      coords: [41.79151425, 43.13179934],
      icon: 'greenbasin',
    },
    {
      name: 'Stonehenge',
      coords: [41.77595803, 43.15632999],
      icon: 'bluepolice',
    },
    {
      name: 'Tree Cemetery',
      coords: [41.80427402, 43.15473902],
      icon: 'greentree',
    },
    {
      name: 'Ground Water',
      coords: [41.7897512, 43.17092699],
      icon: 'mypost',
    },
    {
      name: 'Ground Water',
      coords: [41.79026543, 43.17013716],
      icon: 'yellowcarefull',
    },
    {
      name: 'Water In Hose',
      coords: [41.745235, 43.15470801],
      icon: 'greeninfo',
    },
    {
      name: 'Water In the Vicinity (Find and Mark)1',
      coords: [41.80965965, 43.15784879],
      icon: 'greentree',
    },
    {
      name: 'Wood Bridge',
      coords: [41.76707103, 43.15603696],
      icon: 'mypicnic',
    },
    {
      name: 'Wood Bridge',
      coords: [41.76365398, 43.16582501],
      icon: 'greentopo',
    },
    {
      name: 'Wood Bridge',
      coords: [41.75406198, 43.17474402],
      icon: 'bluewater',
    },
    {
      name: 'Down to Ravine',
      coords: [41.76910423, 43.17906523],
      icon: 'greenforest',
    },
    {
      name: 'Cross+Marking',
      coords: [41.80536459, 43.12626226],
      icon: 'greentree',
    },
    {
      name: 'Tiagachi',
      coords: [41.77362174, 43.17934988],
      icon: 'myarrow',
    },
    {
      name: 'Pass',
      coords: [41.74837729, 43.18787226],
      icon: 'mybridge',
    },
    {
      name: 'წყალი',
      coords: [41.73811474, 43.16772762],
      icon: 'redberry',
    },
    {
      name: 'Bear',
      coords: [41.7843338, 43.16952051],
      icon: 'whitesummit',
    },
    {
      name: 'Deer',
      coords: [41.7827599, 43.16913427],
      icon: 'mydesk',
    },
    {
      name: 'Ranger Station10',
      coords: [41.747413, 43.177336],
      icon: 'yellowranger',
    },
    {
      name: 'Tourist Shelter2',
      coords: [41.810453, 43.118761],
      icon: 'cyanmonastery',
    },
    {
      name: 'Amarati Shelter',
      coords: [41.81038074195385, 43.118887189775705],
      icon: 'magentarelic',
    },
    {
      name: 'Atskuri Ranger Shelter',
      coords: [41.74762601964176, 43.176859030500054],
      icon: 'greenbridge',
    },
    {
      name: 'Bear',
      coords: [41.792356967926025, 43.13425222411752],
      icon: 'bluepolice',
    },
    {
      name: 'Bear1',
      coords: [41.78433381021023, 43.16952050663531],
      icon: 'mycamp',
    },
    {
      name: 'biiliki ferdzea',
      coords: [41.781678423285484, 43.11657219193876],
      icon: 'greentopo',
    },
    {
      name: 'camping',
      coords: [41.77888263948262, 43.113940777257085],
      icon: 'magentacanion',
    },
    {
      name: 'Cliffs',
      coords: [41.769113866612315, 43.17916036583483],
      icon: 'blackmuseum',
    },
    {
      name: 'Cliffs1',
      coords: [41.76276298239827, 43.16719897091389],
      icon: 'blackruins',
    },
    {
      name: 'Cranberries',
      coords: [41.832962511107326, 43.12954637221992],
      icon: 'magentarelic',
    },
    {
      name: 'Cross+Marking',
      coords: [41.80536459200084, 43.12626225873828],
      icon: 'yellowquestion',
    },
    {
      name: 'Crossroad',
      coords: [41.763040674850345, 43.161069452762604],
      icon: 'greenbridge',
    },
    {
      name: 'Crossroad1',
      coords: [41.7674239911139, 43.156276009976864],
      icon: 'bluewaterfall',
    },
    {
      name: 'Crossroad2',
      coords: [41.76190182566643, 43.17131549119949],
      icon: 'greeninfo',
    },
    {
      name: 'Crossroad3',
      coords: [41.780386017635465, 43.15321703441441],
      icon: 'yellowbus',
    },
    {
      name: 'Currant, Raspberries',
      coords: [41.81782303377986, 43.14034000039101],
      icon: 'mypicnic',
    },
    {
      name: 'Deer',
      coords: [41.78275994025171, 43.169134268537164],
      icon: 'magentazip',
    },
    {
      name: 'Die Hard',
      coords: [41.75955749116838, 43.18689686246216],
      icon: 'bluebee',
    },
    {
      name: 'Die Hard1',
      coords: [41.761139910668135, 43.18396587856114],
      icon: 'myhut',
    },
    {
      name: 'Die Hard2',
      coords: [41.762286303564906, 43.183343103155494],
      icon: 'myarrow',
    },
    {
      name: 'Down to Ravine',
      coords: [41.76910422742367, 43.179065231233835],
      icon: 'blackruins',
    },
    {
      name: 'East',
      coords: [41.73506800085306, 43.16322603262961],
      icon: 'whitesummit',
    },
    {
      name: 'Foresters Hut',
      coords: [41.81025266647339, 43.12105894088745],
      icon: 'mypass',
    },
    {
      name: 'gilza',
      coords: [41.78501081652939, 43.11998329125345],
      icon: 'greenbridge',
    },
    {
      name: 'Ground Water',
      coords: [41.78162796422839, 43.1548960134387],
      icon: 'greenviewpoint',
    },
    {
      name: 'Ground Water1',
      coords: [41.82708797045052, 43.130276016891],
      icon: 'myhut',
    },
    {
      name: 'Ground Water2',
      coords: [41.791449040174484, 43.12988600693643],
      icon: 'bluewaterfall',
    },
    {
      name: 'Ground Water3',
      coords: [41.811542976647615, 43.11988899484277],
      icon: 'blackruins',
    },
    {
      name: 'Ground Water4',
      coords: [41.81144398637116, 43.122095027938485],
      icon: 'mybridge',
    },
    {
      name: 'Ground Water5',
      coords: [41.757695032283664, 43.15590301528573],
      icon: 'greenpine',
    },
    {
      name: 'Ground Water6',
      coords: [41.761383321136236, 43.17090838216245],
      icon: 'bluewaterfall',
    },
    {
      name: 'Ground Water7',
      coords: [41.75300996750593, 43.175102015957236],
      icon: 'mypost',
    },
    {
      name: 'Ground Water8',
      coords: [41.78975120186806, 43.17092698998749],
      icon: 'blackmuseum',
    },
    {
      name: 'Ground Water9',
      coords: [41.79026543162763, 43.17013716325164],
      icon: 'bluewaterfall',
    },
    {
      name: 'Iron Green Door',
      coords: [41.77253804169595, 43.14033396542072],
      icon: 'redberry',
    },
    {
      name: 'Join to Official Trek',
      coords: [41.76119447685778, 43.15711428411305],
      icon: 'bluepolice',
    },
    {
      name: 'kowaxuri=ebi',
      coords: [41.776323141530156, 43.113291431218386],
      icon: 'mywc',
    },
    {
      name: "Kukura's Hut",
      coords: [41.77822315134108, 43.13214627094567],
      icon: 'yellowcarefull',
    },
    {
      name: 'land1',
      coords: [41.790160993114114, 43.16992308944464],
      icon: 'mypost',
    },
    {
      name: 'Mountain Pass',
      coords: [41.79352297447622, 43.16346198320389],
      icon: 'blackmuseum',
    },
    {
      name: 'Nigoztavi',
      coords: [41.75280301831663, 43.15399596467614],
      icon: 'mydesk',
    },
    {
      name: 'Panoramic',
      coords: [41.76920003257692, 43.14496798440814],
      icon: 'blacksettings',
    },
    {
      name: 'Panoramic1',
      coords: [41.787114422768354, 43.174983747303486],
      icon: 'cyancastle',
    },
    {
      name: 'Pass',
      coords: [41.74837728962302, 43.187872264534235],
      icon: 'yellowranger',
    },
    {
      name: 'Qata',
      coords: [41.77917449735105, 43.135296776890755],
      icon: 'bluelake',
    },
    {
      name: 'Rest',
      coords: [41.75315103493631, 43.1931702978909],
      icon: 'greentree',
    },
    {
      name: 'Rest/Camping',
      coords: [41.77430561743677, 43.17908685654402],
      icon: 'magentacanion',
    },
    {
      name: 'Sairme Hut 1',
      coords: [41.79145230911672, 43.13149348832667],
      icon: 'yellowquestion',
    },
    {
      name: 'Sairme Hut 2',
      coords: [41.79140277206898, 43.13166129402816],
      icon: 'bluebee',
    },
    {
      name: 'Sairme Hut 3',
      coords: [41.79151425138116, 43.1317993439734],
      icon: 'cyancastle',
    },
    {
      name: 'Stonehenge',
      coords: [41.775958025828004, 43.15632998943329],
      icon: 'greenbridge',
    },
    {
      name: 'Tiagachi',
      coords: [41.773621737957, 43.17934988066554],
      icon: 'bluewater',
    },
    {
      name: 'Tree Cemetery',
      coords: [41.80427402257919, 43.1547390203923],
      icon: 'mypost',
    },
    {
      name: 'water (oct 10)',
      coords: [41.74248573370278, 43.12709776684642],
      icon: 'cyanmonastery',
    },
    {
      name: 'Water In Hose',
      coords: [41.745234997943044, 43.154708007350564],
      icon: 'mypass',
    },
    {
      name: 'Water In the Vicinity (Find and Mark)1',
      coords: [41.809659646824, 43.15784879028797],
      icon: 'greenpine',
    },
    {
      name: 'West',
      coords: [41.73685200512409, 43.161329040303826],
      icon: 'greenbridge',
    },
    {
      name: 'West (Can Try East)',
      coords: [41.7994711920619, 43.15948116593063],
      icon: 'cyancastle',
    },
    {
      name: 'Wood Bridge',
      coords: [41.76707102917135, 43.15603695809841],
      icon: 'bluepolice',
    },
    {
      name: 'Wood Bridge1',
      coords: [41.763653978705406, 43.16582500934601],
      icon: 'cyanchapel',
    },
    {
      name: 'Wood Bridge2',
      coords: [41.75406198017299, 43.17474402487278],
      icon: 'greenforest',
    },
    {
      name: 'wyali (oct 10)',
      coords: [41.735211834311485, 43.132456401363015],
      icon: 'myarrow',
    },
    {
      name: 'zveli damba',
      coords: [41.73078602179885, 43.13671147450805],
      icon: 'mypost',
    },
    {
      name: 'გზა',
      coords: [41.758632799610496, 43.12134954147041],
      icon: 'magentatrace',
    },
    {
      name: 'გზა იყოფა',
      coords: [41.741866897791624, 43.128056321293116],
      icon: 'cyanmonastery',
    },
    {
      name: 'გზა იყოფა1',
      coords: [41.764481188729405, 43.11839081346989],
      icon: 'magentacanion',
    },
    {
      name: 'წყალი',
      coords: [41.738114738836884, 43.167727617546916],
      icon: 'greenpine',
    },
    {
      name: 'Amarati Shelter',
      coords: [41.81038074195385, 43.118887189775705],
      icon: 'greeninfo',
    },
    {
      name: 'Atskuri Ranger Shelter',
      coords: [41.74762601964176, 43.176859030500054],
      icon: 'cyancastle',
    },
    {
      name: 'biiliki ferdzea',
      coords: [41.781678423285484, 43.11657219193876],
      icon: 'mypost',
    },
    {
      name: 'camping',
      coords: [41.77888263948262, 43.113940777257085],
      icon: 'mybridge',
    },
    {
      name: 'Cliffs',
      coords: [41.769113866612315, 43.17916036583483],
      icon: 'mypost',
    },
    {
      name: 'Cliffs1',
      coords: [41.76276298239827, 43.16719897091389],
      icon: 'greenviewpoint',
    },
    {
      name: 'Cranberries',
      coords: [41.832962511107326, 43.12954637221992],
      icon: 'greeninfo',
    },
    {
      name: 'Cross+Marking',
      coords: [41.80536459200084, 43.12626225873828],
      icon: 'mycamp',
    },
    {
      name: 'Crossroad',
      coords: [41.763040674850345, 43.161069452762604],
      icon: 'greentopo',
    },
    {
      name: 'Crossroad1',
      coords: [41.7674239911139, 43.156276009976864],
      icon: 'greeninfo',
    },
    {
      name: 'Crossroad2',
      coords: [41.76190182566643, 43.17131549119949],
      icon: 'magentacanion',
    },
    {
      name: 'Crossroad3',
      coords: [41.780386017635465, 43.15321703441441],
      icon: 'blackruins',
    },
    {
      name: 'Crossroad4',
      coords: [41.741866897791624, 43.128056321293116],
      icon: 'bluelake',
    },
    {
      name: 'Crossroad5',
      coords: [41.764481188729405, 43.11839081346989],
      icon: 'greenbasin',
    },
    {
      name: 'Currant, Raspberries',
      coords: [41.81782303377986, 43.14034000039101],
      icon: 'yellowbus',
    },
    {
      name: 'Down to Ravine',
      coords: [41.76910422742367, 43.179065231233835],
      icon: 'bluebee',
    },
    {
      name: 'Foresters Hut',
      coords: [41.81025266647339, 43.12105894088745],
      icon: 'myhotel',
    },
    {
      name: 'gilza',
      coords: [41.78501081652939, 43.11998329125345],
      icon: 'bluelake',
    },
    {
      name: 'Ground Water',
      coords: [41.78162796422839, 43.1548960134387],
      icon: 'bluespring',
    },
    {
      name: 'Ground Water1',
      coords: [41.82708797045052, 43.130276016891],
      icon: 'yellowranger',
    },
    {
      name: 'Ground Water2',
      coords: [41.791449040174484, 43.12988600693643],
      icon: 'blackruins',
    },
    {
      name: 'Ground Water3',
      coords: [41.811542976647615, 43.11988899484277],
      icon: 'blacksettings',
    },
    {
      name: 'Ground Water4',
      coords: [41.81144398637116, 43.122095027938485],
      icon: 'bluespring',
    },
    {
      name: 'Ground Water5',
      coords: [41.757695032283664, 43.15590301528573],
      icon: 'blackruins',
    },
    {
      name: 'Ground Water6',
      coords: [41.761383321136236, 43.17090838216245],
      icon: 'myhut',
    },
    {
      name: 'Ground Water7',
      coords: [41.75300996750593, 43.175102015957236],
      icon: 'cyanchapel',
    },
    {
      name: 'Ground Water8',
      coords: [41.78975120186806, 43.17092698998749],
      icon: 'cyancastle',
    },
    {
      name: 'Ground Water9',
      coords: [41.79026543162763, 43.17013716325164],
      icon: 'bluebee',
    },
    {
      name: 'Iron Green Door',
      coords: [41.77253804169595, 43.14033396542072],
      icon: 'greenbridge',
    },
    {
      name: 'Join to Official Trek',
      coords: [41.76119447685778, 43.15711428411305],
      icon: 'mypost',
    },
    {
      name: 'kowaxuri=ebi',
      coords: [41.776323141530156, 43.113291431218386],
      icon: 'bluewaterfall',
    },
    {
      name: 'land1',
      coords: [41.790160993114114, 43.16992308944464],
      icon: 'mypass',
    },
    {
      name: 'Mountain Pass',
      coords: [41.79352297447622, 43.16346198320389],
      icon: 'magentatrace',
    },
    {
      name: 'Pass',
      coords: [41.74837728962302, 43.187872264534235],
      icon: 'bluelake',
    },
    {
      name: 'Qata',
      coords: [41.77917449735105, 43.135296776890755],
      icon: 'mypicnic',
    },
    {
      name: 'Readme',
      coords: [41.809659646824, 43.15784879028797],
      icon: 'greentree',
    },
    {
      name: 'Rest',
      coords: [41.75315103493631, 43.1931702978909],
      icon: 'greeninfo',
    },
    {
      name: 'Rest/Camping',
      coords: [41.77430561743677, 43.17908685654402],
      icon: 'whiteshelter',
    },
    {
      name: 'Sairme Huts',
      coords: [41.79140277206898, 43.13166129402816],
      icon: 'mypicnic',
    },
    {
      name: 'Stonehenge',
      coords: [41.775958025828004, 43.15632998943329],
      icon: 'greenbridge',
    },
    {
      name: 'Tiagachi',
      coords: [41.773621737957, 43.17934988066554],
      icon: 'mypass',
    },
    {
      name: 'water (oct 10)',
      coords: [41.74248573370278, 43.12709776684642],
      icon: 'yellowranger',
    },
    {
      name: 'Water In Hose',
      coords: [41.745234997943044, 43.154708007350564],
      icon: 'greenbasin',
    },
    {
      name: 'West (Can Try East)',
      coords: [41.7994711920619, 43.15948116593063],
      icon: 'yellowcarefull',
    },
    {
      name: 'Wood Bridge',
      coords: [41.76707102917135, 43.15603695809841],
      icon: 'bluelake',
    },
    {
      name: 'Wood Bridge1',
      coords: [41.763653978705406, 43.16582500934601],
      icon: 'greentopo',
    },
    {
      name: 'Wood Bridge2',
      coords: [41.75406198017299, 43.17474402487278],
      icon: 'mycanon',
    },
    {
      name: 'wyali (oct 10)',
      coords: [41.735211834311485, 43.132456401363015],
      icon: 'bluewaterfall',
    },
    {
      name: 'zveli damba',
      coords: [41.73078602179885, 43.13671147450805],
      icon: 'blacksettings',
    },
    {
      name: 'გზა',
      coords: [41.758632799610496, 43.12134954147041],
      icon: 'greeninfo',
    },
    {
      name: 'დათვი',
      coords: [41.792356967926025, 43.13425222411752],
      icon: 'greeninfo',
    },
    {
      name: 'დათვი1',
      coords: [41.78433381021023, 43.16952050663531],
      icon: 'magentatrace',
    },
    {
      name: 'ირემი',
      coords: [41.78275994025171, 43.169134268537164],
      icon: 'mybridge',
    },
    {
      name: 'კუკურას ქოხი',
      coords: [41.77822315134108, 43.13214627094567],
      icon: 'greenpine',
    },
    {
      name: 'მოკვდი, ოღონდ სხვა დროს',
      coords: [41.75955749116838, 43.18689686246216],
      icon: 'mypost',
    },
    {
      name: 'მოკვდი, ოღონდ სხვა დროს1',
      coords: [41.761139910668135, 43.18396587856114],
      icon: 'redberry',
    },
    {
      name: 'მოკვდი, ოღონდ სხვა დროს2',
      coords: [41.762286303564906, 43.183343103155494],
      icon: 'yellowquestion',
    },
    {
      name: 'ნიგოზთავი',
      coords: [41.75280301831663, 43.15399596467614],
      icon: 'greenviewpoint',
    },
    {
      name: 'პანორამა',
      coords: [41.76920003257692, 43.14496798440814],
      icon: 'bluewaterfall',
    },
    {
      name: 'პანორამა1',
      coords: [41.787114422768354, 43.174983747303486],
      icon: 'cyanchurch',
    },
    {
      name: 'წყალი',
      coords: [41.738114738836884, 43.167727617546916],
      icon: 'mybridge',
    },
    {
      name: 'Alternate Route',
      coords: [41.852144161239266, 43.26122162863612],
      icon: 'redberry',
    },
    {
      name: 'გზაჯვარედინი',
      coords: [41.84179502539337, 43.262437004595995],
      icon: 'yellowbus',
    },
    {
      name: 'პანორამული ხედი',
      coords: [41.83498372323811, 43.2657506223768],
      icon: 'magentatrace',
    },
    {
      name: 'Ranger Station10',
      coords: [41.747413, 43.177336],
      icon: 'greenpine',
    },
    {
      name: 'Tourist Shelter2',
      coords: [41.810453, 43.118761],
      icon: 'greenforest',
    },
  ];
  res.json(markers);
});

//🔰 For Production App
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
//🔰 -------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
