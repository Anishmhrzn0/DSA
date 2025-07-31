// Question 1 a
// function maximizeCapital(k, c, revenues, investments) {
//     let capital = c;
//     let used = new Array(revenues.length).fill(false);
    
//     // Do k projects
//     for (let project = 0; project < k; project++) {
//         let bestIndex = -1;
//         let bestRevenue = 0;
        
//         // Find the best project we can afford
//         for (let i = 0; i < revenues.length; i++) {
//             if (!used[i] && investments[i] <= capital && revenues[i] > bestRevenue) {
//                 bestIndex = i;
//                 bestRevenue = revenues[i];
//             }
//         }
        
//         // If we found a project, do it
//         if (bestIndex !== -1) {
//             capital += revenues[bestIndex];
//             used[bestIndex] = true;
//             console.log(`Project ${bestIndex}: investment=${investments[bestIndex]}, revenue=${revenues[bestIndex]}, new capital=${capital}`);
//         } else {
//             console.log("No more affordable projects");
//             break;
//         }
//     }
    
//     return capital;
// }

// // Test Example 1
// console.log("=== Example 1 ===");
// console.log("k=2, c=0, revenues=[2,5,8], investments=[0,2,3]");
// let result1 = maximizeCapital(2, 0, [2, 5, 8], [0, 2, 3]);
// console.log(`Final capital: ${result1}`);
// console.log();

// // Test Example 2
// console.log("=== Example 2 ===");
// console.log("k=3, c=1, revenues=[3,6,10], investments=[1,3,5]");
// let result2 = maximizeCapital(3, 1, [3, 6, 10], [1, 3, 5]);
// console.log(`Final capital: ${result2}`);   



// // Question 1 b
// function strongPinChecker(pin) {
//     let changes = 0;
    
//     // Check length
//     if (pin.length < 6) {
//         changes += 6 - pin.length;
//     }
//     if (pin.length > 20) {
//         changes += pin.length - 20;
//     }
    
//     // Check missing character types
//     let hasLower = /[a-z]/.test(pin);
//     let hasUpper = /[A-Z]/.test(pin);
//     let hasDigit = /[0-9]/.test(pin);
    
//     let missing = 0;
//     if (!hasLower) missing++;
//     if (!hasUpper) missing++;
//     if (!hasDigit) missing++;
    
//     changes += missing;
    
//     // Check for 3 repeating characters
//     for (let i = 0; i < pin.length - 2; i++) {
//         if (pin[i] === pin[i + 1] && pin[i + 1] === pin[i + 2]) {
//             changes++;
//             i += 2;
//         }
//     }
    
//     return changes;
// }

// // 3 Test Examples
// console.log(strongPinChecker("X1!"));      // Should be 3
// console.log(strongPinChecker("123456"));   // Should be 2  
// console.log(strongPinChecker("Aa1234!"));  // Should be 0



// // Question 2 a
// function countAnomalyPeriods(temps, low, high) {
//     let count = 0;
    
//     for (let i = 0; i < temps.length; i++) {
//         let sum = 0;
//         for (let j = i; j < temps.length; j++) {
//             sum += temps[j];
//             if (sum >= low && sum <= high) {
//                 count++;
//             }
//         }
//     }
    
//     return count;
// }

// // Example 1
// console.log(countAnomalyPeriods([3, -1, -4, 6, 2], 2, 5));

// // Example 2  
// console.log(countAnomalyPeriods([-2, 3, 1, -5, 4], -1, 2));
