class Cipher {
    criptografar(texto, chave) {
        const chaveCompleta = gerarChaveCompleta(texto, chave)
        let textoCriptografado = ''
    
        for (let i = 0; i < texto.length; i++) { 
            const codStr = texto[i].codePointAt(0) - 32
            const codKey = chaveCompleta[i].codePointAt(0) - 32
    
            const codResultado = (codStr + codKey) % 224
    
            const strResultado = String.fromCharCode(codResultado + 32)
    
            textoCriptografado += strResultado
        }

        return textoCriptografado
    }

    desencriptografar(texto, chave) {
        const chaveCompleta = gerarChaveCompleta(texto, chave)
        let textoDesencriptografado = ''
    
        for (let i = 0; i < texto.length; i++) {
            const codStr = texto[i].codePointAt(0) - 32
            const codKey = chaveCompleta[i].codePointAt(0) - 32
    
            const codResultado = (codStr - codKey + 224) % 224
    
            const strResultado = String.fromCharCode(codResultado + 32)
    
            textoDesencriptografado += strResultado
        }
    
        textoDesencriptografado = textoDesencriptografado.replace(/ê/g, '\n')
    
        return textoDesencriptografado
    }
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

export default Cipher