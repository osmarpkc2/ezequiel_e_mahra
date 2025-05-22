let videoOriginal = null;

// Função para abrir o modal e exibir a imagem ou vídeo
function abrirModal(element) {
  const modal = document.getElementById('modal');
  
  modal.innerHTML = '';

  const btnFechar = document.createElement('button');
  btnFechar.classList.add('fechar');
  btnFechar.innerHTML = '&times;';
  btnFechar.onclick = fecharModal;
  modal.appendChild(btnFechar);

  let conteudoModal;

  if (element.tagName === 'IMG') {
    videoOriginal = null;
    conteudoModal = document.createElement('img');
    conteudoModal.src = element.src;
    conteudoModal.alt = element.alt || '';
  } else if (element.tagName === 'VIDEO') {
    videoOriginal = element;
    videoOriginal.pause();
    videoOriginal.removeAttribute('controls');

    conteudoModal = document.createElement('video');
    conteudoModal.src = element.currentSrc || element.src;
    conteudoModal.controls = true;
    conteudoModal.autoplay = true;
    conteudoModal.loop = false;
  } else {
    return;
  }

  conteudoModal.classList.add('modal-conteudo');
  modal.appendChild(conteudoModal);

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  const modal = document.getElementById('modal');

  const videoNoModal = modal.querySelector('video');
  if (videoNoModal) {
    videoNoModal.pause();
    videoNoModal.src = '';
    videoNoModal.load();
  }

  modal.classList.remove('show');
  modal.innerHTML = '';
  document.body.style.overflow = '';

  if (videoOriginal) {
    videoOriginal.setAttribute('controls', '');
  }
}

window.addEventListener('load', () => {
  const galeria = document.querySelector('.galeria');
  if (!galeria) return;

  galeria.querySelectorAll('img, video').forEach(element => {
    element.style.cursor = 'pointer';

    if (element.tagName === 'VIDEO') {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        abrirModal(element);
      });
    } else {
      element.addEventListener('click', () => abrirModal(element));
    }
  });

  iniciarContador();
});

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    fecharModal();
  }
});

// Função do contador com anos, meses, dias, etc.
function iniciarContador() {
  const tempoElemento = document.getElementById('tempo');
  if (!tempoElemento) return;

  const dataInicio = new Date('2022-06-12T00:00:00');

  function atualizarContador() {
    const agora = new Date();
    if (agora < dataInicio) {
      tempoElemento.textContent = 'Ainda não começamos juntos!';
      return;
    }

    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();

    if (dias < 0) {
      meses--;
      const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
      dias += mesAnterior.getDate();
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    const horaDiff = agora.getHours() - dataInicio.getHours();
    const minDiff = agora.getMinutes() - dataInicio.getMinutes();
    const segDiff = agora.getSeconds() - dataInicio.getSeconds();

    const horas = (horaDiff + 24) % 24;
    const minutos = (minDiff + 60) % 60;
    const segundos = (segDiff + 60) % 60;

    tempoElemento.textContent = 
      `${anos} anos, ${meses} meses, ${dias} dias, ` +
      `${horas}h ${minutos}m ${segundos}s`;
  }

  atualizarContador();
  setInterval(atualizarContador, 1000);
}

// Botão voltar ao topo (caso exista)
const btnVoltarTopo = document.getElementById('voltar-topo');
if (btnVoltarTopo) {
  btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
