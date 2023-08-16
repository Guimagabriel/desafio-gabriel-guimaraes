import { inArray, getProdutos } from "./utils/helper.js";

class CaixaDaLanchonete {

    constructor() {
        this.mensagemFinal = '';
    }

    /**
     * Método para calcular os descontos
     * 
     * @param {String} metodoDePagamento 
     * @param {Float} valor 
     * 
     * @returns {String|Float}
     */
    calcularDesconto(metodoDePagamento, valor)
    {

        switch(metodoDePagamento)
        {
            case 'dinheiro':
                valor *= 0.95;
            break;

            case 'credito':
                valor *= 1.03;
            break;

            case 'debito':
            break;

            default:
                return this.mensagemFinal = "Forma de pagamento inválida!";
        }

        return valor ? valor.toFixed(2).replace('.', ',') : 0;
    }

    /**
     * Método para verificar se o item extra acompanha o item principal
     * 
     * @param {String} itemExtra 
     * @param {String} itemPrincipal
     * @param {Array} itens
     * 
     * @returns {String}
     */
    isItemExtraValido(itemExtra, itemPrincipal, itens)
    {
        return (inArray(itemExtra, itens) && !inArray(itemPrincipal, itens));
    }

    /**
     * Método para verificar itens do carrinho
     * 
     * @param {Array} itens 
     * 
     * @returns {Bool}
     */
    verificarItens(itens)
    {     
        if (!itens.length) {
            this.mensagemFinal = "Não há itens no carrinho de compra!";
            return false;
        }

        for (let i=0; i<itens.length; i++) {
            if (this.isItemExtraValido('chantily', 'cafe', itens) ||
                this.isItemExtraValido('queijo', 'sanduiche', itens)
            ) {
                this.mensagemFinal = "Item extra não pode ser pedido sem o principal";
                return false;
            }
        }
        return true;
    }

    /**
     * Método para retornar o valor total do item
     * 
     * @param {String} codigo
     * 
     * @returns {String}
     */
    getValorPorCodigo(codigo) {
        const produtos = getProdutos();
        var valorTotal = 0;

        for (let i=0; i<produtos.length; i++) {
            if(produtos[i].codigo === codigo) {
                valorTotal += produtos[i].valor;
            }
        }

        if (valorTotal === 0) {
            return this.mensagemFinal = "Item inválido!";
        }

        return valorTotal;
    }

    /**
     * Método para validar o valor da compra
     * 
     * @param {Array} itens 
     * 
     * @returns {String}
     */
    validarValorDaCompra(itens)
    {
        let arrayCodigos = [];

        for (let i=0; i<itens.length; i++) {
            let itensSeparados = itens[i].split(',');
            if (itensSeparados[1] <= 0) {
                return this.mensagemFinal = "Quantidade inválida!";
            }
            arrayCodigos[i] = itensSeparados[0];
        }

        if (!this.verificarItens(arrayCodigos)) {
            return this.mensagemFinal;
        }
    }

    /**
     * Método para calcular e retonar o total da compra
     * 
     * @param {String} metodoDePagamento 
     * @param {Array} itens 
     * 
     * @returns {String}
     */
    calcularTotal(metodoDePagamento, itens)
    {
        let valorTotal = 0;

        for (let i=0; i<itens.length; i++) {
            let itemCarrinho = itens[i].split(',');
            valorTotal += this.getValorPorCodigo(itemCarrinho[0]) * itemCarrinho[1];
        }

        return this.calcularDesconto(metodoDePagamento, valorTotal);
    }

    /**
     * Método para calcular o valor da compra
     * 
     * @param {String} metodoDePagamento 
     * @param {Array} itens
     *  
     * @returns {String}
     */
    calcularValorDaCompra(metodoDePagamento, itens)
    {    
        this.validarValorDaCompra(itens);
        let valorFinal = this.calcularTotal(metodoDePagamento, itens);
        
        if (valorFinal && !this.mensagemFinal) {
            return this.mensagemFinal = "R$ " + valorFinal;
        }

        return this.mensagemFinal;
    }
}

export { CaixaDaLanchonete };
