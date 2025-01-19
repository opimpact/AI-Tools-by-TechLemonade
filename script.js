document.addEventListener('DOMContentLoaded', function() {
    // URL temporária - vamos alterar depois
    const backendUrl = 'URL_DO_BACKEND';

    async function carregarDados() {
        try {
            const response = await fetch(backendUrl);
            const dados = await response.json();
            
            criarTabela(dados);
        } catch (erro) {
            console.error('Erro ao carregar dados:', erro);
            document.getElementById('tabela-container').innerHTML = 
                '<p>Erro ao carregar os dados. Por favor, tente novamente mais tarde.</p>';
        }
    }

    function criarTabela(dados) {
        const container = document.getElementById('tabela-container');
        
        if (!dados || dados.length === 0) {
            container.innerHTML = '<p>Nenhum dado encontrado.</p>';
            return;
        }

        const tabela = document.createElement('table');
        
        // Criar cabeçalho
        const thead = document.createElement('thead');
        const cabecalho = document.createElement('tr');
        Object.keys(dados[0]).forEach(chave => {
            const th = document.createElement('th');
            th.textContent = chave;
            cabecalho.appendChild(th);
        });
        thead.appendChild(cabecalho);
        tabela.appendChild(thead);

        // Criar corpo da tabela
        const tbody = document.createElement('tbody');
        dados.forEach(linha => {
            const tr = document.createElement('tr');
            Object.values(linha).forEach(valor => {
                const td = document.createElement('td');
                td.textContent = valor;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        tabela.appendChild(tbody);

        container.innerHTML = '';
        container.appendChild(tabela);
    }

    // Carregar dados quando a página carregar
    carregarDados();
});
