const express = require('express');
const axios = require('axios');
const cors = require('cors');
const oracledb = require('oracledb');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); 

app.get('/', async (req, res) => {
 try {
  const response = await axios.get('https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grdcb4ggsk5a/b/bucket-20231213-1730/o/teste.txt');
  res.send(response.data);
 } catch (error) {
  console.error(error);
  res.status(500).send('Erro ao buscar o objeto');
 }
});

app.post('/save', async (req, res) => {
 try {
  const data = req.body.data; // dados recebidos do frontend

  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "MEU USUÁRIO",
      password: "MINHA SENHA",
      connectString: "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=g1a8cf8334200df_myclouddb_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))"
    });

    await connection.execute(
      `INSERT INTO testeprojetoisw (coluna_teste) VALUES (:data)`,
      { data: data },
      { autoCommit: true }
    );
    res.status(200).send('Dados salvos com sucesso');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar os dados no banco de dados');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
 } catch (error) {
  console.error(error);
  res.status(500).send('Erro ao salvar os dados no banco de dados');
 }
});

app.listen(port, () => {
 console.log(`Server teste at http://localhost:${port}`);
});

