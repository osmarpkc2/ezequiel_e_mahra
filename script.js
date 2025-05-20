// Função para abrir o modal e exibir a imagem
function abrirModal(imgElement) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('imagemModal');
    
    modal.style.display = 'flex'; // Exibe o modal
    modalImg.src = imgElement.src; // Coloca a imagem no modal
  }
  
  // Função para fechar o modal
  function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // Oculta o modal
  }
  
  function atualizarContador() {
    const inicioRelacionamento = new Date("2025-01-01T00:00:00"); // substitua pela data correta
    const agora = new Date();
  
    let anos = agora.getFullYear() - inicioRelacionamento.getFullYear();
    let meses = agora.getMonth() - inicioRelacionamento.getMonth();
    let dias = agora.getDate() - inicioRelacionamento.getDate();
    let horas = agora.getHours() - inicioRelacionamento.getHours();
    let minutos = agora.getMinutes() - inicioRelacionamento.getMinutes();
    let segundos = agora.getSeconds() - inicioRelacionamento.getSeconds();
  
    if (segundos < 0) {
      segundos += 60;
      minutos--;
    }
    if (minutos < 0) {
      minutos += 60;
      horas--;
    }
    if (horas < 0) {
      horas += 24;
      dias--;
    }
    if (dias < 0) {
      const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0);
      dias += ultimoMes.getDate();
      meses--;
    }
    if (meses < 0) {
      meses += 12;
      anos--;
    }
  
    document.getElementById("tempo").textContent =
      `${anos} A, ${meses} M, ${dias} D, ${horas}h ${minutos}min ${segundos}s`;
  }
  
  setInterval(atualizarContador, 1000);
  