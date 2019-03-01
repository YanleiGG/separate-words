import {getConnectionManager} from "typeorm";

export function insert(entity, data) {
  const connection = getConnectionManager().get('mysql90Connection')
  let keyQuery = ''
  let valueQuery = ''
  data.map(item => {
    keyQuery += "`" + item.key + '`,'
    valueQuery += "'" + item.value + "',"
  })
  return connection.query(
    "INSERT INTO `" + entity + "`(" + keyQuery + "`createdAt`, `updatedAt`) VALUES ("+ valueQuery + " DEFAULT, DEFAULT)"
  )
}