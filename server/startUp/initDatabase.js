const Bodies = require("../models/Bodies");
const Work = require("../models/Work");
const ExtraWorks = require("../models/ExtraWorks");
const Info = require("../models/Info");
const Terminal = require("../models/Terminal");
const Setting = require("../models/Setting");
const bodiesMock = require("../mock/bodies.json");
const workMock = require("../mock/work.json");
const extraWorksMock = require("../mock/extraWorks.json");
const infoMock = require("../mock/info.json");
const terminalMock = require("../mock/terminal.json");
const settingMock = require("../mock/setting.json");

module.exports = async () => {
  // const setting = await Setting.find()
  // if (setting.length !== settingMock.length) {
  //   await createInitialEntity(Setting, settingMock);
  // }
  // const work = await Work.find()
  // if (work.length !== workMock.length) {
  //   await createInitialEntity(Work, workMock);
  // }
  // const extraWorks = await ExtraWorks.find()
  // if (extraWorks.length !== extraWorksMock.length) {
  //   await createInitialEntity(ExtraWorks, extraWorksMock);
  // }
  // const info = await Info.find()
  // if (info.length !== infoMock.length) {
  //   await createInitialEntity(Info, infoMock);
  // }
  // const terminal = await Terminal.find()
  // if (terminal.length !== terminalMock.length) {
  //   await createInitialEntity(Terminal, terminalMock);
  // }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  //
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
