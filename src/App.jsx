import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DentistDetailPage from './pages/DentistDetailPage';

function App() {

  const [themeMode, setThemeMode] = useState('light'); 

  // Função para alternar entre os modos de tema
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  // Aplicar a classe do modo de tema ao corpo do aplicativo
  document.body.className = themeMode;

  return (
    <Router>
      <div className="App">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/dentist/:id" component={DentistDetailPage} />
          {/* Adicionar outras rotas */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
