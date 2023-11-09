const { Router } = require('express');
const querys = require('../querys');
const repository = require('../repository')
var requestIp = require("request-ip");

const router = Router();

router.get('/', async (req, res) => {
    const query = await querys.getAllContacts();
    return res.status(200).json(query);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const query = await querys.getContactById(id);
    if (query.length === 0) {
        return res.status(400).json({ message: 'contact not found' });
    }
    return res.status(200).json(query);
});

router.post('/', async (req, res) => {
    try {
        const lead = req.body;
        lead.ip = requestIp.getClientIp(req);
        const query = await querys.createContact(lead);
        const sendNeosaldinaApi = await repository.saveNeosaldinaApi(lead.clientName, lead.clientEmail)
        if(sendNeosaldinaApi == false) {
            res.status(500).send({ error: true, messgae: "Erro ao salvar cadastro" })
        }
        return res.status(200).json({ error: false, message: "cadastro salvo com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, messgae: "Erro ao salvar cadastro" })
    }
});

router.put('/', async (req, res) => {
    const { clientId, clientName, clientEmail, clientPhoneNumber } = req.body;
    const query = await querys.updateContact(clientId, clientName, clientEmail, clientPhoneNumber);
    if (query === null) {
        return res.status(400).json({ message: 'contact not found' });
    }
    return res.status(200).json({ message: 'contact updated' });
});

router.delete('/', async (req, res) => {
    const { clientId } = req.body;
    const query = await querys.deleteContact(clientId);
    if (query === null) {
        return res.status(400).json({ message: 'contact not found' });
    }
    return res.status(200).json({ message: 'contact deleted successfully' });
});
module.exports = router;