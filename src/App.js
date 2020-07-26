import React, { useState, useEffect } from 'react';
import './App.css';
import fechado from './assets/fechado.svg'
import aberto from './assets/aberto.svg'
import light from './assets/light-logo.svg'
import dark from './assets/dark-logo.svg'

import { Switch, FormGroup, FormControlLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import Configs from './config/configs' // Configurações de idioma e tema

import Cipher from './algorithms/VigenereCipher'
const { criptografar, desencriptografar } = new Cipher()

function App() {

  const [linhas, setLinhas] = useState('1') // Criar input de chave que aumenta conforme o numero de linhas
  const [input, setInput] = useState('')
  const [chave, setChave] = useState('')
  const [resultado, setResultado] = useState('')
  const [config, setConfig] = useState({tema: 'claro', palavras: Configs.configPt})
  const [idioma, setIdioma] = useState(false)
  const [tema, setTema] = useState(false)
  const [alertBox, setAlertBox] = useState('none')
  
  useEffect(() => {
    const localTema = localStorage.getItem('tema')
    const localIdioma = localStorage.getItem('idioma')
    const obj = {tema: 'claro', palavras: Configs.configPt}

    if (localTema === 'escuro') {
      obj.tema = 'escuro'
      obj.palavras.temaColor = obj.palavras.temaColor.reverse()
      document.documentElement.style.cssText = Configs.configEscuro
      setTema(true)
    }

    if (localIdioma === 'en') {
      obj.palavras = Configs.configEn
      setIdioma(true)

      if (localTema === 'escuro') {
        obj.palavras.temaColor = obj.palavras.temaColor.reverse()
      }
    }

    setConfig(obj)
  }, [])

  function handleLines(event) {
    const textarea = event.target.scrollHeight
    const lines = Math.trunc(textarea /  21)
    setLinhas(lines)
    setChave(event.target.value)
  }

  function criptografarButton(){
    const err = debug()
    if (err === true) {
      setAlertBox('flex')
      return
    }

    const textoCriptografado = criptografar(input, chave)
    setResultado(textoCriptografado)
  }

  function desencriptografarButton(){
    const err = debug()
    if (err === true) {
      setAlertBox('flex')
      return
    }

    const textoDesencriptografado = desencriptografar(input, chave)  
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

  function temaConfig(event) {
    if (event.target.value === 'true') {
      localStorage.setItem('tema', 'claro')

      const obj = config
      obj.tema = 'claro'
      obj.temaColor = obj.palavras.temaColor.reverse()
      document.documentElement.style.cssText = Configs.configClaro
      setConfig(obj)
      setTema(false)
    } else {
      localStorage.setItem('tema', 'escuro')

      const obj = config
      obj.tema = 'escuro'
      obj.temaColor = obj.palavras.temaColor.reverse()
      document.documentElement.style.cssText = Configs.configEscuro
      setConfig(obj)
      setTema(true)
    }
  }

  function idiomaConfig(event) {
    if (event.target.value === 'true') {
      localStorage.setItem('idioma', 'pt')

      const obj = config
      obj.palavras = Configs.configPt

      if (tema === true) {
        obj.palavras.temaColor = ['Escuro', 'Claro']
      }

      if (tema === false) {
        obj.palavras.temaColor = ['Claro', 'Escuro']
      }

      setConfig(obj)
      setIdioma(false)
    } else {
      localStorage.setItem('idioma', 'en')

      const obj = config
      obj.palavras = Configs.configEn

      if (tema === true) {
        obj.palavras.temaColor = ['Dark', 'Light']
      }

      if (tema === false) {
        obj.palavras.temaColor = ['Light', 'Dark']
      }

      setConfig(obj)
      setIdioma(true)
    }
  }

  return (
    <div className="container">
      <header>
        <img src={config.tema === 'claro' ? light : dark} alt="logo" id="logo"/>

        <Alert 
          severity="error" 
          onClose={() => setAlertBox('none')}
          style={{display: alertBox}}
          >{config.palavras.alert}</Alert>

        <div className="tema">
          <FormGroup>
            <FormControlLabel
              control={<Switch color="primary" checked={tema} value={tema} onChange={temaConfig} />}
              label={`${config.palavras.tema} - ${config.palavras.temaColor[0]}`}
            />
            <FormControlLabel
              control={<Switch color="primary" checked={idioma} value={idioma} onChange={idiomaConfig} />}
              label={config.palavras.idioma}
            />
          </FormGroup>
        </div>
      </header>

      <main>
        <div className="dados">
          <h1>{config.palavras.entrada}</h1>
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
            <h1>{config.palavras.chave}</h1>
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
            <button onClick={criptografarButton}>
                <img src={fechado} alt="Cadeado Aberto" className="icon"/>
                <span>{config.palavras.encriptar}</span>
            </button>

            <button onClick={desencriptografarButton}>
                <img src={aberto} alt="Cadeado Aberto" className="icon"/>
                <span>{config.palavras.desencriptar}</span>
            </button>
          </div>
        </div>

        <div className="dados">
          <h1>{config.palavras.saida}</h1>
          <textarea id="output" type="text" disabled value={resultado} />
        </div>
        
      </main>
    </div>
  );
}

export default App;
