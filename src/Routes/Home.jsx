import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';

function HomePage() {
  const [dentists, setDentists] = useState([]);

  useEffect(() => {
    // Fazer uma chamada à API real para obter a lista de dentistas
    fetch('/https://dhodonto.ctdprojetos.com.br/dentistaapi/dentists') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dentistas');
        }
        return response.json();
      })
      .then((data) => setDentists(data))
      .catch((error) => console.error('Erro ao buscar dentistas:', error));
  }, []); // O array vazio significa que esta chamada à API acontecerá apenas uma vez, quando o componente for montado

  return (
    <div className="home-page">
      <h1>Lista de Dentistas</h1>
      <div className="dentist-grid">
        {dentists.map((dentist) => (
          <Card key={dentist.id} dentist={dentist} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
