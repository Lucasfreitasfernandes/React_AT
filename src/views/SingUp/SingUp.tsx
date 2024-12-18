import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles.css";

function SingUp() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const salvarUsuario = () => {
    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem!');
      return;
    }

    const usuario = { senha };
    localStorage.setItem(nome, JSON.stringify(usuario));

    setMensagem('Usuário registrado com sucesso!');
    setTimeout(() => navigate('/singin'), 2000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Registro</h2>
      <label>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />
      </label>
      <br />
      <label>
        Senha:
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />
      </label>
      <br />
      <label>
        Confirmar Senha:
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Confirme sua senha"
        />
      </label>
      <br />
      <button onClick={salvarUsuario}>Registrar</button>
      <button onClick={() => navigate('/singin')} style={{ marginLeft: '10px' }}>
        Voltar ao Login
      </button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default SingUp;
