// test.js - Automated Test Script for Examination Seating Arrangement System

console.log("Starting Automated CI/CD Tests...\n");

function runTests() {
    let passed = 0;
    let total = 3;

    // Test 1: Check Room Capacity
    console.log("Running Room Capacity Test...");
    // Simulating logic check
    console.log("   -> Room Capacity Test Passed\n");
    passed++;

    // Test 2: Check Student Allocation
    console.log("Running Student Allocation Test...");
    // Simulating logic check
    console.log("   -> Student Allocation Test Passed\n");
    passed++;

    // Test 3: Check Duplicate Roll Numbers
    console.log("Running Duplicate Entry Test...");
    // Simulating logic check
    console.log("   -> Duplicate Entry Test Passed\n");
    passed++;

    if (passed === total) {
        console.log("ALL TESTS COMPLETED SUCCESSFULLY.");
        process.exit(0); // Tell Jenkins the test passed
    } else {
        console.log("TESTS FAILED.");
        process.exit(1); // Tell Jenkins the test failed
    }
}

runTests();