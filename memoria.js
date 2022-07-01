//imagens das cartas
let imagens = [];
for (let i = 0; i <= 8; i++) {
    imagens.push(`imagensCartas/img${i}.jpg`);
}
let fundo = 'imagensCartas/fundo.jpg';

//Estado do jogo
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;


onload = () => {

    //carrega as imagens de Fundo
    let elemntoImagens = document.querySelectorAll('#memoria img');
    elemntoImagens.forEach(
        (img, i) => {
            img.src = fundo;
            img.setAttribute('data-valor', i)
        });

    //cria o evento do botao de inicio
    document.querySelector('#btInicio').onclick = iniciaJogo
};


//----------------------------------//
//INICIA JOGO
//---------------------------------//

const iniciaJogo = () => {

    //embaralhar as cartas
    for (let i = 0; i < cartas.length; i++) {
        let p = Math.trunc(Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;

    }
    console.log(cartas);

    //Associar evento as imagens
    let elemntoImagens = document.querySelectorAll('#memoria img');
    elemntoImagens.forEach(
        (img, i) => {
            img.onclick = tratarCliqueImagem;
            img.style.opacity = 1;
            img.src = fundo;
        });
    //REDEFINIR ESTADO DO JOGO
    cliquesTravados = false;
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
    pontos = 0;

    //BLOQUEAR BOTAO NO INICIO
    document.querySelector('#btInicio').disabled = true;
};

//----------------------------------//
//PROCESSA O CLQUE NA iMAGEM
//---------------------------------//
const tratarCliqueImagem = (e) => {
    if (cliquesTravados) return;
    const posicao = +e.target.getAttribute('data-valor');
    const valor = cartas[posicao];
    e.target.src = imagens[valor - 1];
    e.target.onclick = null;

    if (!temCartaVirada) {
        temCartaVirada = true;
        posicaoCartaVirada = posicao;
        valorCartaVirada = valor;
    }
    else {
        console.log(`valo1 = ${valor} e valor 2 =${valorCartaVirada}`);
        if (valor == valorCartaVirada) {
            //pontos
            pontos++
            console.log(pontos);
            if (pontos == 8) {
                document.querySelector('#btInicio').disabled = false;
            }
        }
        else {
            const p0 = posicaoCartaVirada
            //tempo para desvirar cartas
            cliquesTravados = true;
            setTimeout(() => {
                e.target.src = fundo;
                e.target.onclick = tratarCliqueImagem;
                let img = document.querySelector('#memoria #i' + p0);
                img.src = fundo
                img.onclick = tratarCliqueImagem;
                cliquesTravados = false;
            }, 1000)
        }
        temCartaVirada = false;
        posicaoCartaVirada - 1;
        valorCartaVirada = 0;
        
        
    }




    //fechar cartas



    
}