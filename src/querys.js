const connection = require('./connection');

const getAllContacts = async () => {
    const [query] = await connection.execute('SELECT * FROM db_neosaldina.contacts');
    return query;
};

const getContactById = async (id) => {
    const [query] = await connection.execute('SELECT * FROM db_neosaldina.contacts WHERE clientId = ?', [id]);
    return query;
};

const createContact = async (clientId,clientName, clientEmail, clientPhoneNumber) => {
    const [query] = await connection.execute('INSERT INTO db_neosaldina.contacts (clientId,clientName, clientEmail, clientPhoneNumber) VALUES (?,?,?,?)',
    [clientId,clientName, clientEmail, clientPhoneNumber]);
    const item = await getContactById(query.insertId);
    return item;
};

const updateContact = async (clientId,clientName, clientEmail, clientPhoneNumber) => {
    const item = await getContactById(clientId);
    if(item.length === 0){
        return null;
    }
    const [query] = await connection.execute('UPDATE db_neosaldina.contacts SET clientName = ?, clientEmail = ?, clientPhoneNumber = ? WHERE clientId = ?;',
    [clientId,clientName, clientEmail, clientPhoneNumber]);
    return query;
};

const deleteContact = async (clientId) => {
    const item = await getContactById(clientId);
    if(item.length === 0){
        return null;
    }
    const [query] = await connection.execute('DELETE FROM db_neosaldina.contacts WHERE clientId = ?;',
    [clientId]);
    return query;
};

module.exports = {getAllContacts, getContactById, createContact, updateContact, deleteContact};