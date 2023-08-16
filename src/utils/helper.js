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
          "code": "cafe",
          "description": "Café",
          "value": 3.00
      },
      {
          "code": "chantily",
          "description": "Chantily (extra do Café)",
          "value": 1.50 

      },
      {
          "code": "suco",
          "description": "Suco Natural",
          "value": 6.20
      },
      {
          "code": "sanduiche",
          "description": "Sanduíche",
          "value": 6.50
      },
      {
          "code": "queijo",
          "description": "Queijo (extra do Sanduíche)",
          "value": 2.00
      },
      {
          "code": "salgado",
          "description": "Salgado",
          "value": 7.25
      },
      {
          "code": "combo1",
          "description": "1 Suco e 1 Sanduíche",
          "value": 9.50
      },
      {
          "code": "combo2",
          "description": "1 Café e 1 Sanduíche",
          "value": 7.50
      }            
  ];
}
