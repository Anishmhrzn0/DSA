function maximizeCapital(k, c, revenues, investments) {
    let capital = c;
    let used = new Array(revenues.length).fill(false);
    
    // Do k projects
    for (let project = 0; project < k; project++) {
        let bestIndex = -1;
        let bestRevenue = 0;
        
        // Find the best project we can afford
        for (let i = 0; i < revenues.length; i++) {
            if (!used[i] && investments[i] <= capital && revenues[i] > bestRevenue) {
                bestIndex = i;
                bestRevenue = revenues[i];
            }
        }
        
        // If we found a project, do it
        if (bestIndex !== -1) {
            capital += revenues[bestIndex];
            used[bestIndex] = true;
            console.log(`Project ${bestIndex}: investment=${investments[bestIndex]}, revenue=${revenues[bestIndex]}, new capital=${capital}`);
        } else {
            console.log("No more affordable projects");
            break;
        }
    }
    
    return capital;
}

// Test Example 1
console.log("=== Example 1 ===");
console.log("k=2, c=0, revenues=[2,5,8], investments=[0,2,3]");
let result1 = maximizeCapital(2, 0, [2, 5, 8], [0, 2, 3]);
console.log(`Final capital: ${result1}`);
console.log();

// Test Example 2
console.log("=== Example 2 ===");
console.log("k=3, c=1, revenues=[3,6,10], investments=[1,3,5]");
let result2 = maximizeCapital(3, 1, [3, 6, 10], [1, 3, 5]);
console.log(`Final capital: ${result2}`);   




function strongPinChecker(pin) {
    let changes = 0;
    
    // Check length
    if (pin.length < 6) {
        changes += 6 - pin.length;
    }
    if (pin.length > 20) {
        changes += pin.length - 20;
    }
    
    // Check missing character types
    let hasLower = /[a-z]/.test(pin);
    let hasUpper = /[A-Z]/.test(pin);
    let hasDigit = /[0-9]/.test(pin);
    
    let missing = 0;
    if (!hasLower) missing++;
    if (!hasUpper) missing++;
    if (!hasDigit) missing++;
    
    changes += missing;
    
    // Check for 3 repeating characters
    for (let i = 0; i < pin.length - 2; i++) {
        if (pin[i] === pin[i + 1] && pin[i + 1] === pin[i + 2]) {
            changes++;
            i += 2;
        }
    }
    
    return changes;
}

// 3 Test Examples
console.log(strongPinChecker("X1!"));      // Should be 3
console.log(strongPinChecker("123456"));   // Should be 2  
console.log(strongPinChecker("Aa1234!"));  // Should be 0




function countAnomalyPeriods(temperature_changes, low_threshold, high_threshold) {
    let count = 0;
    let n = temperature_changes.length;
    
    // Check all possible subarrays
    for (let start = 0; start < n; start++) {
        let sum = 0;
        for (let end = start; end < n; end++) {
            sum += temperature_changes[end];
            
            // Check if this subarray sum is within range
            if (sum >= low_threshold && sum <= high_threshold) {
                count++;
                console.log(`Day ${start} to Day ${end} → Total change = ${sum} ✅`);
            } else {
                console.log(`Day ${start} to Day ${end} → Total change = ${sum} ❌`);
            }
        }
    }
    
    return count;
}

// Test Example 1
console.log("=== Example 1 ===");
console.log("temperature_changes = [3, -1, -4, 6, 2]");
console.log("low_threshold = 2, high_threshold = 5");
let result3 = countAnomalyPeriods([3, -1, -4, 6, 2], 2, 5);
console.log(`Result: ${result3}`);
console.log("Expected: 3");
console.log();

// Test Example 2
console.log("=== Example 2 ===");
console.log("temperature_changes = [-2, 3, 1, -5, 4]");
console.log("low_threshold = -1, high_threshold = 2");
let result4 = countAnomalyPeriods([-2, 3, 1, -5, 4], -1, 2);
console.log(`Result: ${result4}`);
console.log("Expected: 4");





