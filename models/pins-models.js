const connection = require('../db/connection');

function selectAllPins(queryObj) {
  const sortObj = { sort_by: 'timestamp', order: 'desc' };
  const sortProps = ['sort_by', 'order'];
  sortProps.forEach(sortProp => {
    if (queryObj.hasOwnProperty(sortProp)) {
      sortObj[sortProp] = queryObj[sortProp];
      delete queryObj[sortProp];
    }
  });

  let rawCondition = '0 = 0';
  Object.keys(queryObj).forEach(prop => {
    if (prop === 'creator') {
      queryObj['users.name'] = queryObj[prop];
      delete queryObj[prop];
    } else if (prop === 'site') {
      queryObj['sites.name'] = queryObj[prop];
      delete queryObj[prop];
    } else if (/^max_/.test(prop)) {
      rawCondition = `${rawCondition} AND pins.${prop.replace(
        /^max_/,
        ''
      )} <= ${queryObj[prop]}`;
      delete queryObj[prop];
    } else if (/^min_/.test(prop)) {
      rawCondition = `${rawCondition} AND pins.${prop.replace(
        /^min_/,
        ''
      )} >= ${queryObj[prop]}`;
      delete queryObj[prop];
    };
  });

  return connection
    .select(
      'pins.pin_id AS pin_id',
      'pins.photo_url AS photo_url',
      'pins.note AS note',
      'pins.timestamp AS timestamp',
      'pins.latitude AS latitude',
      'pins.longitude AS longitude',
      'pins.altitude AS altitude',
      'users.name AS creator',
      'users.email AS email',
      'users.user_photo AS user_photo',
      'sites.site_name AS site_name',
    )
    .from('pins')
    .leftJoin('users', 'pins.user_id', '=', 'users.user_id')
    .leftJoin('sites', 'pins.site_id', '=', 'sites.site_id')
    .where(queryObj)
    .whereRaw(rawCondition)
    .orderBy(sortObj.sort_by, sortObj.order);
}

function selectPin(paramObj) {
  Object.keys(paramObj).forEach(prop => {
    paramObj[`pins.${prop}`] = paramObj[prop];
    delete paramObj[prop];
  });
  return connection
    .select(
      'pins.pin_id AS pin_id',
      'pins.photo_url AS url',
      'pins.note AS note',
      'pins.timestamp AS timestamp',
      'pins.latitude AS latitude',
      'pins.longitude AS longitude',
      'pins.altitude AS altitude',
      'users.name AS creator',
      'users.email AS email',
      'sites.site_name AS site_name',
    )
    .from('pins')
    .leftJoin('users', 'pins.user_id', '=', 'users.user_id')
    .leftJoin('sites', 'pins.site_id', '=', 'sites.site_id')
    .where(paramObj);
}

function addPin(params, pinReqBody) {
  console.log(pinReqBody)
  const pin = {
    user_id: pinReqBody.user_id,
    site_id: pinReqBody.site_id,
    timestamp: pinReqBody.timestamp,
    latitude: pinReqBody.latitude,
    longitude: pinReqBody.longitude,
    altitude: pinReqBody.altitude,
    photo_url: pinReqBody.photo_url,
    note: pinReqBody.note
  };
  return connection
    .insert(pin)
    .into('pins')
    .returning('*');
}

function modifyPin(paramObj, updateObj) {
  return connection('pins')
    .where(paramObj)
    .update(updateObj)
    .returning('*');
}

function removePin(paramObj) {
  return connection('pins')
    .where(paramObj)
    .del();
}

module.exports = {
  selectAllPins,
  selectPin,
  addPin,
  modifyPin,
  removePin
};
