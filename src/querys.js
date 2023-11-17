const connection = require('./connection');
const moment = require('moment-timezone');

const getAllContacts = async () => {
    const [query] = await connection.execute('SELECT * FROM admin_bf.contacts');
    return query;
};

const getContactById = async (id) => {
    const [query] = await connection.execute('SELECT * FROM admin_bf.contacts WHERE clientId = ?', [id]);
    return query;
};

const createContact = async (lead) => {
    moment.tz.setDefault('America/Sao_Paulo');
    const dataAtualSaoPaulo = moment();
    const dataFormatada = dataAtualSaoPaulo.format('YYYY-MM-DD HH:mm:ss');
    // console.log(dataFormatada);
    const [query] = await connection.execute('INSERT INTO admin_bf.contacts (clientName, clientEmail, clientPhoneNumber, clientIp, createdate) VALUES (?,?,?,?,?)',
        [lead.clientName, lead.clientEmail, lead.clientPhoneNumber, lead.ip, dataFormatada]);
    const item = await getContactById(query.insertId);
    return item;
};

const updateContact = async (clientId, clientName, clientEmail, clientPhoneNumber) => {
    const item = await getContactById(clientId);
    if (item.length === 0) {
        return null;
    }
    const [query] = await connection.execute('UPDATE admin_bf.contacts SET clientName = ?, clientEmail = ?, clientPhoneNumber = ? WHERE clientId = ?;',
        [clientId, clientName, clientEmail, clientPhoneNumber]);
    return query;
};

const deleteContact = async (clientId) => {
    const item = await getContactById(clientId);
    if (item.length === 0) {
        return null;
    }
    const [query] = await connection.execute('DELETE FROM admin_bf.contacts WHERE clientId = ?;',
        [clientId]);
    return query;
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };