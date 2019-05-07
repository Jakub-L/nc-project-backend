const connection = require('../db/connection');

function selectAllSites(queryObj) {
  const sortObj = { sort_by: 'sites.site_name', order: 'asc' };
  const sortProps = ['sort_by', 'order'];
  sortProps.forEach(sortProp => {
    if (queryObj.hasOwnProperty(sortProp)) {
      sortObj[sortProp] = queryObj[sortProp];
      delete queryObj[sortProp];
    }
  });

  let rawCondition = '0 = 0';
  Object.keys(queryObj).forEach(prop => {
    if (/^max_/.test(prop)) {
      rawCondition = `${rawCondition} AND sites.${prop.replace(
        /^max_/,
        ''
      )}_max <= ${queryObj[prop]}`;
      delete queryObj[prop];
    } else if (/^min_/.test(prop)) {
      rawCondition = `${rawCondition} AND sites.${prop.replace(
        /^min_/,
        ''
      )}_min >= ${queryObj[prop]}`;
      delete queryObj[prop];
    }
  })

  return connection
    .select(
      'sites.site_id AS site_id',
      'sites.site_name AS site_name',
      'sites.latitude_min AS latitude_min',
      'sites.longitude_min AS longitude_min',
      'sites.altitude_min AS altitude_min',
      'sites.latitude_max AS latitude_max',
      'sites.longitude_max AS longitude_max',
      'sites.altitude_max AS altitude_max',
    )
    .count('pins.pin_id AS pin_count', 'users.user_id AS user_count')
    .from('sites')
    .leftJoin('pins', 'sites.site_id', '=', 'pins.site_id')
    .leftJoin('users', 'pins.user_id', '=', 'users.user_id')
    .groupBy('sites.site_id')
    .where(queryObj)
    .whereRaw(rawCondition)
    .orderBy(sortObj.sort_by, sortObj.order);
}

function selectSite(paramObj) {
  Object.keys(paramObj).forEach(prop => {
    paramObj[`pins.${prop}`] = paramObj[prop];
    delete paramObj[prop];
  })
  return connection
    .select(
      'sites.site_id AS site_id',
      'sites.site_name AS site_name',
      'sites.latitude_min AS latitude_min',
      'sites.longitude_min AS longitude_min',
      'sites.altitude_min AS altitude_min',
      'sites.latitude_max AS latitude_max',
      'sites.longitude_max AS longitude_max',
      'sites.altitude_max AS altitude_max'
    )
    .count('pins.pin_id AS pin_count', 'users.user_id AS user_count')
    .from('sites')
    .leftJoin('pins', 'sites.site_id', '=', 'pins.site_id')
    .leftJoin('users', 'pins.user_id', '=', 'users.user_id')
    .groupBy('sites.site_id')
    .where(paramObj);
}

function addSite(siteReqBody) {
  const site = {
    name: siteReqBody.name,
    latitude_min: siteReqBody.latitude_min,
    longitude_min: siteReqBody.longitude_min,
    altitude_min: siteReqBody.altitude_min,
    latitude_max: siteReqBody.latitude_max,
    longitude_max: siteReqBody.longitude_max,
    altitude_max: siteReqBody.altitude_max,
  };
  return connection
    .insert(site)
    .into('sites')
    .returning('*');
}

function modifySite(paramObj, updateObj) {
  return connection('sites')
    .where(paramObj)
    .update(updateObj)
    .returning('*');
}

function removeSite(paramObj) {
  return connection('sites')
    .where(paramObj)
    .del();
}

module.exports = {
  selectAllSites,
  selectSite,
  addSite,
  modifySite,
  removeSite,
};
