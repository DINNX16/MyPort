document.addEventListener('DOMContentLoaded', () => {
    const arrow = document.querySelector('.animated-arrow');
    const sections = document.querySelectorAll('.content-section'); // Seleciona todas as seções de conteúdo
    let currentSectionIndex = 0; // 0 = resume, 1 = portfolio (geral), 2 = uiux-portfolio, 3 = certifications

    // Função para mostrar uma seção específica e esconder as outras
    function showSection(index) {
        // Itera sobre todas as seções
        sections.forEach((sec, i) => {
            // Remove todas as classes de estado e animação de todas as seções
            sec.classList.remove('active', 'slide-in', 'slide-out', 'slide-out-left');
            
            // Gerencia a visibilidade/interação baseada no tamanho da tela
            if (window.innerWidth > 992) { // Comportamento para desktop (slide e overlay)
                sec.style.visibility = 'hidden';
                sec.style.opacity = '0';
                sec.style.pointerEvents = 'none';
            } else { // Comportamento para mobile (display none/block)
                sec.style.display = 'none';
            }
        });

        // Aplica as classes e estilos para a seção que DEVE SER ATIVA
        const activeSection = sections[index];
        activeSection.classList.add('active'); // Marca como ativa
        if (window.innerWidth > 992) { // Apenas para desktop
            activeSection.classList.add('slide-in'); // Inicia a animação de entrada (se aplicável)
            activeSection.style.visibility = 'visible';
            activeSection.style.opacity = '1';
            activeSection.style.pointerEvents = 'auto'; // Permite interação
        } else { // Para mobile
            activeSection.style.display = 'block'; // Torna visível
        }

        currentSectionIndex = index; // Atualiza o índice da seção atual

        // Atualiza a direção da seta
        if (currentSectionIndex === sections.length - 1) { // Se for a última seção, a seta vira para a esquerda (indicando ciclo)
            arrow.classList.add('left');
        } else { // Caso contrário, aponta para a direita
            arrow.classList.remove('left');
        }
    }

    // Event listener para o clique na seta
    arrow.addEventListener('click', () => {
        const prevSectionIndex = currentSectionIndex;
        let nextSectionIndex = currentSectionIndex + 1;
        if (nextSectionIndex >= sections.length) {
            nextSectionIndex = 0; // Volta para a primeira seção se chegar ao final do ciclo
        }

        const prevSection = sections[prevSectionIndex];
        
        // Adiciona classe 'slide-out' à seção anterior para a transição de saída (apenas no desktop)
        if (window.innerWidth > 992) {
             prevSection.classList.add('slide-out'); // Adiciona a classe para a animação de saída
             // Adicionar um pequeno delay para que a animação de saída seja visível
             // antes que a nova seção apareça. O showSection vai garantir a entrada.
             setTimeout(() => {
                showSection(nextSectionIndex);
             }, 550); // Ajustado para ser ligeiramente maior que a transição CSS (0.6s)
        } else {
            // Em mobile, sem animação de slide complexa, apenas alterna display imediatamente
            showSection(nextSectionIndex);
        }
    });

    // Estado inicial: Mostra a primeira seção (Resumo) quando a página carrega
    showSection(0);

    // Ajustar comportamento no redimensionamento para transição perfeita entre desktop/mobile
    window.addEventListener('resize', () => {
        // Redefine o estado para o comportamento adequado do desktop ou mobile
        // e então mostra a seção atual novamente.
        if (window.innerWidth <= 992) {
            // Comportamento para mobile: remove posicionamento absoluto e transições
            sections.forEach(sec => {
                sec.style.position = 'static';
                sec.style.transform = 'none';
                sec.style.visibility = 'visible';
                sec.style.opacity = '1';
                sec.style.pointerEvents = 'auto';
                sec.classList.remove('slide-in', 'slide-out', 'slide-out-left');
                // Assegura que apenas a seção ativa esteja visível no mobile
                if (sec !== sections[currentSectionIndex]) {
                    sec.style.display = 'none';
                } else {
                    sec.style.display = 'block';
                }
            });
            arrow.classList.remove('left'); // Reinicia a seta para mobile
        } else { // Comportamento para desktop: re-ativa posicionamento absoluto e transições
            sections.forEach(sec => {
                sec.style.position = 'absolute';
                // As classes e estilos de visibilidade/opacidade serão aplicados por showSection
            });
            // Reaplica o estado visual da seção atual no desktop para garantir a transição
            showSection(currentSectionIndex);
        }
    });
});