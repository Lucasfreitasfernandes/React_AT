import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SingIn() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const fazerLogin = () => {
    const usuarioSalvo = localStorage.getItem(nome);

    if (!usuarioSalvo) {
      setMensagem('Usuário não encontrado!');
      return;
    }

    const dadosUsuario = JSON.parse(usuarioSalvo);
    if (dadosUsuario.senha !== senha) {
      setMensagem('Senha incorreta!');
      return;
    }

    setMensagem('Login bem-sucedido!');
    navigate('/home');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
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
      <button onClick={fazerLogin}>Acessar</button>
      <button onClick={() => navigate('/singup')} style={{ marginLeft: '10px' }}>
        Registrar
      </button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default SingIn;
