// Should be manged in mongodb..
const chargeStatusesListDB = {} ;
module.exports = chargeStatusesListDB;



// Example for chargeStatusesListDB structure -- for better update performance
//-------------------------------------------
// chargeStatusesListDB = {
//   firstNameId1: {'A':{reason:"A", count: 5}, 'B':{}},
//   firstNameId2: {'someReason':{reason:"someReason", count: 2}}
// }