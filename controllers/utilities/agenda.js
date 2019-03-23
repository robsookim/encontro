const keys = {
  oneDeeper: "HOWELNVASIHVOAWNKVHONWDVAEV",
  same: "LKNWDVLKQNDLVKNDLVKNQELDKNVLAEKDNVLQKENVQEWefv",
  backOne: "8y4982y34230regh093h4g"
};
const regex = new RegExp(
  `(.)*?((${keys.oneDeeper})|(${keys.same})|(${keys.backOne}))`,
  "gi"
);
module.exports = {
  recieveAgenda: function recieveAgenda(agendaObj, curStr = "") {
    if (!(typeof agendaObj === "object")) {
      return agendaObj;
    }

    if (Array.isArray(agendaObj)) {
      if (agendaObj.length === 1) {
        return recieveAgenda(agendaObj[0]);
      }
      return (
        agendaObj.reduce((str = "", arrItem) => {
          return str + keys.same + recieveAgenda(arrItem);
        }) + keys.backOne
      );
    }
    return agendaObj.header + keys.oneDeeper + recieveAgenda(agendaObj.items);
  },
  agendaIntoObject: function agendaIntoObject(regex = regex, agendaStr) {
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
            items: newLevel.agendaLevel
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
          returnArray.push(lastItem);
        }
        return { agendaLevel: returnArray, regex: regex };
      }
      if (testArray[2] === keys.same) {
        let nextItem = testArray[0].slice(
          0,
          testArray[0].length - keys.same.length
        );
        if (nextItem.length !== 0) {
          returnArray.push(nextItem);
        }
      }
    }
    return returnArray;
  }
};
