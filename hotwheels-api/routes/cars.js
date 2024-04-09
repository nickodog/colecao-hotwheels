const express = require('express');
const fs = require('fs');
var router = express.Router();
const filePath = './data/carsData.json'

/// rota para obter um carro em especifico
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    };
    let carsData = JSON.parse(data);
    const carIndex = carsData.findIndex(car => car.id === id);
    if (carIndex === -1) {
      return res.status(404).json({ message: 'Car not found' });
    }else{
      res.send(carsData[carIndex]);
    };
  })});

  

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCar = req.body
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
      };
    try {
    let carsData = JSON.parse(data);
    const carIndex = carsData.findIndex(car => car.id === id);
    if (carIndex === -1) {
      return res.status(404).json({ message: 'Car not found' });
    }else{
      carsData.splice(carIndex, 1)
      carsData.push(updatedCar)
      fs.writeFile(filePath, JSON.stringify(carsData), 'utf-8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao escrever arquivo JSON' });
        }
        res.json(carsData[carIndex])
      }
      )}
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao analisar arquivo JSON' });
    };
  })
});
        
  

/// Rota para o endpoint GET que lê os dados do arquivo JSON
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao ler arquivo JSON' });
    }

    try {
      const cars = JSON.parse(data); // Transforma o conteúdo em um objeto JavaScript
      res.json(cars); // Retorna os dados como JSON na resposta
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao analisar arquivo JSON' });
    }
  });
});

  // Rota para o endpoint POST que adiciona dados ao arquivo JSON
router.post('/', (req, res) => {
  // Lê o conteúdo atual do arquivo JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao ler arquivo JSON' });
    }

    try {
      const cars = JSON.parse(data); // Transforma o conteúdo em um objeto JavaScript
      const newCar = req.body; // Obtém o novo objeto de carro a partir do corpo da requisição

      // Adiciona o novo carro ao array de carros
      cars.push(newCar);

      // Escreve o novo conteúdo no arquivo JSON
      fs.writeFile(filePath, JSON.stringify(cars), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao escrever arquivo JSON' });
        }

        res.json(newCar); // Retorna o novo carro como resposta
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao analisar arquivo JSON' });
    }
  });
});

// Rota DELETE para remover um carro pelo ID
router.delete('/:id', (req, res) => {
  const carId = parseInt(req.params.id);

  // Lê o arquivo JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    let carsData = JSON.parse(data);

    // Procura o carro pelo ID
    const carIndex = carsData.findIndex(car => car.id === carId);
    if (carIndex === -1) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Remove o carro do array
    carsData.splice(carIndex, 1);

    // Escreve os dados atualizados no arquivo JSON
    fs.writeFile(filePath, JSON.stringify(carsData), err => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.json({ message: 'Car removed successfully' });
    });
  });
});

module.exports = router;
