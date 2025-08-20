function serialize(arr) {
  let result = '';
  
  for (const num of arr) {
      if (num <= 99) {
          // Числа 1-99 кодируем одним символом (48-147 в ASCII)
          result += String.fromCharCode(num + 47);
      } else {
          // Числа 100-300 кодируем двумя символами
          // Первый символ: 252-254 для сотен (252 = 100-199, 253 = 200-299, 254 = 300)
          // Второй символ: 0-99 (48-147 в ASCII)
          const hundreds = Math.floor((num - 100) / 100);
          const remainder = (num - 100) % 100;
          result += String.fromCharCode(252 + hundreds) + 
                   String.fromCharCode(remainder + 47);
      }
  }
  
  return result;
}

function deserialize(str) {
  const result = [];
  let i = 0;
  
  while (i < str.length) {
      const charCode = str.charCodeAt(i);
      
      if (charCode >= 252 && charCode <= 254) {
          // Это трехзначное число
          const hundreds = (charCode - 252) * 100;
          const remainder = str.charCodeAt(i + 1) - 47;
          result.push(100 + hundreds + remainder);
          i += 2;
      } else {
          // Это однозначное или двузначное число
          result.push(charCode - 47);
          i += 1;
      }
  }
  
  return result;
}

// Вспомогательная функция для расчета коэффициента сжатия
function calculateCompressionRatio(original, compressed) {
  const originalLength = original.join(',').length;
  const compressedLength = compressed.length;
  return {
      originalLength,
      compressedLength,
      ratio: originalLength / compressedLength
  };
}

module.exports = {
    serialize,
    deserialize,
    calculateCompressionRatio
};