import { useState, useEffect } from "react";
import Formulario  from "../Form/Form";
import { MdOutlineChildCare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./Styles.css";


const Home = () => {

  const [dados, setDados] = useState({
    nome: '',
    comprimento: '',
    peso: '',
    dataNascimento: new Date(),
  });

  const [tarefas, setTarefas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [dadosRecebidos, setDadosRecebidos] = useState(null);
  const [idiomaSelecionado, setIdiomaSelecionado] = useState("pt");

  const textos = {
    pt: { titulo: "Meu bebê", comprimento: "Cm", peso: "Kg", dias: "Dias", editar: "Editar", excluir: "Excluir"},
    en: { titulo: "My baby", comprimento: "Cm", peso: "Kg", dias: "Days", editar: "Edit", excluir: "Delet"},
    es: { titulo: "Mi bebé", comprimento: "Cm", peso: "Kg", dias: "Días" },
    fr: { titulo: "Mon bébé", comprimento: "Cm", peso: "Kg", dias: "Jours" },
  };



  useEffect(() => {

    console.log('Location state no Home:', location.state);

    if (location.state?.dadosFormulario) {

      const dadosConvertidos = {
        ...location.state.dadosFormulario,
        dataNascimento: location.state.dadosFormulario.dataNascimento 
          ? new Date(location.state.dadosFormulario.dataNascimento) 
          : new Date()
      };
      setDadosRecebidos(dadosConvertidos);

      if (location.state?.idioma) {
        setIdiomaSelecionado(location.state.idioma);
      }

    } else {

      navigate('settings');
    }
  }, [location.state, navigate]);


  if (!dadosRecebidos) {
    return <div>Carregando dados...</div>;
  }

  const calcularDias = (data) => {
    const hoje = new Date();
    const diferenca = hoje - new Date(data);
    return Math.floor(diferenca / (1000 * 60 * 60 * 24));
  };

  const adicionarTarefa = (novaTarefa) => {
    setTarefas((prev) => [...prev, novaTarefa]);
  };

  const editarTarefa = (idTarefa, tarefaAtualizada) => {
    setTarefas((prev) => 
      prev.map((tarefa) =>
        tarefa.id === idTarefa ? { ...tarefa, ...tarefaAtualizada } : tarefa
      )
    );
    setTarefaEditando(null);
  };


  const removerTarefa = (idTarefa) => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== idTarefa));
  };

  const cores = {
    sono: '#023047',
    amamentacao: '#bc6c25',
    fralda: '#6a994e'
  };

  

  return (
      <div className="container-home">
      <h1 className="h1-home">{textos[idiomaSelecionado]?.titulo}: {dadosRecebidos.nome}</h1>
            
        <div className="container-bebe">
          <MdOutlineChildCare
          style={{ color: 'black', fontSize: '3rem', cursor: 'pointer' }} 
          onClick={() => navigate('/settings')}
          />
          
            <p>{textos[idiomaSelecionado]?.comprimento}: {dadosRecebidos.comprimento}</p>
            <p>{textos[idiomaSelecionado]?.peso}: {dadosRecebidos.peso}</p>
            <p>{textos[idiomaSelecionado]?.dias}: {dadosRecebidos.dataNascimento ? calcularDias(dadosRecebidos.dataNascimento) : "N/A"}</p>
          
        </div>
      <Formulario     
      adicionarTarefa={adicionarTarefa}
      editarTarefa={editarTarefa}
      tarefaEditando={tarefaEditando}
      setTarefaEditando={setTarefaEditando}
      />
      <div className="tarefas-container">
  {tarefas.map((tarefa) => (
    <div
      key={tarefa.id}
      className="tarefa-item"
      style={{ backgroundColor: cores[tarefa.tipo], padding: '10px', margin: '10px 0', borderRadius: '8px' }}
    >
      <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>{tarefa.tipo}</h3>
      {tarefa.dados.dataHoraInicial && (
        <p><strong>Início:</strong> {new Date(tarefa.dados.dataHoraInicial).toLocaleString()}</p>
      )}
      {tarefa.dados.dataHoraFinal && (
        <p><strong>Fim:</strong> {new Date(tarefa.dados.dataHoraFinal).toLocaleString()}</p>
      )}
      {tarefa.dados.tipo && <p><strong>Tipo:</strong> {tarefa.dados.tipo}</p>}
      {tarefa.dados.lado && <p><strong>Lado:</strong> {tarefa.dados.lado}</p>}
      {tarefa.dados.observacao && <p><strong>Observação:</strong> {tarefa.dados.observacao}</p>}
      <button
              onClick={() => removerTarefa(tarefa.id)}
              style={{
                backgroundColor: '#FF6347',
                color: 'white',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              {textos[idiomaSelecionado]?.excluir}
            </button>
            <button
              onClick={() => setTarefaEditando(tarefa)}
              style={{
                backgroundColor: "#FFD700",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              {textos[idiomaSelecionado]?.editar}
            </button>
    </div>
  ))}
</div>
    
    </div>
  );
};

export default Home;

