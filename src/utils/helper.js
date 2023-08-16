/**
 * Método para verificar se um item pertence ao array
 * 
 * @param {String} needle 
 * @param {Array} haystack
 * 
 * @returns {Bool}
 */
export function inArray(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
    if(haystack[i] == needle) return true;
  }
  return false;
}

/**
 * Método para retornar os produtos
 * 
 * @returns {Array}
 */
export function getProdutos()
{
    return [
      {
          "codigo": "cafe",
          "descricao": "Café",
          "valor": 3.00
      },
      {
          "codigo": "chantily",
          "descricao": "Chantily (extra do Café)",
          "valor": 1.50 

      },
      {
          "codigo": "suco",
          "descricao": "Suco Natural",
          "valor": 6.20
      },
      {
          "codigo": "sanduiche",
          "descricao": "Sanduíche",
          "valor": 6.50
      },
      {
          "codigo": "queijo",
          "descricao": "Queijo (extra do Sanduíche)",
          "valor": 2.00
      },
      {
          "codigo": "salgado",
          "descricao": "Salgado",
          "valor": 7.25
      },
      {
          "codigo": "combo1",
          "descricao": "1 Suco e 1 Sanduíche",
          "valor": 9.50
      },
      {
          "codigo": "combo2",
          "descricao": "1 Café e 1 Sanduíche",
          "valor": 7.50
      }            
  ];
}
