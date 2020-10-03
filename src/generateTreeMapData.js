/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const fs = require('fs');
const PATH = require('path');

const points = [];

const colors = ['#d1f510', '#856677', '#ae9ef0', '#0f687a', '#ceaf73', '#18425d', '#8f2392', '#d17715', '#a10475', '307fc9', '#53A4EF', '#21212D', '#90ED7D', '#D37D37', '#4F57EA', '#DD5676', '#F2D82E', '#117271', '#CE3D3D', '#65C6BE'];

const generateTreeMapData = (data, parentId) => {
  for (const item in data) {
    const id = `id_${item.toString()}`;

    const newPoint = {
      name: data[item].name,
      color: colors[Math.round(Math.random() * 20)],
      // colorValue: Math.round(Math.random() * 100),
      // colorValue: Math.round(data[item].size / 100),
    };
    if (parentId) {
      newPoint.parent = `${parentId}`;
      newPoint.id = `${parentId}_${item.toString()}`;
    } else {
      newPoint.id = id;
    }

    points.push(newPoint);
    if (data[item].isDirectory) {
      generateTreeMapData(data[item].content, newPoint.id);
    } else {
      newPoint.value = Math.round(data[item].size / 100);
    }
  }
  return points;
};

// add data series to treeMapData object
async function writeTreeMapData(data) {
  const dataSeries = await generateTreeMapData(data);

  // write to the result foam tree object
  const pathToFolder = PATH.resolve(__dirname, '../data');

  if (!fs.existsSync(pathToFolder)) {
    fs.mkdirSync(pathToFolder);
  }

  fs.writeFile(
    PATH.resolve(__dirname, '../data/treeMapData.js'),
    `export default ${JSON.stringify(dataSeries, null, 2)}`,
    'utf8',
    (err) => {
      if (err) throw err;
    },
  );
}

module.exports = { writeTreeMapData };
