import React, { useState } from 'react';
import './App.css';
import fechado from './assets/fechado.svg'
import aberto from './assets/aberto.svg'
import light from './assets/light-logo.svg'
import dark from './assets/dark-logo.svg'

function App() {
  const [linhas, setLinhas] = useState('1')
  const [input, setInput] = useState('')
  const [chave, setChave] = useState('')
  const [resultado, setResultado] = useState('')
  const [tema, setTema] = useState('light')

  function handleLines(event) {
    const textarea = event.target.scrollHeight
    const lines = Math.trunc(textarea /  21)
    setLinhas(lines)
    setChave(event.target.value)
  }

  function criptografar(){
    // const err = debug()
    // if (err === true) {return}
    const str = input
    const key = chave
    const chaveCompleta = gerarChaveCompleta(str, key)
    let textoCriptografado = ''

    for (let i = 0; i < str.length; i++) { 
      const codStr = str[i].codePointAt(0) - 32
      const codKey = chaveCompleta[i].codePointAt(0) - 32
  
      const codResultado = (codStr + codKey) % 224
  
      const strResultado = String.fromCharCode(codResultado + 32)

      textoCriptografado += strResultado
    }

    setResultado(textoCriptografado)
  }

  function desencriptografar(){
    // const err = debug()
    // if (err === true) {return}
    const str = input
    const key = chave
    const chaveCompleta = gerarChaveCompleta(str, key)
    let textoDesencriptografado = ''

    for (let i = 0; i < str.length; i++) {
      const codStr = str[i].codePointAt(0) - 32
      const codKey = chaveCompleta[i].codePointAt(0) - 32
  
      const codResultado = (codStr - codKey + 224) % 224
  
      const strResultado = String.fromCharCode(codResultado + 32)

      textoDesencriptografado += strResultado
    }
    
    setResultado(textoDesencriptografado)
  }

  function debug(){
    let err = false
    if (!input){
      err = true
    }
    if (!chave){
      err = true
    }

    return err
  }

  function gerarChaveCompleta(string, key) {
    if (string.length <= key.length) {return key} // Se a chave for maior ou igual ao texto, é retornado a chave sem alteração.
    let chaveCompleta = ''
    for (let x = 0; chaveCompleta.length < string.length; x++) {
      if (x === key.length ) { x = 0 }
      chaveCompleta += key[x]
    }
    return chaveCompleta // Uma nova chave é gerada, para que fique do tamanho do texto. Para isso ela é repetida várias vezes.
  }

  function teste(event) {
    if (tema === 'light') {
      setTema('dark')
      document.documentElement.style.cssText = 
      '--background-color: #1F232D; --text-color: #FFFFFF; --background-color-output: #15171E77'
    }

    if (tema === 'dark') {
      setTema('light')
      document.documentElement.style.cssText = 
      '--background-color: #FFFFFF; --text-color: #2A2C2D; --background-color-output: #F1F1F1'
    }
  }

  return (
    <div className="container">
      <header>
        <img src={tema === 'light' ? light : dark} alt="logo" id="logo"/>

        <div className="tema">
          <h2>Tema - {tema === 'light' ? 'Claro' : 'Escuro'}</h2>
          <div className="switch-container">
            <input id="switch-shadow" className="switch switch--shadow" type="checkbox" onClick={teste}/>
            <label htmlFor="switch-shadow"></label>
          </div>
        </div>
      </header>

      <main>
        <div className="dados">
          <h1>Entrada</h1>
          <textarea 
            type="text" 
            value={input} 
            onChange={event => setInput(event.target.value)}
            className="input"
            autoFocus 
          />
        </div>

        <div className="key">
          <div className="chave">
            <h1>Chave</h1>
            <textarea 
              type="text" 
              maxLength="112" 
              value={chave}
              rows={linhas} 
              onChange={handleLines} 
              className="input"
            />
          </div>
          <div className="botoes">
            <button onClick={criptografar}>
                <img src={fechado} alt="Cadeado Aberto" className="icon"/>
                <span>Encriptar</span>
            </button>

            <button onClick={desencriptografar}>
                <img src={aberto} alt="Cadeado Aberto" className="icon"/>
                <span>Desencriptar</span>
            </button>
          </div>
        </div>

        <div className="dados">
          <h1>Saída</h1>
          <textarea id="output" type="text" disabled value={resultado} />
        </div>
        
      </main>
    </div>
  );
}

export default App;
