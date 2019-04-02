const keys = {
  oneDeeper: "DPR332",
  same: "SME332",
  backOne: "BON332"
};

module.exports = {
  recieveAgenda: function recieveAgenda(agendaObj) {
    if (!(typeof agendaObj === "object")) {
      return agendaObj;
    }
    if (!Array.isArray(agendaObj) && !("header" in agendaObj)) {
      return agendaObj.text;
    }

    if (Array.isArray(agendaObj)) {
      if (agendaObj.length === 1) {
        return recieveAgenda(agendaObj[0]) + keys.backOne
      }
      return (
        agendaObj.reduce((str, arrItem) => {
          return str + keys.same + recieveAgenda(arrItem);
        }, "") + keys.backOne
      );
    }
    return agendaObj.header + keys.oneDeeper + recieveAgenda(agendaObj.items);
  },
  agendaIntoObject: function agendaIntoObject(regex, agendaStr) {
    const returnArray = [];
    let testArray = [];

    while ((testArray = regex.exec(agendaStr)) !== null) {
      if (testArray[2] === keys.oneDeeper) {
        //   console.log(testArray[0]);
        const newLevel = agendaIntoObject(regex, agendaStr);
        if (newLevel.agendaLevel !== null) {
          returnArray.push({
            header: testArray[0].slice(
              0,
              testArray[0].length - keys.oneDeeper.length
            ),
            items: newLevel.agendaLevel,
            completed: false
          });
        }
        regex = newLevel.regex;
        //   console.log(returnArray);
      }
      if (testArray[2] === keys.backOne) {
        let lastItem = testArray[0].slice(
          0,
          testArray[0].length - keys.backOne.length
        );
        if (lastItem.length !== 0) {
          returnArray.push({ text: lastItem, completed: false });
        }
        return { agendaLevel: returnArray, regex: regex };
      }
      if (testArray[2] === keys.same) {
        let nextItem = testArray[0].slice(
          0,
          testArray[0].length - keys.same.length
        );
        if (nextItem.length !== 0) {
          returnArray.push({ text: nextItem, completed: false });
        }
      }
    }
    return returnArray;
  }
};
