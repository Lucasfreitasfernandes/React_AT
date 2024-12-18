import React, { useState } from 'react';
import DateTimePickerComponent from '../../components/DateTimePicker/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import "./Styles.css";


const Formulario = () => {
  const [dadosFormulario, definirDadosFormulario] = useState({
    nome: '',
    comprimento: '',
    peso: '',
    dataNascimento: new Date(),
  });

  const navigate = useNavigate();
  const [idioma, setIdioma] = useState("pt");


  const manipularMudanca = (evento) => {
    const { name, value } = evento.target;
    definirDadosFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const manipularMudancaData = (data) => {
    definirDadosFormulario((anterior) => ({
      ...anterior,
      dataNascimento: data,
    }));
  };

  const salvarDados = () => {

    if (!dadosFormulario.nome.trim()) {
      alert('Por favor, preencha o nome');
      return;
    }

    if (!dadosFormulario.comprimento.trim()) {
      alert('Por favor, preencha o comprimento');
      return;
    }

    if (!dadosFormulario.peso.trim()) {
      alert('Por favor, preencha o peso');
      return;
    }


    console.log('Dados a serem enviados:', dadosFormulario);
    
    navigate('/home', { 
      state: {
        dadosFormulario: {
          ...dadosFormulario,

          dataNascimento: dadosFormulario.dataNascimento instanceof Date 
            ? dadosFormulario.dataNascimento.toISOString() 
            : dadosFormulario.dataNascimento
        },
        idioma
      } 
    });
  };

  const trocarIdioma = (novoIdioma) => {
    setIdioma(novoIdioma);
    console.log(`Idioma selecionado: ${novoIdioma}`);
  };
  

  return (
    <div className="formulario-container">
      <h3>Preencha os dados do bebe:</h3>
      <p className='mensagem-p'>Esses dados são importantes para o acompanhamento do bebe.</p>
      <form>
        <div className="campo-formulario">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={dadosFormulario.nome}
            onChange={manipularMudanca}
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="comprimento">Comprimento:</label>
          <input
            type="text"
            id="comprimento"
            name="comprimento"
            value={dadosFormulario.comprimento}
            onChange={manipularMudanca}
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="peso">Peso:</label>
          <input
            type="text"
            id="peso"
            name="peso"
            value={dadosFormulario.peso}
            onChange={manipularMudanca}
          />
        </div>

        <div className="campo-formulario">
          <label>Data de Nascimento:</label>
          <DateTimePickerComponent
            value={dadosFormulario.dataNascimento}
            onChange={manipularMudancaData}
            format="dd/MM/y"
            clearIcon={null}
            calendarIcon={null}
          />
        </div>

        <div className="idioma-selector">
          <label htmlFor="idiomas" style={{ marginRight: "10px" }}>Idioma:</label>
          <select
            id="idiomas"
            value={idioma}
            onChange={(e) => trocarIdioma(e.target.value)}
            style={{ padding: "5px", borderRadius: "5px" }}
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
          </select>
        </div>


        <button type="button" className="botao-salvar" onClick={salvarDados}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
