import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Swal from 'sweetalert2'


const Home = () => {

    const [activate, setActivate] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [FPmatriz, setFPmatriz] = useState([['1', '1'], ['1', '1'], ['1', '1'], ['1', '1']]);
    const [bits2n, setbits2n] = useState([]);
    const [posiciones, setPosiciones] = useState([]);
    const [final, setFinal] = useState([]);


    const onChangeMensaje = (e) => {

        let msg = e.target.value
        let isBinario = true

        for (const letra of msg) {
            if (!(letra === '1' || letra === '0')) {
                isBinario = false
            }
        }

        if (isBinario) {
            setMensaje(e.target.value)
        }

    }

    const codificar = () => {
        let msg = mensaje

        // pasamos el mensaje de string a vector
        msg = msg.split('')
        msg.push('final')

        // cuenta de bits a agregar (2^n)
        let n = 0;
        let trama = []
        let cuenta = 1
        let pos = 0
        let boolean = true

        while (boolean) {
            if (msg[pos] === 'final') {
                boolean = false
            } else {
                if (Math.pow(2, n) === cuenta) {
                    trama[cuenta] = 'P' + (n+1)
                    n++
                } else {  
                    trama[cuenta] = msg[pos]
                    pos++
                }
                cuenta++
            }
        }

        trama.shift()

        let numeros = []

        for (let i = 0; i < trama.length; i++) {
            
            numeros[i] = i + 1

        }

        let FP = []

        for (let i = 0; i < n; i++) {
            FP[i] = new Array(0)
        }


        for (let i = 0; i < n; i++) {
            cuenta = 0
            for (let j = Math.pow(2, i) - 1; j < trama.length; j++) {
                if (cuenta < Math.pow(2, i)) {
                    FP[i][j] = trama[j]
                    cuenta++
                } else {
                    FP[i][j] = '-'

                    if (cuenta > Math.pow(2, i) - 2 + Math.pow(2, i)) {
                        cuenta = 0
                    } else {
                        cuenta++
                    }
                }
            }
        }

        for (let i = 0; i < FP.length; i++) {
            for (let j = 0; j < FP[0].length; j++) {
                if (FP[i][j] === undefined) {
                    FP[i][j] = '-'
                }
            }
        }

        let agregados = []

        for (let i = 0; i < n; i++) {
            cuenta = 0
            for (let j = 0; j < FP[0].length; j++) {
                if (FP[i][j] === '1') {
                    cuenta++
                }
            }

            if (cuenta % 2 === 0) {
                agregados.push(0)
            } else {
                agregados.push(1)
            }
        }

        for (let i = 0; i < n; i++) {

            FP[i].unshift('FP' + (Math.pow(2,i)))

        }

        let tramaFinal = []

        cuenta = 0
        for (let i = 0; i < trama.length; i++) {
            if (!(trama[i] === '0' || trama[i] === '1')) {
                tramaFinal[i] = agregados[cuenta] + ''
                cuenta++
            } else {
                tramaFinal[i] = trama[i]
            }
        }

        console.log(FP)
        setFPmatriz(FP)

        console.log(agregados)

        console.log(trama)
        setbits2n(trama)

        console.log(tramaFinal)
        setFinal(tramaFinal)

        setPosiciones(numeros)

        setActivate(true)

    }

    return (
        <div className="container">

            <Head>
                <title>Codificación Hamming</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>CODIFICACIÓN HAMMING</h1>

            <div className="content">

                <main>
                    <label>
                        Ingrese la trama a codificar: <br /><br />
                        <input type="text" onChange={onChangeMensaje} value={mensaje} />
                    </label>

                    <button onClick={codificar}>Codificar</button>
                </main>

                {
                    activate
                        ?
                        <main>
                            <div>
                                <p>Trama con bits en 2n</p>
                                <br/>
                                <div className="matriz">
                                    <p>
                                        <span className="sinCuadro"></span>
                                        {
                                            posiciones.map(pos => (
                                                <span className="sinCuadro">{pos}</span>
                                            ))
                                        }
                                    </p>
                                    <p>
                                        <span className="sinCuadro"></span>
                                        {
                                            bits2n.map(bit => (
                                                <span className="cuadro">{bit}</span>
                                            ))
                                        }
                                    </p>
                                    <br />
                                    {
                                        FPmatriz.map(fila => (
                                            <p>
                                                {
                                                    fila.map(bit => (
                                                        <span className="cuadro">{bit}</span>
                                                    ))
                                                }
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        </main>
                        :
                        ''
                }

                {
                    activate
                        ?
                        <main style={{ gridColumn: '1/3' }}>
                            <div>
                                <p>Trama Final</p>
                                <div className="matriz">
                                    <p>
                                        {
                                            posiciones.map(pos => (
                                                <span className="sinCuadro">{pos}</span>
                                            ))
                                        }
                                    </p>
                                    <p>
                                        {
                                            bits2n.map(bit => (
                                                <span className="cuadro">{bit}</span>
                                            ))
                                        }
                                    </p>
                                    <p>
                                        {
                                            final.map(bit => (
                                                <span className="cuadro">{bit}</span>
                                            ))
                                        }
                                    </p>

                                </div>
                            </div>      
                        </main>
                        :
                        ''
                }

            </div>


            <Footer />

            <style jsx>{`

                .cuadro {
                    display: inline-block;
                    border: 1px solid white;
                    width: 22px;
                    height: 22px;
                }

                .sinCuadro {
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                }

                .matriz {
                    displya: grid;
                }

                h1 {
                    color: white;
                    text-align: center;
                }

                .content {
                    display: grid; 
                    grid-template-columns: ${ activate ? '1fr 1fr' : '1fr'};
                }

                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                label {
                    display: grid;
                    justify-items: center;
                    color: white;
                }

                span {
                    font-size: 12px;
                }

                input {
                    height: 30px;
                    border-radius: 20px;
                    border: 1px solid #33333344;
                    padding: 10px;
                    outline: none;
                    text-align: center;
                }

                select {
                    padding: 0px 10px;
                }

                main {
                    padding: 5rem 0;
                    display: grid;
                    align-items: center;
                    justify-items: center;
                    border-radius: 30px;
                    margin: 10px;
                    padding: 30px;
                    background: #2C3E5044;
                }

                main > div {
                    color: white;
                    text-align: center;
                }

                :globla(body) {
                    background: linear-gradient(180deg, #bdc3c7 0%, #3B4371 100%);
                }

                p {
                    color: white;
                    margin: 0;
                }

                button {
                    border: none;
                    padding: 10px 30px;
                    border-radius: 30px;
                    background-color: #528B90;
                    color: white;
                    cursor: pointer;
                    transition: background-color 1s;
                    outline: none;
                    margin: 16px 0;
                }

                button:hover {
                    background-color: #51A8A7;
                }

            `}</style>

            <style jsx global>{`

              html, body {
                  padding: 0;
                  margin: 0;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                  Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              }

              * {
                  box-sizing: border-box;
              }

      `}</style>

        </div>
    )
}

export default Home