import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DateTimePickerComponent from "../../components/DateTimePicker/DateTimePicker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import "./Styles.css";

function Formulario({ adicionarTarefa, editarTarefa, tarefaEditando, setTarefaEditando }) {
  const [formularioAtivo, setFormularioAtivo] = useState(null);
  const [dados, setDados] = useState({
    sono: { dataHoraInicial: new Date(), dataHoraFinal: new Date(), observacao: '' },
    amamentacao: { tipo: '', lado: '', dataHoraInicial: new Date(), observacao: '' },
    fralda: { dataHoraInicial: new Date(), tipo: '', observacao: '' },
  });

    const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {

  
      if (location.state?.dadosFormulario) {
  
        if (location.state?.idioma) {
          setIdiomaSelecionado(location.state.idioma);
        }
  
      } else {
  
        navigate('settings');
      }
  }, [location.state, navigate]);


  const [botoesAtivos, setBotoesAtivos] = useState({
    amamentacao: { 
      tipo: null, 
      lado: null 
    },
    fralda: { 
      tipo: null 
    }
  });

  const traducoes = {
    en: {
      sono: "Sleep",
      amamentacao: "Breastfeeding",
      fralda: "Diaper",
      dataHoraInicial: "Start Date and Time",
      dataHoraFinal: "End Date and Time",
      tipoAmamentacao: "Type of Feeding",
      lado: "Side",
      observacao: "Observation",
      enviar: "Submit",
      fechar: "Close",
      mamadeira: "Bottle",
      seios: "Breast",
      esquerdo: "Left",
      direito: "Right",
      ambos: "Both",
      tipoFralda: "Type of Diaper",
      molhada: "Wet",
      suja: "Dirty",
      limpa: "Clean",
      osDois: "Both",
      excluir: "Delete",
      editar: "Edit"
    },
    pt: {
      sono: "Sono",
      amamentacao: "Amamentação",
      fralda: "Fralda",
      dataHoraInicial: "Data e Hora Inicial",
      dataHoraFinal: "Data e Hora Final",
      tipoAmamentacao: "Tipo de Amamentação",
      lado: "Lado",
      observacao: "Observação",
      enviar: "Enviar",
      fechar: "Fechar",
      mamadeira: "Mamadeira",
      seios: "Seios",
      esquerdo: "Esquerdo",
      direito: "Direito",
      ambos: "Ambos",
      tipoFralda: "Tipo de Fralda",
      molhada: "Molhada",
      suja: "Suja",
      limpa: "Limpa",
      osDois: "Os Dois"
    }
  };

  const [idiomaSelecionado, setIdiomaSelecionado] = useState("pt");


  useEffect(() => {
    if (tarefaEditando && tarefaEditando.dados && tarefaEditando.tipo) {
      setFormularioAtivo(tarefaEditando.tipo);
      setDados(tarefaEditando.dados);
    } else {
      setFormularioAtivo(null);
    }
  }, [tarefaEditando]);

  const handleDateChange = (date, form, field) => {
    setDados((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [field]: date,
      },
    }));
  };

  const handleChange = (e, form) => {
    const { name, value } = e.target;
    setDados((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [name]: value,
      },
    }));
  };


  const handleButtonSelect = (form, category, value) => {
    setDados((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [category]: value,
      },
    }));


    setBotoesAtivos((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [category]: value,
      },
    }));
  };

  const handleSubmit = (e, form) => {
    e.preventDefault();
    const novaTarefa = {
      id: tarefaEditando ? tarefaEditando.id : Date.now(),
      tipo: form,
      dados: dados[form],
    };

    if (tarefaEditando) {
      editarTarefa(novaTarefa);
    } else {
      adicionarTarefa(novaTarefa);
    }

    setFormularioAtivo(null);
  };

  const handleEdit = (tarefa) => {
    setTarefaEditando(tarefa);
  };
  

  const renderFormulario = () => {
    if (!dados[formularioAtivo]) return null;

    switch (formularioAtivo) {

      case 'sono':
  return (
    <form onSubmit={(e) => handleSubmit(e, 'sono')}>
      <div>
        <label htmlFor="dataHoraInicial">{traducoes[idiomaSelecionado]?.dataHoraInicial}</label>
        <DateTimePickerComponent
          onChange={(date) => handleDateChange(date, 'sono', 'dataHoraInicial')}
          value={dados.sono.dataHoraInicial}
          locale="pt-BR"
          format="dd/MM/yyyy HH:mm"
        />
      </div>
      <div>
        <label htmlFor="dataHoraFinal">{traducoes[idiomaSelecionado]?.dataHoraFinal}</label>
        <DateTimePickerComponent
          onChange={(date) => handleDateChange(date, 'sono', 'dataHoraFinal')}
          value={dados.sono.dataHoraFinal}
          locale="pt-BR"
          format="dd/MM/yyyy HH:mm"
        />
      </div>
      <div>
        <label htmlFor="observacao">{traducoes[idiomaSelecionado]?.observacao}</label>
        <textarea
          id="observacao"
          name="observacao"
          value={dados.sono.observacao}
          onChange={(e) => handleChange(e, 'sono')}
        />
      </div>
      <button type="submit">{traducoes[idiomaSelecionado]?.enviar}</button>
      <button type="button" onClick={() => setFormularioAtivo(null)}>
      {traducoes[idiomaSelecionado]?.fechar}
      </button>
    </form>
  );


      case 'amamentacao':
        return (
          <form onSubmit={(e) => handleSubmit(e, 'amamentacao')}>
            <div>
              <label htmlFor="tipo">{traducoes[idiomaSelecionado]?.tipoAmamentacao}</label>
              <button
                type="button"
                name="tipo"
                value="mamadeira"
                onClick={() => handleButtonSelect('amamentacao', 'tipo', 'mamadeira')}
                className={botoesAtivos.amamentacao.tipo === 'mamadeira' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.mamadeira}
              </button>
              <button
                type="button"
                name="tipo"
                value="seios"
                onClick={() => handleButtonSelect('amamentacao', 'tipo', 'seios')}
                className={botoesAtivos.amamentacao.tipo === 'seios' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.seios}
              </button>
            </div>
            <div>
              <label htmlFor="dataHoraInicial">{traducoes[idiomaSelecionado]?.dataHoraInicial}</label>
              <DateTimePickerComponent
                onChange={(date) => handleDateChange(date, 'amamentacao', 'dataHoraInicial')}
                value={dados.amamentacao.dataHoraInicial}
                locale="pt-BR"
                format="dd/MM/yyyy HH:mm"
              />
            </div>
            <div>
              <label htmlFor="lado">{traducoes[idiomaSelecionado]?.lado}</label>
              <button
                type="button"
                name="lado"
                value="esquerdo"
                onClick={() => handleButtonSelect('amamentacao', 'lado', 'esquerdo')}
                className={botoesAtivos.amamentacao.lado === 'esquerdo' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.esquerdo}
              </button>
              <button
                type="button"
                name="lado"
                value="direito"
                onClick={() => handleButtonSelect('amamentacao', 'lado', 'direito')}
                className={botoesAtivos.amamentacao.lado === 'direito' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.direito}
              </button>
              <button
                type="button"
                name="lado"
                value="ambos"
                onClick={() => handleButtonSelect('amamentacao', 'lado', 'ambos')}
                className={botoesAtivos.amamentacao.lado === 'ambos' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.ambos}
              </button>
            </div>

            <div>
              <label htmlFor="observacao">{traducoes[idiomaSelecionado]?.observacao}</label>
              <textarea
                id="observacao"
                name="observacao"
                value={dados.amamentacao.observacao}
                onChange={(e) => handleChange(e, 'amamentacao')}
              />
            </div>
            <button type="submit">{traducoes[idiomaSelecionado]?.enviar}</button>
            <button type="button" onClick={() => setFormularioAtivo(null)}>
            {traducoes[idiomaSelecionado]?.fechar}
            </button>
          </form>
        );
      case 'fralda':
        return (
          <form onSubmit={(e) => handleSubmit(e, 'fralda')}>
            <div>
              <label htmlFor="dataHoraInicial">{traducoes[idiomaSelecionado]?.dataHoraInicial}</label>
              <DateTimePickerComponent
                onChange={(date) => handleDateChange(date, 'fralda', 'dataHoraInicial')}
                value={dados.fralda.dataHoraInicial}
                locale="pt-BR"
                format="dd/MM/yyyy HH:mm"
              />
            </div>
            <div>
              <label htmlFor="tipo">{traducoes[idiomaSelecionado]?.tipoFralda}</label>
              <button
                type="button"
                name="tipo"
                value="molhada"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'molhada')}
                className={botoesAtivos.fralda.tipo === 'molhada' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.molhada}
              </button>
              <button
                type="button"
                name="tipo"
                value="suja"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'suja')}
                className={botoesAtivos.fralda.tipo === 'suja' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.suja}
              </button>
              <button
                type="button"
                name="tipo"
                value="os dois"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'os dois')}
                className={botoesAtivos.fralda.tipo === 'os dois' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.osDois}
              </button>
              <button
                type="button"
                name="tipo"
                value="limpa"
                onClick={() => handleButtonSelect('fralda', 'tipo', 'limpa')}
                className={botoesAtivos.fralda.tipo === 'limpa' ? 'botao-selecionado' : ''}
              >
                {traducoes[idiomaSelecionado]?.limpa}
              </button>
            </div>

            <div>
              <label htmlFor="observacao">Observação</label>
              <textarea
                id="observacao"
                name="observacao"
                value={dados.fralda.observacao}
                onChange={(e) => handleChange(e, 'fralda')}
              />
            </div>
            <button type="submit">{traducoes[idiomaSelecionado]?.enviar}</button>
            <button type="button" onClick={() => setFormularioAtivo(null)}>
            {traducoes[idiomaSelecionado]?.fechar}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className='container-botao-fomularios'>
      <button className='botao-sono' onClick={() => setFormularioAtivo('sono')}>{traducoes[idiomaSelecionado]?.sono}</button>
      <button className='botao-amamentacao' onClick={() => setFormularioAtivo('amamentacao')}>{traducoes[idiomaSelecionado]?.amamentacao}</button>
      <button className='botao-fralda' onClick={() => setFormularioAtivo('fralda')}>{traducoes[idiomaSelecionado]?.fralda}</button>
      {renderFormulario()}
    </div>
  );
}

export default Formulario;