function solveCryptarithmetic(word1, word2, result) {
    // Get all unique letters
    const allLetters = [...new Set((word1 + word2 + result).split(''))];
    
    if (allLetters.length > 10) {
        return { valid: false, reason: "Too many unique letters (max 10)" };
    }
    
    // Letters that cannot be 0 (first letters of words)
    const noZeroLetters = new Set();
    if (word1.length > 1) noZeroLetters.add(word1[0]);
    if (word2.length > 1) noZeroLetters.add(word2[0]);
    if (result.length > 1) noZeroLetters.add(result[0]);
    
    console.log(`Solving: ${word1} + ${word2} = ${result}`);
    console.log(`Letters: ${allLetters.join(', ')}`);
    console.log(`Cannot be zero: ${[...noZeroLetters].join(', ') || 'none'}`);
    console.log();
    
    // Try all possible digit assignments
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    function backtrack(letterIndex, usedDigits, mapping) {
        if (letterIndex === allLetters.length) {
            // Check if this mapping satisfies the equation
            const num1 = wordToNumber(word1, mapping);
            const num2 = wordToNumber(word2, mapping);
            const numResult = wordToNumber(result, mapping);
            
            if (num1 + num2 === numResult) {
                return mapping;
            }
            return null;
        }
        
        const letter = allLetters[letterIndex];
        
        for (let digit of digits) {
            if (usedDigits.has(digit)) continue;
            if (digit === 0 && noZeroLetters.has(letter)) continue;
            
            usedDigits.add(digit);
            mapping[letter] = digit;
            
            const solution = backtrack(letterIndex + 1, usedDigits, mapping);
            if (solution) return solution;
            
            delete mapping[letter];
            usedDigits.delete(digit);
        }
        
        return null;
    }
    
    const solution = backtrack(0, new Set(), {});
    
    if (solution) {
        const num1 = wordToNumber(word1, solution);
        const num2 = wordToNumber(word2, solution);
        const numResult = wordToNumber(result, solution);
        
        return {
            valid: true,
            mapping: solution,
            calculation: {
                word1: num1,
                word2: num2,
                result: numResult,
                sum: num1 + num2
            }
        };
    } else {
        return { valid: false, reason: "No valid digit assignment found" };
    }
}

function wordToNumber(word, mapping) {
    let number = 0;
    for (let letter of word) {
        number = number * 10 + mapping[letter];
    }
    return number;
}

function displaySolution(word1, word2, result, solution) {
    console.log(`=== Solution for ${word1} + ${word2} = ${result} ===`);
    
    if (!solution.valid) {
        console.log(`❌ ${solution.reason}`);
        return;
    }
    
    console.log("✅ Valid equation found!");
    console.log();
    
    console.log("Letter to Digit Mapping:");
    const letters = Object.keys(solution.mapping).sort();
    for (let letter of letters) {
        console.log(`${letter} = ${solution.mapping[letter]}`);
    }
    console.log();
    
    console.log("Word to Number Conversion:");
    console.log(`"${word1}" → ${solution.calculation.word1}`);
    console.log(`"${word2}" → ${solution.calculation.word2}`);
    console.log(`"${result}" → ${solution.calculation.result}`);
    console.log();
    
    console.log("Verification:");
    console.log(`${solution.calculation.word1} + ${solution.calculation.word2} = ${solution.calculation.sum}`);
    console.log(`${solution.calculation.sum} ${solution.calculation.sum === solution.calculation.result ? '=' : '≠'} ${solution.calculation.result}`);
    console.log();
}

// Test the examples from the problem
console.log("=== Testing Examples ===");

// Example 1: STAR + MOON = NIGHT (should be valid)
let solution1 = solveCryptarithmetic("STAR", "MOON", "NIGHT");
displaySolution("STAR", "MOON", "NIGHT", solution1);

// Example 2: CODE + BUG = DEBUG (should be invalid)
let solution2 = solveCryptarithmetic("CODE", "BUG", "DEBUG");
displaySolution("CODE", "BUG", "DEBUG", solution2);

// Additional simple test
let solution3 = solveCryptarithmetic("AB", "CD", "EF");
displaySolution("AB", "CD", "EF", solution3);