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