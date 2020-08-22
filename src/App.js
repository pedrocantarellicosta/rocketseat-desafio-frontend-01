import React, { useEffect, useState }from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(response =>{
        setRepositories(response.data);
    })
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `novo projeto ${Date.now()}`,
        url: "http://github.com/...",
        techs: ["Alguma coisa 1", "Alguma coisa 2"]
    }).catch(() =>{
      console.log("Problema ao adicionar repositorio");
    })
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
      .catch(()=>{
        console.log("Problema ao deletar Repositorio");
        return;
    });
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={ repository.id }>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
