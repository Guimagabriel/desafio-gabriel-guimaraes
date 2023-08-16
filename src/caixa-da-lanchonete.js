import { inArray, getProdutos } from "./utils/helper.js";

class CaixaDaLanchonete {

    constructor() {
        this.finalMessage = '';
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
                return this.finalMessage = "Forma de pagamento inválida!";
        }

        return valor ? valor.toFixed(2).replace('.', ',') : 0;
    }

    /**
     * Método para verificar se o item extra acompanha o item principal
     * 
     * @param {String} extraItem 
     * @param {String} principalItem
     * @param {Array} itens
     * 
     * @returns {String}
     */
    isExtraItemInvalid(extraItem, principalItem, itens)
    {
        return (inArray(extraItem, itens) && !inArray(principalItem, itens));
    }

    /**
     * Método para verificar itens do carrinho
     * 
     * @param {Array} itens 
     * 
     * @returns {Bool}
     */
    verifyItens(itens)
    {     
        if (!itens.length) {
            this.finalMessage = "Não há itens no carrinho de compra!";
            return false;
        }

        for (let i=0; i<itens.length; i++) {
            if (this.isExtraItemInvalid('chantily', 'cafe', itens) ||
                this.isExtraItemInvalid('queijo', 'sanduiche', itens)
            ) {
                this.finalMessage = "Item extra não pode ser pedido sem o principal";
                return false;
            }
        }
        return true;
    }

    /**
     * Método para retornar o valor total do item
     * 
     * @param {String} code
     * 
     * @returns {String}
     */
    getValueByCode(code) {
        const produtos = getProdutos();
        var valorTotal = 0;

        for (let i=0; i<produtos.length; i++) {
            if(produtos[i].code === code) {
                valorTotal += produtos[i].value;
            }
        }

        if (valorTotal === 0) {
            return this.finalMessage = "Item inválido!";
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
        let codesArray = [];

        for (let i=0; i<itens.length; i++) {
            let separetedItens = itens[i].split(',');
            if (separetedItens[1] <= 0) {
                return this.finalMessage = "Quantidade inválida!";
            }
            codesArray[i] = separetedItens[0];
        }

        if (!this.verifyItens(codesArray)) {
            return this.finalMessage;
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
    calcularTotalDaCompra(metodoDePagamento, itens)
    {
        let valorTotal = 0;

        for (let i=0; i<itens.length; i++) {
            let cartItem = itens[i].split(',');
            valorTotal += this.getValueByCode(cartItem[0]) * cartItem[1];
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
        let valorFinal = this.calcularTotalDaCompra(metodoDePagamento, itens);
        
        if (valorFinal && !this.finalMessage) {
            return this.finalMessage = "R$ " + valorFinal;
        }

        return this.finalMessage;
    }
}

export { CaixaDaLanchonete };
