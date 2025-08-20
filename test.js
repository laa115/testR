const { serialize, deserialize, calculateCompressionRatio } = require('./index');

// Тестовые функции
function testSerialization(name, arr) {
  console.log(`\n=== ${name} ===`);
  const serialized = serialize(arr);
  const deserialized = deserialize(serialized);
  const compression = calculateCompressionRatio(arr, serialized);
  
  console.log('Исходный массив:', arr.slice(0, 10).join(',') + (arr.length > 10 ? '...' : ''));
  console.log('Длина исходной строки:', compression.originalLength);
  console.log('Сжатая строка (первые 50 символов):', serialized.substring(0, 50) + (serialized.length > 50 ? '...' : ''));
  console.log('Длина сжатой строки:', compression.compressedLength);
  console.log('Коэффициент сжатия:', compression.ratio.toFixed(2));
  console.log('Корректность:', JSON.stringify(arr) === JSON.stringify(deserialized));
}

// Тестовые данные
// 1. Короткий массив
testSerialization('Короткий массив (5 чисел)', [1, 50, 99, 100, 300]);

// 2. Случайные массивы
function generateRandomArray(length, min = 1, max = 300) {
  return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

testSerialization('Случайные 50 чисел', generateRandomArray(50));
testSerialization('Случайные 100 чисел', generateRandomArray(100));
testSerialization('Случайные 500 чисел', generateRandomArray(500));
testSerialization('Случайные 1000 чисел', generateRandomArray(1000));

// 3. Граничные случаи
testSerialization('Все числа 1 знака (1-9)', Array.from({length: 9}, (_, i) => i + 1));
testSerialization('Все числа 2 знака (10-99)', Array.from({length: 90}, (_, i) => i + 10));
testSerialization('Все числа 3 знака (100-300)', Array.from({length: 201}, (_, i) => i + 100));

// 4. Каждого числа по 3 (900 чисел)
const allNumbers = [];
for (let i = 1; i <= 300; i++) {
  allNumbers.push(i, i, i);
}
testSerialization('Каждого числа по 3 (900 чисел)', allNumbers);