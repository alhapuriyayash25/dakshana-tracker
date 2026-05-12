import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBZk3FCqQhY_Iag9QZA6C8TadHpovnF9U8",
  authDomain: "dakshana-tracker.firebaseapp.com",
  databaseURL: "https://dakshana-tracker-default-rtdb.firebaseio.com",
  projectId: "dakshana-tracker",
  storageBucket: "dakshana-tracker.firebasestorage.app",
  messagingSenderId: "611177542338",
  appId: "1:611177542338:web:c17cc1d1c5fc90ed04415b",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const GROUP_CODE = "DAKSHANA2025";
const ADMIN_CODE = "1979";
const GROUP_NAME = "Dakshana Sophomores";

const DSA_TOPICS = [
  { id: "basics", name: "Learn the Basics", problems: [
    {id:"b1",title:"User Input / Output",diff:"easy"},{id:"b2",title:"Data Types",diff:"easy"},{id:"b3",title:"If Else statements",diff:"easy"},{id:"b4",title:"Switch Statement",diff:"easy"},{id:"b5",title:"What are arrays, strings?",diff:"easy"},{id:"b6",title:"For loops",diff:"easy"},{id:"b7",title:"While loops",diff:"easy"},{id:"b8",title:"Functions (Pass by Value, Reference)",diff:"easy"},{id:"b9",title:"Time Complexity",diff:"easy"},{id:"b10",title:"Space Complexity",diff:"easy"},
    {id:"b11",title:"Pass by reference vs value",diff:"easy"},{id:"b12",title:"Recursion basics",diff:"easy"},{id:"b13",title:"Hashing basics",diff:"easy"},{id:"b14",title:"Sorting basics",diff:"easy"}
  ]},
  { id: "sorting", name: "Sorting Techniques", problems: [
    {id:"s1",title:"Selection Sort",diff:"easy"},{id:"s2",title:"Bubble Sort",diff:"easy"},{id:"s3",title:"Insertion Sort",diff:"easy"},{id:"s4",title:"Merge Sort",diff:"medium"},{id:"s5",title:"Quick Sort",diff:"medium"},{id:"s6",title:"Recursive Bubble Sort",diff:"medium"},{id:"s7",title:"Recursive Insertion Sort",diff:"medium"}
  ]},
  { id: "arrays", name: "Arrays", problems: [
    {id:"a1",title:"Largest Element in Array",diff:"easy"},{id:"a2",title:"Second Largest Element",diff:"easy"},{id:"a3",title:"Check if Array is Sorted",diff:"easy"},{id:"a4",title:"Remove Duplicates (Sorted Array)",diff:"easy"},{id:"a5",title:"Left Rotate Array by One",diff:"easy"},{id:"a6",title:"Left Rotate Array by D places",diff:"easy"},{id:"a7",title:"Move Zeros to End",diff:"easy"},{id:"a8",title:"Linear Search",diff:"easy"},{id:"a9",title:"Union of Two Sorted Arrays",diff:"easy"},{id:"a10",title:"Find Missing Number",diff:"easy"},
    {id:"a11",title:"Maximum Consecutive Ones",diff:"easy"},{id:"a12",title:"Find Number appearing once",diff:"easy"},{id:"a13",title:"Longest Subarray with Sum K",diff:"easy"},{id:"a14",title:"Two Sum",diff:"medium"},{id:"a15",title:"Sort 0s 1s 2s",diff:"medium"},{id:"a16",title:"Majority Element (>N/2)",diff:"medium"},{id:"a17",title:"Kadane's Algorithm",diff:"medium"},{id:"a18",title:"Print Subarray with Max Sum",diff:"medium"},{id:"a19",title:"Stock Buy and Sell",diff:"medium"},{id:"a20",title:"Rearrange Array Elements",diff:"medium"},
    {id:"a21",title:"Next Permutation",diff:"medium"},{id:"a22",title:"Leaders in Array",diff:"medium"},{id:"a23",title:"Longest Consecutive Sequence",diff:"medium"},{id:"a24",title:"Set Matrix Zeros",diff:"medium"},{id:"a25",title:"Rotate Matrix 90°",diff:"medium"},{id:"a26",title:"Spiral Traversal of Matrix",diff:"medium"},{id:"a27",title:"Count Subarrays with XOR = K",diff:"medium"},{id:"a28",title:"Merge Overlapping Subintervals",diff:"medium"},{id:"a29",title:"Merge Two Sorted Arrays",diff:"medium"},{id:"a30",title:"Find Duplicate in Array",diff:"medium"},
    {id:"a31",title:"Repeat and Missing Number",diff:"hard"},{id:"a32",title:"Count Inversions",diff:"hard"},{id:"a33",title:"Reverse Pairs",diff:"hard"},{id:"a34",title:"Maximum Product Subarray",diff:"hard"},{id:"a35",title:"3 Sum",diff:"medium"},{id:"a36",title:"4 Sum",diff:"medium"},{id:"a37",title:"Largest Subarray with 0 Sum",diff:"medium"},{id:"a38",title:"Count distinct in window",diff:"medium"},{id:"a39",title:"Majority Element (>N/3)",diff:"medium"},{id:"a40",title:"Grid Unique Paths",diff:"medium"}
  ]},
  { id: "binarysearch", name: "Binary Search", problems: [
    {id:"bs1",title:"Binary Search (Iterative/Recursive)",diff:"easy"},{id:"bs2",title:"Lower Bound",diff:"easy"},{id:"bs3",title:"Upper Bound",diff:"easy"},{id:"bs4",title:"Search Insert Position",diff:"easy"},{id:"bs5",title:"Floor/Ceil in Sorted Array",diff:"easy"},{id:"bs6",title:"First/Last Occurrence",diff:"easy"},{id:"bs7",title:"Count Occurrences",diff:"easy"},{id:"bs8",title:"Search in Rotated Sorted Array",diff:"medium"},{id:"bs9",title:"Search in Rotated Array II",diff:"medium"},{id:"bs10",title:"Find Min in Rotated Array",diff:"medium"},
    {id:"bs11",title:"Find Peak Element",diff:"medium"},{id:"bs12",title:"Sqrt(x)",diff:"easy"},{id:"bs13",title:"Find Nth Root of M",diff:"medium"},{id:"bs14",title:"Koko Eating Bananas",diff:"medium"},{id:"bs15",title:"Minimum Days to Make M Bouquets",diff:"medium"},{id:"bs16",title:"Find Smallest Divisor",diff:"medium"},{id:"bs17",title:"Capacity to Ship Packages",diff:"medium"},{id:"bs18",title:"Kth Missing Positive Number",diff:"easy"},{id:"bs19",title:"Aggressive Cows",diff:"medium"},{id:"bs20",title:"Book Allocation Problem",diff:"hard"},
    {id:"bs21",title:"Split Array Largest Sum",diff:"hard"},{id:"bs22",title:"Painter's Partition",diff:"hard"},{id:"bs23",title:"Minimize Max Distance to Gas Station",diff:"hard"},{id:"bs24",title:"Median of Two Sorted Arrays",diff:"hard"},{id:"bs25",title:"Kth Element of Two Arrays",diff:"hard"},{id:"bs26",title:"Row with Max 1s",diff:"medium"},{id:"bs27",title:"Search in 2D Matrix",diff:"medium"},{id:"bs28",title:"Search in 2D Matrix II",diff:"medium"},{id:"bs29",title:"Find Peak Element in 2D",diff:"hard"},{id:"bs30",title:"Matrix Median",diff:"hard"},
    {id:"bs31",title:"Single Element in Sorted Array",diff:"medium"},{id:"bs32",title:"Count Smaller than Mid",diff:"medium"}
  ]},
  { id: "strings", name: "Strings", problems: [
    {id:"st1",title:"Remove Outermost Parentheses",diff:"easy"},{id:"st2",title:"Reverse Words in String",diff:"easy"},{id:"st3",title:"Largest Odd Number in String",diff:"easy"},{id:"st4",title:"Longest Common Prefix",diff:"easy"},{id:"st5",title:"Isomorphic Strings",diff:"easy"},{id:"st6",title:"Check if Strings are Rotations",diff:"easy"},{id:"st7",title:"Check if String is Palindrome",diff:"easy"},{id:"st8",title:"Sum of Beauty of All Substrings",diff:"medium"},{id:"st9",title:"Minimum Time to Type Word",diff:"easy"},{id:"st10",title:"Valid Anagram",diff:"easy"},
    {id:"st11",title:"Count and Say",diff:"medium"},{id:"st12",title:"Compare Version Numbers",diff:"medium"},{id:"st13",title:"Maximum Nesting Depth of Parentheses",diff:"easy"},{id:"st14",title:"Roman to Integer",diff:"easy"},{id:"st15",title:"Integer to Roman",diff:"medium"}
  ]},
  { id: "linkedlist", name: "Linked List", problems: [
    {id:"ll1",title:"Linked List Intro & Traversal",diff:"easy"},{id:"ll2",title:"Insert at Head/Tail",diff:"easy"},{id:"ll3",title:"Delete Node",diff:"easy"},{id:"ll4",title:"Find Length of LL",diff:"easy"},{id:"ll5",title:"Reverse Linked List",diff:"easy"},{id:"ll6",title:"Middle of LL",diff:"easy"},{id:"ll7",title:"Merge Two Sorted Lists",diff:"easy"},{id:"ll8",title:"Remove Nth Node from End",diff:"medium"},{id:"ll9",title:"Delete Middle Node",diff:"medium"},{id:"ll10",title:"Sort LL (0s, 1s, 2s)",diff:"easy"},
    {id:"ll11",title:"Doubly LL Introduction",diff:"easy"},{id:"ll12",title:"Insert/Delete in DLL",diff:"easy"},{id:"ll13",title:"Reverse DLL",diff:"easy"},{id:"ll14",title:"Add 1 to LL",diff:"medium"},{id:"ll15",title:"Add Two Numbers as LL",diff:"medium"},{id:"ll16",title:"Odd Even Linked List",diff:"medium"},{id:"ll17",title:"Remove Duplicates from Sorted LL",diff:"easy"},{id:"ll18",title:"Sort LL",diff:"medium"},{id:"ll19",title:"Segregate Odd/Even Nodes",diff:"medium"},{id:"ll20",title:"LL Cycle Detection",diff:"easy"},
    {id:"ll21",title:"Find Starting Point of Cycle",diff:"medium"},{id:"ll22",title:"Length of Loop in LL",diff:"medium"},{id:"ll23",title:"Check if LL is Palindrome",diff:"medium"},{id:"ll24",title:"Intersection of Two LLs",diff:"easy"},{id:"ll25",title:"Find Duplicate Number",diff:"medium"},{id:"ll26",title:"Reverse LL in Groups of K",diff:"hard"},{id:"ll27",title:"Rotate LL",diff:"medium"},{id:"ll28",title:"Flattening LL",diff:"hard"},{id:"ll29",title:"Clone LL with Random Pointer",diff:"hard"},{id:"ll30",title:"Merge K Sorted Lists",diff:"hard"},
    {id:"ll31",title:"Subtraction in LL",diff:"medium"}
  ]},
  { id: "recursion", name: "Recursion", problems: [
    {id:"r1",title:"Print 1 to N recursively",diff:"easy"},{id:"r2",title:"Print N to 1 recursively",diff:"easy"},{id:"r3",title:"Sum of first N numbers",diff:"easy"},{id:"r4",title:"Factorial of N",diff:"easy"},{id:"r5",title:"Reverse an Array",diff:"easy"},{id:"r6",title:"Check Palindrome",diff:"easy"},{id:"r7",title:"Fibonacci Number",diff:"easy"},{id:"r8",title:"All Subsequences with Sum K",diff:"medium"},{id:"r9",title:"Combination Sum I",diff:"medium"},{id:"r10",title:"Combination Sum II",diff:"medium"},
    {id:"r11",title:"Subset Sum I",diff:"medium"},{id:"r12",title:"Subset Sum II",diff:"medium"},{id:"r13",title:"Permutation Sequence",diff:"hard"},{id:"r14",title:"Print All Permutations",diff:"medium"},{id:"r15",title:"N Queens",diff:"hard"},{id:"r16",title:"Sudoku Solver",diff:"hard"},{id:"r17",title:"M Coloring Problem",diff:"hard"},{id:"r18",title:"Rat in a Maze",diff:"medium"},{id:"r19",title:"Word Break",diff:"medium"},{id:"r20",title:"Expression Add Operators",diff:"hard"},
    {id:"r21",title:"Palindrome Partitioning",diff:"hard"},{id:"r22",title:"K-th Permutation",diff:"hard"},{id:"r23",title:"Generate Parentheses",diff:"medium"},{id:"r24",title:"Letter Combinations (Phone)",diff:"medium"},{id:"r25",title:"Power Set",diff:"medium"}
  ]},
  { id: "bitmani", name: "Bit Manipulation", problems: [
    {id:"bm1",title:"Introduction to Bit Manipulation",diff:"easy"},{id:"bm2",title:"Check if Kth bit is set",diff:"easy"},{id:"bm3",title:"Odd or Even",diff:"easy"},{id:"bm4",title:"Power of 2",diff:"easy"},{id:"bm5",title:"Count Set Bits",diff:"easy"},{id:"bm6",title:"Set Kth bit",diff:"easy"},{id:"bm7",title:"Swap Two Numbers",diff:"easy"},{id:"bm8",title:"Divide Two Integers",diff:"medium"},{id:"bm9",title:"XOR of numbers in range [L,R]",diff:"medium"},{id:"bm10",title:"Two numbers with odd occurrences",diff:"medium"},
    {id:"bm11",title:"Power Set using Bitmask",diff:"medium"},{id:"bm12",title:"Find XOR of all subsets",diff:"medium"},{id:"bm13",title:"Minimum XOR (Bit Trick)",diff:"medium"},{id:"bm14",title:"Single Number I",diff:"easy"},{id:"bm15",title:"Single Number II",diff:"medium"},{id:"bm16",title:"Single Number III",diff:"medium"},{id:"bm17",title:"Count total set bits 1 to N",diff:"medium"},{id:"bm18",title:"Reverse Bits",diff:"easy"}
  ]},
  { id: "stackqueue", name: "Stack & Queues", problems: [
    {id:"sq1",title:"Stack using Arrays",diff:"easy"},{id:"sq2",title:"Stack using LL",diff:"easy"},{id:"sq3",title:"Queue using Arrays",diff:"easy"},{id:"sq4",title:"Queue using LL",diff:"easy"},{id:"sq5",title:"Stack using Queue",diff:"medium"},{id:"sq6",title:"Queue using Stack",diff:"medium"},{id:"sq7",title:"Valid Parentheses",diff:"easy"},{id:"sq8",title:"Min Stack",diff:"medium"},{id:"sq9",title:"Infix to Postfix",diff:"medium"},{id:"sq10",title:"Prefix to Infix",diff:"medium"},
    {id:"sq11",title:"Postfix to Infix",diff:"medium"},{id:"sq12",title:"Next Greater Element I",diff:"medium"},{id:"sq13",title:"Next Greater Element II",diff:"medium"},{id:"sq14",title:"Previous Smaller Element",diff:"medium"},{id:"sq15",title:"Trapping Rain Water",diff:"hard"},{id:"sq16",title:"Sum of Subarray Minimums",diff:"hard"},{id:"sq17",title:"Asteroid Collision",diff:"medium"},{id:"sq18",title:"Sum of Subarray Ranges",diff:"medium"},{id:"sq19",title:"Remove K Digits",diff:"medium"},{id:"sq20",title:"Largest Rectangle in Histogram",diff:"hard"},
    {id:"sq21",title:"Maximal Rectangle",diff:"hard"},{id:"sq22",title:"Sliding Window Maximum",diff:"hard"},{id:"sq23",title:"Stock Span Problem",diff:"medium"},{id:"sq24",title:"Rotting Oranges",diff:"medium"},{id:"sq25",title:"LRU Cache",diff:"hard"},{id:"sq26",title:"LFU Cache",diff:"hard"},{id:"sq27",title:"Online Stock Span",diff:"medium"},{id:"sq28",title:"Implement Circular Queue",diff:"medium"},{id:"sq29",title:"Implement Deque",diff:"medium"},{id:"sq30",title:"Celebrity Problem",diff:"medium"}
  ]},
  { id: "sliding", name: "Sliding Window & Two Pointer", problems: [
    {id:"sw1",title:"Longest Substring without Repeat",diff:"medium"},{id:"sw2",title:"Max Consecutive Ones III",diff:"medium"},{id:"sw3",title:"Fruit Into Baskets",diff:"medium"},{id:"sw4",title:"Longest Repeating Character Replacement",diff:"medium"},{id:"sw5",title:"Binary Subarrays With Sum",diff:"medium"},{id:"sw6",title:"Count Number of Nice Subarrays",diff:"medium"},{id:"sw7",title:"Substrings with K Distinct Characters",diff:"medium"},{id:"sw8",title:"Minimum Window Substring",diff:"hard"},{id:"sw9",title:"Minimum Window Subsequence",diff:"hard"},{id:"sw10",title:"Number of Substrings with all 3 chars",diff:"medium"},
    {id:"sw11",title:"Maximum Points You Can Obtain",diff:"medium"},{id:"sw12",title:"Permutation in String",diff:"medium"}
  ]},
  { id: "heaps", name: "Heaps", problems: [
    {id:"h1",title:"Introduction to Heaps",diff:"easy"},{id:"h2",title:"Min Heap / Max Heap",diff:"easy"},{id:"h3",title:"Heap Sort",diff:"medium"},{id:"h4",title:"Kth Largest Element",diff:"medium"},{id:"h5",title:"Kth Smallest Element",diff:"medium"},{id:"h6",title:"Task Scheduler",diff:"medium"},{id:"h7",title:"Twitter Design (Top K Tweets)",diff:"hard"},{id:"h8",title:"Find Median from Data Stream",diff:"hard"},{id:"h9",title:"K Most Frequent Elements",diff:"medium"},{id:"h10",title:"Top K Frequent Words",diff:"medium"},
    {id:"h11",title:"K Closest Points to Origin",diff:"medium"},{id:"h12",title:"Merge K Sorted Lists",diff:"hard"},{id:"h13",title:"Replace Elements by Rank",diff:"medium"},{id:"h14",title:"Hand of Straights",diff:"medium"},{id:"h15",title:"Reorganize String",diff:"medium"},{id:"h16",title:"Maximum Sum Combination",diff:"medium"},{id:"h17",title:"Kth Largest in a Stream",diff:"easy"}
  ]},
  { id: "greedy", name: "Greedy Algorithms", problems: [
    {id:"g1",title:"Assign Cookies",diff:"easy"},{id:"g2",title:"Fractional Knapsack",diff:"medium"},{id:"g3",title:"Greedy Job Scheduling",diff:"medium"},{id:"g4",title:"N Meetings in One Room",diff:"easy"},{id:"g5",title:"Jump Game I",diff:"medium"},{id:"g6",title:"Jump Game II",diff:"medium"},{id:"g7",title:"Minimum Platforms",diff:"medium"},{id:"g8",title:"Candy",diff:"hard"},{id:"g9",title:"Insert Interval",diff:"medium"},{id:"g10",title:"Non-overlapping Intervals",diff:"medium"},
    {id:"g11",title:"Valid Parenthesis String",diff:"medium"},{id:"g12",title:"Lemonade Change",diff:"easy"},{id:"g13",title:"Shortest Job First (SJF)",diff:"medium"},{id:"g14",title:"Page Faults in LRU",diff:"medium"},{id:"g15",title:"Minimum Cost to Connect Ropes",diff:"medium"}
  ]},
  { id: "binarytrees", name: "Binary Trees", problems: [
    {id:"bt1",title:"Introduction to Trees",diff:"easy"},{id:"bt2",title:"Preorder Traversal",diff:"easy"},{id:"bt3",title:"Inorder Traversal",diff:"easy"},{id:"bt4",title:"Postorder Traversal",diff:"easy"},{id:"bt5",title:"Level Order Traversal",diff:"easy"},{id:"bt6",title:"Iterative Preorder",diff:"easy"},{id:"bt7",title:"Iterative Inorder",diff:"medium"},{id:"bt8",title:"Iterative Postorder",diff:"medium"},{id:"bt9",title:"Height of Binary Tree",diff:"easy"},{id:"bt10",title:"Check Balanced Binary Tree",diff:"medium"},
    {id:"bt11",title:"Diameter of Binary Tree",diff:"medium"},{id:"bt12",title:"Max Path Sum",diff:"hard"},{id:"bt13",title:"Identical Trees",diff:"easy"},{id:"bt14",title:"Zig-Zag Traversal",diff:"medium"},{id:"bt15",title:"Boundary Traversal",diff:"medium"},{id:"bt16",title:"Vertical Order Traversal",diff:"hard"},{id:"bt17",title:"Top View",diff:"medium"},{id:"bt18",title:"Bottom View",diff:"medium"},{id:"bt19",title:"Left/Right View",diff:"medium"},{id:"bt20",title:"Symmetric Binary Tree",diff:"easy"},
    {id:"bt21",title:"Root to Node Path",diff:"medium"},{id:"bt22",title:"LCA of Binary Tree",diff:"medium"},{id:"bt23",title:"Width of Binary Tree",diff:"medium"},{id:"bt24",title:"Children Sum Property",diff:"medium"},{id:"bt25",title:"Print All Nodes at Distance K",diff:"medium"},{id:"bt26",title:"Minimum Time to Burn Tree",diff:"hard"},{id:"bt27",title:"Count Nodes in Complete Tree",diff:"medium"},{id:"bt28",title:"Requirements from Preorder",diff:"hard"},{id:"bt29",title:"Construct Tree from Pre/In",diff:"hard"},{id:"bt30",title:"Construct Tree from Post/In",diff:"hard"},
    {id:"bt31",title:"Serialize and Deserialize Tree",diff:"hard"},{id:"bt32",title:"Morris Inorder Traversal",diff:"hard"},{id:"bt33",title:"Morris Preorder Traversal",diff:"hard"},{id:"bt34",title:"Flatten BT to Linked List",diff:"medium"},{id:"bt35",title:"Check if Tree is Mirror",diff:"easy"},{id:"bt36",title:"Invert Binary Tree",diff:"easy"},{id:"bt37",title:"Sum Root to Leaf Numbers",diff:"medium"},{id:"bt38",title:"Path Sum III",diff:"medium"}
  ]},
  { id: "bst", name: "Binary Search Trees", problems: [
    {id:"bst1",title:"Introduction to BST",diff:"easy"},{id:"bst2",title:"Search in BST",diff:"easy"},{id:"bst3",title:"Find Min/Max in BST",diff:"easy"},{id:"bst4",title:"Ceil in BST",diff:"medium"},{id:"bst5",title:"Floor in BST",diff:"medium"},{id:"bst6",title:"Insert into BST",diff:"medium"},{id:"bst7",title:"Delete in BST",diff:"medium"},{id:"bst8",title:"Kth Smallest in BST",diff:"medium"},{id:"bst9",title:"Kth Largest in BST",diff:"medium"},{id:"bst10",title:"Validate BST",diff:"medium"},
    {id:"bst11",title:"LCA in BST",diff:"medium"},{id:"bst12",title:"Construct BST from Preorder",diff:"medium"},{id:"bst13",title:"Inorder Successor in BST",diff:"medium"},{id:"bst14",title:"BST Iterator",diff:"medium"},{id:"bst15",title:"Two Sum in BST",diff:"medium"},{id:"bst16",title:"Recover BST",diff:"hard"}
  ]},
  { id: "graphs", name: "Graphs", problems: [
    {id:"gr1",title:"Graph and Types",diff:"easy"},{id:"gr2",title:"BFS Traversal",diff:"easy"},{id:"gr3",title:"DFS Traversal",diff:"easy"},{id:"gr4",title:"Number of Provinces",diff:"medium"},{id:"gr5",title:"Number of Islands",diff:"medium"},{id:"gr6",title:"Flood Fill",diff:"easy"},{id:"gr7",title:"Rotten Oranges",diff:"medium"},{id:"gr8",title:"Detect Cycle (Undirected - BFS)",diff:"medium"},{id:"gr9",title:"Detect Cycle (Undirected - DFS)",diff:"medium"},{id:"gr10",title:"Distance of Nearest Cell (0 in Matrix)",diff:"medium"},
    {id:"gr11",title:"Surrounded Regions",diff:"medium"},{id:"gr12",title:"Number of Enclaves",diff:"medium"},{id:"gr13",title:"Word Ladder I",diff:"hard"},{id:"gr14",title:"Word Ladder II",diff:"hard"},{id:"gr15",title:"Bipartite Check (BFS)",diff:"medium"},{id:"gr16",title:"Bipartite Check (DFS)",diff:"medium"},{id:"gr17",title:"Detect Cycle (Directed - DFS)",diff:"medium"},{id:"gr18",title:"Eventual Safe States",diff:"medium"},{id:"gr19",title:"Topological Sort (DFS)",diff:"medium"},{id:"gr20",title:"Topological Sort (BFS / Kahn's)",diff:"medium"},
    {id:"gr21",title:"Course Schedule I",diff:"medium"},{id:"gr22",title:"Course Schedule II",diff:"medium"},{id:"gr23",title:"Find Eventual Safe States (BFS)",diff:"medium"},{id:"gr24",title:"Alien Dictionary",diff:"hard"},{id:"gr25",title:"Dijkstra's Algorithm",diff:"medium"},{id:"gr26",title:"Shortest Path in DAG",diff:"medium"},{id:"gr27",title:"Shortest Path in Undirected Graph",diff:"easy"},{id:"gr28",title:"Word Ladder (Shortest Path)",diff:"hard"},{id:"gr29",title:"Bellman Ford Algorithm",diff:"medium"},{id:"gr30",title:"Floyd Warshall Algorithm",diff:"medium"},
    {id:"gr31",title:"City with Smallest Number of Neighbors",diff:"medium"},{id:"gr32",title:"Prim's Algorithm (MST)",diff:"medium"},{id:"gr33",title:"Kruskal's Algorithm (MST)",diff:"medium"},{id:"gr34",title:"Number of Operations to Make Network Connected",diff:"medium"},{id:"gr35",title:"Most Stones Removed",diff:"medium"},{id:"gr36",title:"Account Merge",diff:"hard"},{id:"gr37",title:"Number of Islands II",diff:"hard"},{id:"gr38",title:"Making a Large Island",diff:"hard"},{id:"gr39",title:"Swim in Rising Water",diff:"hard"},{id:"gr40",title:"Strongly Connected Components (Kosaraju's)",diff:"hard"},
    {id:"gr41",title:"Bridges in Graph",diff:"hard"},{id:"gr42",title:"Articulation Points",diff:"hard"},{id:"gr43",title:"Path with Minimum Effort",diff:"medium"},{id:"gr44",title:"Cheapest Flights K Stops",diff:"medium"},{id:"gr45",title:"Network Delay Time",diff:"medium"},{id:"gr46",title:"Number of Ways to Arrive at Destination",diff:"medium"},{id:"gr47",title:"Minimum Multiplications to Reach End",diff:"medium"},{id:"gr48",title:"Bus Routes",diff:"hard"},{id:"gr49",title:"Minimum Spanning Tree",diff:"medium"},{id:"gr50",title:"Disjoint Set Union by Rank",diff:"medium"},
    {id:"gr51",title:"Disjoint Set Union by Size",diff:"medium"},{id:"gr52",title:"Path Compression",diff:"medium"},{id:"gr53",title:"Number of Provinces (DSU)",diff:"medium"}
  ]},
  { id: "dp", name: "Dynamic Programming", problems: [
    {id:"dp1",title:"Introduction to DP",diff:"easy"},{id:"dp2",title:"Climbing Stairs",diff:"easy"},{id:"dp3",title:"Frog Jump",diff:"easy"},{id:"dp4",title:"Frog Jump with K distances",diff:"medium"},{id:"dp5",title:"Maximum Sum of Non-Adjacent",diff:"medium"},{id:"dp6",title:"House Robber II",diff:"medium"},{id:"dp7",title:"Ninja Training",diff:"medium"},{id:"dp8",title:"Grid Unique Paths",diff:"medium"},{id:"dp9",title:"Grid Unique Paths II",diff:"medium"},{id:"dp10",title:"Minimum Path Sum in Grid",diff:"medium"},
    {id:"dp11",title:"Triangle (Fixed Starting Point)",diff:"medium"},{id:"dp12",title:"Minimum Falling Path Sum",diff:"medium"},{id:"dp13",title:"Cherry Pickup II",diff:"hard"},{id:"dp14",title:"Subset Sum equals Target",diff:"medium"},{id:"dp15",title:"Partition Equal Subset Sum",diff:"medium"},{id:"dp16",title:"Partition Array into Two with Min Diff",diff:"medium"},{id:"dp17",title:"Count Subsets with Sum K",diff:"medium"},{id:"dp18",title:"Count Partitions with Given Difference",diff:"medium"},{id:"dp19",title:"0/1 Knapsack",diff:"medium"},{id:"dp20",title:"Coin Change (Min Coins)",diff:"medium"},
    {id:"dp21",title:"Coin Change II (Count Ways)",diff:"medium"},{id:"dp22",title:"Unbounded Knapsack",diff:"medium"},{id:"dp23",title:"Rod Cutting",diff:"medium"},{id:"dp24",title:"Longest Common Subsequence",diff:"medium"},{id:"dp25",title:"Print LCS",diff:"medium"},{id:"dp26",title:"Longest Common Substring",diff:"medium"},{id:"dp27",title:"Longest Palindromic Subsequence",diff:"medium"},{id:"dp28",title:"Min Insertions to Make Palindrome",diff:"medium"},{id:"dp29",title:"Min Operations to Convert String",diff:"medium"},{id:"dp30",title:"Shortest Common Supersequence",diff:"hard"},
    {id:"dp31",title:"Distinct Subsequences",diff:"hard"},{id:"dp32",title:"Edit Distance",diff:"hard"},{id:"dp33",title:"Wildcard Matching",diff:"hard"},{id:"dp34",title:"Best Time to Buy/Sell Stock I",diff:"easy"},{id:"dp35",title:"Best Time to Buy/Sell Stock II",diff:"medium"},{id:"dp36",title:"Best Time to Buy/Sell Stock III",diff:"hard"},{id:"dp37",title:"Best Time to Buy/Sell Stock IV",diff:"hard"},{id:"dp38",title:"Buy and Sell with Cooldown",diff:"medium"},{id:"dp39",title:"Buy and Sell with Transaction Fee",diff:"medium"},{id:"dp40",title:"Longest Increasing Subsequence",diff:"medium"},
    {id:"dp41",title:"Print LIS",diff:"medium"},{id:"dp42",title:"LIS using Binary Search",diff:"medium"},{id:"dp43",title:"Largest Divisible Subset",diff:"medium"},{id:"dp44",title:"Longest String Chain",diff:"medium"},{id:"dp45",title:"Longest Bitonic Subsequence",diff:"medium"},{id:"dp46",title:"Number of LIS",diff:"hard"},{id:"dp47",title:"Matrix Chain Multiplication",diff:"hard"},{id:"dp48",title:"MCM using Memoization",diff:"hard"},{id:"dp49",title:"Minimum Cost to Cut Stick",diff:"hard"},{id:"dp50",title:"Burst Balloons",diff:"hard"},
    {id:"dp51",title:"Evaluate Boolean Expression to True",diff:"hard"},{id:"dp52",title:"Palindrome Partitioning II",diff:"hard"},{id:"dp53",title:"Partition Array for Max Sum",diff:"hard"},{id:"dp54",title:"Count Square Submatrices",diff:"medium"},{id:"dp55",title:"Maximal Rectangle",diff:"hard"}
  ]},
  { id: "tries", name: "Tries", problems: [
    {id:"tr1",title:"Implement Trie",diff:"medium"},{id:"tr2",title:"Implement Trie II",diff:"medium"},{id:"tr3",title:"Longest String with All Prefixes",diff:"medium"},{id:"tr4",title:"Count Distinct Substrings",diff:"hard"},{id:"tr5",title:"Maximum XOR of Two Numbers",diff:"medium"},{id:"tr6",title:"Maximum XOR with an Element from Array",diff:"hard"},{id:"tr7",title:"Prefix and Suffix Search",diff:"hard"}
  ]},
  { id: "strings2", name: "Advanced Strings", problems: [
    {id:"as1",title:"Z Function",diff:"medium"},{id:"as2",title:"KMP Algorithm",diff:"hard"},{id:"as3",title:"Minimum Characters for Palindrome",diff:"hard"},{id:"as4",title:"Shortest Palindrome",diff:"hard"},{id:"as5",title:"Longest Happy Prefix",diff:"hard"},{id:"as6",title:"Count Occurrences of Pattern",diff:"medium"},{id:"as7",title:"String Hashing",diff:"medium"},{id:"as8",title:"Rabin Karp Algorithm",diff:"hard"},{id:"as9",title:"Anagram Check using Hashing",diff:"easy"}
  ]}
];

const TOTAL = DSA_TOPICS.reduce((s,t)=>s+t.problems.length,0);
const COLORS = { easy:"#22c55e", medium:"#f59e0b", hard:"#ef4444" };
const DIFF_BG = { easy:"#dcfce7", medium:"#fef3c7", hard:"#fee2e2" };
const RANK_LABELS = ["👑 Legend","🔥 Grandmaster","⭐ Expert","💪 Specialist","📚 Pupil","🌱 Newbie"];
const rankFor = (pct) => {
  if(pct>=90) return RANK_LABELS[0];
  if(pct>=70) return RANK_LABELS[1];
  if(pct>=50) return RANK_LABELS[2];
  if(pct>=30) return RANK_LABELS[3];
  if(pct>=10) return RANK_LABELS[4];
  return RANK_LABELS[5];
};

const todayStr = () => new Date().toISOString().split("T")[0];

// Returns date string N days ago
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

// Get week start (Monday) of a given date string
const weekStart = (dateStr) => {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
};

export default function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [showForgotPin, setShowForgotPin] = useState(false);
  const [regName, setRegName] = useState("");
  const [regFarziName, setRegFarziName] = useState("");
  const [regPin, setRegPin] = useState("");
  const [regCode, setRegCode] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [compareUser, setCompareUser] = useState("");
  const [diffFilter, setDiffFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [toast, setToast] = useState(null);
  const [adminSelectedUser, setAdminSelectedUser] = useState(null);
  const [adminEditPin, setAdminEditPin] = useState("");
  const [adminExpandTopic, setAdminExpandTopic] = useState(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [lbTab, setLbTab] = useState("overall"); // "overall" | "weekly"

  useEffect(() => { loadData(); }, []);

  const showToast = (msg, type="success") => {
    setToast({msg, type});
    setTimeout(() => setToast(null), 2500);
  };

  const loadData = () => {
    const usersRef = ref(db, "ds_users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if(data) setUsers(data);
      setDbLoading(false);
    });
  };

  const saveUsers = async (u) => {
    setUsers(u);
    try { await set(ref(db, "ds_users"), u); } catch(e) { console.error("Firebase save error:", e); }
  };

  const getSolvedCount = (u) => Object.keys(u.solved||{}).length;

  const getPoints = (u) => {
    let p = 0;
    Object.keys(u.solved||{}).forEach(id => {
      const top = DSA_TOPICS.find(t => t.problems.find(pr => pr.id===id));
      const pr = top?.problems.find(pr => pr.id===id);
      if(pr?.diff==="easy") p+=1;
      else if(pr?.diff==="medium") p+=2;
      else if(pr?.diff==="hard") p+=3;
    });
    return p;
  };

  // Weekly points: only problems solved in current week (Mon-Sun)
  const getWeeklyPoints = (u) => {
    const thisWeek = weekStart(todayStr());
    const activity = u.activity || [];
    const solved = u.solved || {};
    // Get all problem IDs solved this week
    // We track date per activity entry; match solved timestamps to this week
    let pts = 0;
    Object.entries(solved).forEach(([id, ts]) => {
      if(!ts) return;
      const solvedDate = new Date(ts).toISOString().split("T")[0];
      if(weekStart(solvedDate) === thisWeek) {
        const top = DSA_TOPICS.find(t => t.problems.find(pr => pr.id===id));
        const pr = top?.problems.find(pr => pr.id===id);
        if(pr?.diff==="easy") pts+=1;
        else if(pr?.diff==="medium") pts+=2;
        else if(pr?.diff==="hard") pts+=3;
      }
    });
    return pts;
  };

  const getWeeklySolved = (u) => {
    const thisWeek = weekStart(todayStr());
    const solved = u.solved || {};
    return Object.entries(solved).filter(([id, ts]) => {
      if(!ts) return false;
      const solvedDate = new Date(ts).toISOString().split("T")[0];
      return weekStart(solvedDate) === thisWeek;
    }).length;
  };

  const getStreak = (u) => {
    if(!u.activity || !u.activity.length) return 0;
    const days = [...new Set(u.activity)].sort().reverse();
    let streak = 0;
    let cur = new Date(todayStr());
    for(let d of days) {
      const dd = new Date(d);
      const diff = Math.round((cur - dd) / (1000*60*60*24));
      if(diff === 0 || diff === streak) { streak++; cur = dd; }
      else if(diff === 1) { streak++; cur = dd; }
      else break;
    }
    return streak;
  };

  // Returns last 84 days activity map: {dateStr: count}
  const getActivityMap = (u) => {
    const map = {};
    (u.activity||[]).forEach(d => { map[d] = (map[d]||0) + 1; });
    return map;
  };

  const handleRegister = async () => {
    setAuthError("");
    if(!regName.trim()) return setAuthError("Apna real naam daalo");
    if(!regFarziName.trim()) return setAuthError("Farzi naam daalo (username)");
    const farziKey = regFarziName.trim().toLowerCase().replace(/[^a-z0-9]/g,"");
    if(farziKey.length < 3) return setAuthError("Farzi naam kam se kam 3 characters ka hona chahiye");
    if(farziKey !== regFarziName.trim().toLowerCase()) return setAuthError("Farzi naam mein sirf small letters aur numbers allowed hain");
    const isAdminReg = regCode === ADMIN_CODE;
    if(regCode!==GROUP_CODE && !isAdminReg) return setAuthError("Group code galat hai");
    if(regPin.length!==4||!/^\d{4}$/.test(regPin)) return setAuthError("4 digit PIN chahiye");
    if(regPin!==regConfirm) return setAuthError("PIN match nahi kiya");
    if(users[farziKey]) return setAuthError("Ye farzi naam already le liya gaya hai 😅");
    const newUsers = {...users, [farziKey]:{name:regName.trim(),username:farziKey,pin:regPin,isAdmin:isAdminReg,hidden:isAdminReg,solved:{},activity:[],joinedAt:new Date().toISOString()}};
    await saveUsers(newUsers);
    setCurrentUser(newUsers[farziKey]);
    setPage("app");
    showToast(isAdminReg ? "Admin access granted 🔐" : "Welcome to Dakshana Sophomores! 🎉");
  };

  const handleLogin = async () => {
    setAuthError("");
    if(dbLoading) return setAuthError("Thoda ruko... data load ho raha hai ⏳");
    const key = loginUsername.trim().toLowerCase();
    if(!users[key]) return setAuthError("Ye farzi naam nahi mila 🤔");
    if(users[key].pin!==loginPin) return setAuthError("PIN galat hai");
    setCurrentUser(users[key]);
    setPage("app");
  };

  const toggleProblem = async (pid) => {
    const key = currentUser.username || currentUser.name.toLowerCase();
    const solved = {...(users[key].solved||{})};
    const activity = [...(users[key].activity||[])];
    let wasAdded = false;
    if(solved[pid]) { delete solved[pid]; }
    else { solved[pid] = Date.now(); activity.push(todayStr()); wasAdded = true; }
    const updated = {...users[key], solved, activity};
    const newUsers = {...users, [key]: updated};
    await saveUsers(newUsers);
    setCurrentUser(updated);
    showToast(wasAdded ? "Problem solved! 🎉" : "Problem unmarked");
  };

  const isSolved = (pid) => !!(currentUser?.solved?.[pid]);

  const getLeaderboard = () => {
    return Object.values(users).filter(u=>!u.hidden).map(u=>({
      ...u,
      solvedCount: getSolvedCount(u),
      points: getPoints(u),
      weeklyPoints: getWeeklyPoints(u),
      weeklySolved: getWeeklySolved(u),
      streak: getStreak(u),
      pct: Math.round(getSolvedCount(u)/TOTAL*100)
    })).sort((a,b) => b.points - a.points);
  };

  const getWeeklyLeaderboard = () => {
    return Object.values(users).filter(u=>!u.hidden).map(u=>({
      ...u,
      solvedCount: getSolvedCount(u),
      points: getPoints(u),
      weeklyPoints: getWeeklyPoints(u),
      weeklySolved: getWeeklySolved(u),
      streak: getStreak(u),
      pct: Math.round(getSolvedCount(u)/TOTAL*100)
    })).sort((a,b) => b.weeklyPoints - a.weeklyPoints);
  };

  const getTopicProgress = (u, tid) => {
    const topic = DSA_TOPICS.find(t => t.id===tid);
    if(!topic) return 0;
    return topic.problems.filter(p => u.solved?.[p.id]).length;
  };

  // Heatmap: last 84 days (12 weeks)
  const HeatMap = ({ u }) => {
    const actMap = getActivityMap(u);
    const days = [];
    for(let i=83; i>=0; i--) days.push(daysAgo(i));
    const maxCount = Math.max(1, ...Object.values(actMap));
    const today = todayStr();
    const streak = getStreak(u);

    const getColor = (d) => {
      const count = actMap[d] || 0;
      if(count === 0) return "rgba(255,255,255,0.05)";
      const intensity = count / maxCount;
      if(intensity < 0.3) return "rgba(99,102,241,0.3)";
      if(intensity < 0.6) return "rgba(99,102,241,0.6)";
      return "#6366f1";
    };

    // Group into weeks
    const weeks = [];
    for(let i=0; i<days.length; i+=7) weeks.push(days.slice(i,i+7));

    return (
      <div style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"1.25rem",marginBottom:"1.5rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
          <span style={{color:"#fff",fontWeight:600,fontSize:"14px"}}>Activity Heatmap</span>
          <span style={{fontSize:"12px",color:"#f59e0b",fontWeight:600}}>{streak}🔥 day streak</span>
        </div>
        <div style={{display:"flex",gap:"3px",overflowX:"auto",paddingBottom:"4px"}}>
          {weeks.map((week,wi) => (
            <div key={wi} style={{display:"flex",flexDirection:"column",gap:"3px"}}>
              {week.map(d => (
                <div key={d} title={`${d}: ${actMap[d]||0} problems`}
                  style={{width:"10px",height:"10px",borderRadius:"2px",background:getColor(d),border:d===today?"1px solid #6366f1":"none",flexShrink:0}}/>
              ))}
            </div>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"8px"}}>
          <span style={{fontSize:"10px",color:"#475569"}}>Less</span>
          {["rgba(255,255,255,0.05)","rgba(99,102,241,0.3)","rgba(99,102,241,0.6)","#6366f1"].map((c,i)=>(
            <div key={i} style={{width:"10px",height:"10px",borderRadius:"2px",background:c}}/>
          ))}
          <span style={{fontSize:"10px",color:"#475569"}}>More</span>
        </div>
      </div>
    );
  };

  if(page==="home") return (
    <div style={{minHeight:"100vh",background:"#0f0f1a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"'Outfit',sans-serif",position:"relative",overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 60%)"}}/>
      <div style={{position:"relative",zIndex:1,textAlign:"center",marginBottom:"3rem"}}>
        <div style={{fontSize:"13px",letterSpacing:"3px",color:"#6366f1",fontWeight:600,marginBottom:"1rem",textTransform:"uppercase"}}>A2Z DSA Tracker</div>
        <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,color:"#fff",lineHeight:1.1,marginBottom:"1rem"}}>{GROUP_NAME}</h1>
        <p style={{color:"#94a3b8",fontSize:"16px",maxWidth:"420px",margin:"0 auto"}}>Track your DSA journey together. Compete, collaborate, conquer.</p>
      </div>
      <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",justifyContent:"center",position:"relative",zIndex:1}}>
        <button onClick={()=>setPage("login")} style={{padding:"12px 32px",background:"#6366f1",border:"none",borderRadius:"12px",color:"#fff",fontSize:"15px",fontWeight:600,cursor:"pointer"}}>Login</button>
        <button onClick={()=>setPage("register")} style={{padding:"12px 32px",background:"transparent",border:"1.5px solid rgba(255,255,255,0.2)",borderRadius:"12px",color:"#fff",fontSize:"15px",fontWeight:600,cursor:"pointer"}}>Register</button>
      </div>
      <div style={{position:"relative",zIndex:1,marginTop:"3rem",display:"flex",gap:"2rem",flexWrap:"wrap",justifyContent:"center"}}>
        {[["474","Problems"],["17","Topics"],["3","Difficulty Levels"]].map(([n,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontSize:"28px",fontWeight:800,color:"#6366f1"}}>{n}</div>
            <div style={{fontSize:"13px",color:"#64748b"}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if(page==="register") return (
    <div style={{minHeight:"100vh",background:"#0f0f1a",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem",fontFamily:"'Outfit',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{width:"100%",maxWidth:"400px",background:"#1a1a2e",borderRadius:"20px",border:"1px solid rgba(255,255,255,0.08)",padding:"2rem"}}>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:"13px",marginBottom:"1.5rem",display:"flex",alignItems:"center",gap:"6px"}}>← Back</button>
        <h2 style={{color:"#fff",fontSize:"22px",fontWeight:700,marginBottom:"0.25rem"}}>Join the group</h2>
        <p style={{color:"#64748b",fontSize:"13px",marginBottom:"1.5rem"}}>Register with your group code</p>
        {authError && <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"10px",padding:"10px 14px",color:"#ef4444",fontSize:"13px",marginBottom:"1rem"}}>{authError}</div>}
        <div style={{marginBottom:"1rem"}}>
          <label style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:"6px"}}>REAL NAAM</label>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px"}}>👤</span>
            <input value={regName} onChange={e=>setRegName(e.target.value)} type="text" placeholder="Jaise: Rahul Sharma" maxLength={50} style={{width:"100%",padding:"12px 12px 12px 40px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"#fff",fontSize:"14px",outline:"none"}}/>
          </div>
        </div>
        <div style={{marginBottom:"1rem"}}>
          <label style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:"6px"}}>FARZI NAAM <span style={{color:"#475569",fontWeight:400}}>(username)</span></label>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px"}}>😎</span>
            <input value={regFarziName} onChange={e=>setRegFarziName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g,""))} type="text" placeholder="Jaise: darkcoderr99" maxLength={20} style={{width:"100%",padding:"12px 12px 12px 40px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"#fff",fontSize:"14px",outline:"none"}}/>
          </div>
        </div>
        <div style={{marginBottom:"1rem"}}>
          <label style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:"6px"}}>GROUP CODE</label>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px"}}>🔑</span>
            <input value={regCode} onChange={e=>setRegCode(e.target.value)} type="text" placeholder="Group join code" style={{width:"100%",padding:"12px 12px 12px 40px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"#fff",fontSize:"14px",outline:"none"}}/>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"1rem"}}>
          <div>
            <label style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:"6px"}}>4-DIGIT PIN</label>
            <input value={regPin} onChange={e=>setRegPin(e.target.value)} type="password" placeholder="••••" maxLength={4} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"#fff",fontSize:"14px",outline:"none",textAlign:"center",letterSpacing:"6px"}}/>
          </div>
          <div>
            <label style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:"6px"}}>CONFIRM PIN</label>
            <input value={regConfirm} onChange={e=>setRegConfirm(e.target.value)} type="password" placeholder="••••" maxLength={4} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"#fff",fontSize:"14px",outline:"none",textAlign:"center",letterSpacing:"6px"}}/>
          </div>
        </div>
        <button onClick={handleRegister} style={{width:"100%",padding:"13px",background:"#6366f1",border:"none",borderRadius:"12px",color:"#fff",fontSize:"15px",fontWeight:600,cursor:"pointer",marginTop:"0.5rem"}}>Register 🚀</button>
        <p style={{color:"#64748b",fontSize:"13px",textAlign:"center",marginTop:"1rem"}}>Already registered? <span onClick={()=>setPage("login")} style={{color:"#6366f1",cursor:"pointer"}}>Login karo</span></p>
      </div>
    </div>
  );

  if(page==="login") return (
    <div style={{minHeight:"100vh",background:"#0f0f1a",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem",fontFamily:"'Outfit',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{width:"100%",maxWidth:"380px",background:"#1a1a2e",borderRadius:"20px",border:"1px solid rgba(255,255,255,0.08)",padding:"2rem"}}>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:"13px",marginBottom:"1.5rem"}}>← Back</button>
        <h2 style={{color:"#fff",fontSize:"22px",fontWeight:700,marginBottom:"0.25rem"}}>Welcome back</h2>
        <p style={{color:"#64748b",fontSize:"13px",marginBottom:"1.5rem"}}>Apna farzi naam aur PIN daalo</p>
        {authError && <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"10px",padding:"10px 14px",color:"#ef4444",fontSize:"13px",marginBottom:"1rem"}}>{authError}</div>}
        {showForgotPin ? (
          <div style={{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.25)",borderRadius:"14px",padding:"1.25rem",textAlign:"center",marginBottom:"1rem"}}>
            <div style={{fontSize:"28px",marginBottom:"8px"}}>😎</div>
            <div style={{color:"#fff",fontWeight:700,fontSize:"15px",marginBottom:"6px"}}>Contact Website Admin</div>
            <div style={{color:"#64748b",fontSize:"12px",lineHeight:1.6}}>Bhai PIN bhool gaye? Admin se baat karo, wahi reset karega.</div>
            <button onClick={()=>setShowForgotPin(false)} style={{marginTop:"12px",background:"none",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"6px 16px",color:"#64748b",fontSize:"12px",cursor:"pointer"}}>Wapas jao</button>
          </div>
        ) : (
          <>
            <div style={{marginBottom:"1rem"}}>
              <label style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:"6px"}}>FARZI NAAM (USERNAME)</label>
              <input value={loginUsername} onChange={e=>setLoginUsername(e.target.value.toLowerCase())} placeholder="darkcoderr99" style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"#fff",fontSize:"14px",outline:"none",marginBottom:"10px"}}/>
              <label style={{fontSize:"11px",color:"#64748b",fontWeight:600,letterSpacing:"1px",display:"block",marginBottom:"6px"}}>4-DIGIT PIN</label>
              <input value={loginPin} onChange={e=>setLoginPin(e.target.value)} type="password" placeholder="••••" maxLength={4} style={{width:"100%",padding:"12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"#fff",fontSize:"14px",outline:"none",textAlign:"center",letterSpacing:"6px"}}/>
            </div>
            <button onClick={handleLogin} style={{width:"100%",padding:"13px",background:"#6366f1",border:"none",borderRadius:"12px",color:"#fff",fontSize:"15px",fontWeight:600,cursor:"pointer"}}>Login →</button>
            <div style={{textAlign:"center",marginTop:"12px"}}>
              <span onClick={()=>setShowForgotPin(true)} style={{color:"#475569",fontSize:"12px",cursor:"pointer",textDecoration:"underline"}}>PIN bhool gaye?</span>
            </div>
          </>
        )}
        <p style={{color:"#64748b",fontSize:"13px",textAlign:"center",marginTop:"1rem"}}>Naya hoon? <span onClick={()=>setPage("register")} style={{color:"#6366f1",cursor:"pointer"}}>Register karo</span></p>
      </div>
    </div>
  );

  if(page!=="app"||!currentUser) return null;

  const lb = getLeaderboard();
  const wlb = getWeeklyLeaderboard();
  const myKey = currentUser.username || currentUser.name.toLowerCase();
  const myRank = lb.findIndex(u=>(u.username||u.name.toLowerCase())===myKey)+1;
  const myWeeklyRank = wlb.findIndex(u=>(u.username||u.name.toLowerCase())===myKey)+1;
  const myData = lb.find(u=>(u.username||u.name.toLowerCase())===myKey)||{solvedCount:0,points:0,streak:0,pct:0};
  const totalSolved = getSolvedCount(currentUser);
  const myStreak = getStreak(currentUser);

  const tabs = [
    {id:"dashboard",label:"Home",icon:"🏠"},
    {id:"problems",label:"Problems",icon:"📝"},
    {id:"leaderboard",label:"Ranks",icon:"🏆"},
    {id:"compare",label:"Compare",icon:"⚔️"},
    ...(currentUser.isAdmin ? [{id:"admin",label:"Admin",icon:"🔐"}] : [{id:"more",label:"More",icon:"🔗"}]),
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0f0f1a",fontFamily:"'Outfit',sans-serif",paddingBottom:"80px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      {toast && (
        <div style={{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",background:toast.type==="success"?"#22c55e":"#ef4444",color:"#fff",padding:"10px 20px",borderRadius:"30px",fontSize:"14px",fontWeight:600,zIndex:9999,whiteSpace:"nowrap"}}>
          {toast.msg}
        </div>
      )}

      <div style={{background:"#1a1a2e",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"14px 1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div>
          <div style={{fontSize:"11px",color:"#6366f1",letterSpacing:"2px",fontWeight:600}}>DAKSHANA SOPHOMORES</div>
          <div style={{fontSize:"15px",color:"#fff",fontWeight:600}}>Hey {currentUser.username || currentUser.name.split(" ")[0]} 👋</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{background:"rgba(99,102,241,0.15)",borderRadius:"20px",padding:"4px 12px",fontSize:"12px",color:"#818cf8",fontWeight:600}}>#{myRank} rank</div>
          <button onClick={()=>{setCurrentUser(null);setPage("home");}} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"6px 12px",color:"#64748b",fontSize:"12px",cursor:"pointer"}}>Logout</button>
        </div>
      </div>

      <div style={{padding:"1.5rem",maxWidth:"800px",margin:"0 auto"}}>

        {activeTab==="dashboard" && (
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"12px",marginBottom:"1.5rem"}}>
              {[
                {label:"Problems Solved",val:totalSolved,sub:`of ${TOTAL}`,color:"#6366f1"},
                {label:"Points Earned",val:myData.points,sub:rankFor(myData.pct),color:"#f59e0b"},
                {label:"Day Streak",val:`${myStreak}🔥`,sub:"days in a row",color:"#22c55e"},
                {label:"Group Rank",val:`#${myRank}`,sub:`of ${lb.length} members`,color:"#ec4899"},
              ].map(c=>(
                <div key={c.label} style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"1rem"}}>
                  <div style={{fontSize:"11px",color:"#64748b",fontWeight:500,marginBottom:"6px",textTransform:"uppercase",letterSpacing:"1px"}}>{c.label}</div>
                  <div style={{fontSize:"24px",fontWeight:800,color:c.color}}>{c.val}</div>
                  <div style={{fontSize:"11px",color:"#475569",marginTop:"2px"}}>{c.sub}</div>
                </div>
              ))}
            </div>

            <div style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"1.25rem",marginBottom:"1.5rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
                <span style={{color:"#fff",fontWeight:600,fontSize:"14px"}}>Overall Progress</span>
                <span style={{color:"#6366f1",fontWeight:700,fontSize:"14px"}}>{myData.pct}%</span>
              </div>
              <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"999px",height:"8px",overflow:"hidden"}}>
                <div style={{width:`${myData.pct}%`,height:"100%",background:"linear-gradient(90deg,#6366f1,#8b5cf6)",borderRadius:"999px",transition:"width 0.5s"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:"6px"}}>
                <span style={{fontSize:"11px",color:"#475569"}}>{rankFor(myData.pct)}</span>
                <span style={{fontSize:"11px",color:"#475569"}}>{totalSolved}/{TOTAL} solved</span>
              </div>
            </div>

            {/* Activity Heatmap */}
            <HeatMap u={currentUser} />

            <div style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"1.25rem",marginBottom:"1.5rem"}}>
              <div style={{color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"12px"}}>Topic Progress</div>
              {DSA_TOPICS.map(t=>{
                const done = getTopicProgress(currentUser, t.id);
                const pct = Math.round(done/t.problems.length*100);
                return (
                  <div key={t.id} style={{marginBottom:"10px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                      <span style={{fontSize:"12px",color:"#94a3b8"}}>{t.name}</span>
                      <span style={{fontSize:"12px",color:"#64748b"}}>{done}/{t.problems.length}</span>
                    </div>
                    <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"999px",height:"5px",overflow:"hidden"}}>
                      <div style={{width:`${pct}%`,height:"100%",background:pct===100?"#22c55e":"#6366f1",borderRadius:"999px"}}/>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"1.25rem"}}>
              <div style={{color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"12px"}}>Top 3 in Group</div>
              {lb.slice(0,3).map((u,i)=>(
                <div key={u.username||u.name} style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:i<2?"1px solid rgba(255,255,255,0.05)":"none"}}>
                  <div style={{width:"28px",height:"28px",borderRadius:"50%",background:i===0?"#f59e0b":i===1?"#94a3b8":"#cd7c2f",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:800,color:"#fff"}}>{i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"13px",color:"#fff",fontWeight:600}}>{u.name}</div>
                    <div style={{fontSize:"11px",color:"#64748b"}}>{u.solvedCount} solved · {u.streak}🔥</div>
                  </div>
                  <div style={{fontSize:"13px",color:"#6366f1",fontWeight:700}}>{u.points}pts</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab==="problems" && (
          <div>
            <div style={{marginBottom:"1rem"}}>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="🔍 Search problems..." style={{width:"100%",padding:"10px 14px",background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"#fff",fontSize:"14px",outline:"none",marginBottom:"10px"}}/>
              <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                {["all","easy","medium","hard"].map(d=>(
                  <button key={d} onClick={()=>setDiffFilter(d)} style={{padding:"5px 14px",borderRadius:"20px",border:"none",fontSize:"12px",fontWeight:600,cursor:"pointer",background:diffFilter===d?(d==="easy"?"#22c55e":d==="medium"?"#f59e0b":d==="hard"?"#ef4444":"#6366f1"):"rgba(255,255,255,0.07)",color:diffFilter===d?"#fff":"#64748b"}}>
                    {d.charAt(0).toUpperCase()+d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {DSA_TOPICS.map(topic=>{
              const filtered = topic.problems.filter(p=>{
                const matchDiff = diffFilter==="all"||p.diff===diffFilter;
                const matchSearch = !searchQ||p.title.toLowerCase().includes(searchQ.toLowerCase());
                return matchDiff&&matchSearch;
              });
              if(!filtered.length) return null;
              const done = topic.problems.filter(p=>isSolved(p.id)).length;
              return (
                <div key={topic.id} style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",marginBottom:"12px",overflow:"hidden"}}>
                  <div onClick={()=>setSelectedTopic(selectedTopic===topic.id?null:topic.id)} style={{padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
                    <div>
                      <div style={{color:"#fff",fontWeight:600,fontSize:"14px"}}>{topic.name}</div>
                      <div style={{fontSize:"11px",color:"#64748b",marginTop:"2px"}}>{done}/{topic.problems.length} solved</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                      <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"999px",height:"6px",width:"60px",overflow:"hidden"}}>
                        <div style={{width:`${Math.round(done/topic.problems.length*100)}%`,height:"100%",background:"#6366f1"}}/>
                      </div>
                      <span style={{color:"#64748b",fontSize:"16px"}}>{selectedTopic===topic.id?"▲":"▼"}</span>
                    </div>
                  </div>
                  {selectedTopic===topic.id && (
                    <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"8px"}}>
                      {filtered.map(p=>(
                        <div key={p.id} onClick={()=>toggleProblem(p.id)} style={{display:"flex",alignItems:"center",gap:"10px",padding:"9px 10px",borderRadius:"10px",cursor:"pointer",background:isSolved(p.id)?"rgba(99,102,241,0.1)":"transparent",marginBottom:"2px"}}>
                          <div style={{width:"20px",height:"20px",borderRadius:"6px",border:isSolved(p.id)?"none":"1.5px solid rgba(255,255,255,0.15)",background:isSolved(p.id)?"#6366f1":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"11px",color:"#fff"}}>
                            {isSolved(p.id)?"✓":""}
                          </div>
                          <span style={{flex:1,fontSize:"13px",color:isSolved(p.id)?"#94a3b8":"#e2e8f0",textDecoration:isSolved(p.id)?"line-through":"none"}}>{p.title}</span>
                          <span style={{fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"20px",background:DIFF_BG[p.diff],color:COLORS[p.diff]}}>{p.diff}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab==="leaderboard" && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.25rem"}}>
              <div style={{color:"#fff",fontSize:"18px",fontWeight:700}}>
                {lbTab==="overall" ? "🏆 Overall Ranks" : "📅 This Week"}
              </div>
              <div style={{display:"flex",gap:"6px",background:"rgba(255,255,255,0.05)",borderRadius:"12px",padding:"4px"}}>
                <button onClick={()=>setLbTab("overall")} style={{padding:"5px 14px",borderRadius:"9px",border:"none",fontSize:"12px",fontWeight:600,cursor:"pointer",background:lbTab==="overall"?"#6366f1":"transparent",color:lbTab==="overall"?"#fff":"#64748b"}}>Overall</button>
                <button onClick={()=>setLbTab("weekly")} style={{padding:"5px 14px",borderRadius:"9px",border:"none",fontSize:"12px",fontWeight:600,cursor:"pointer",background:lbTab==="weekly"?"#6366f1":"transparent",color:lbTab==="weekly"?"#fff":"#64748b"}}>This Week</button>
              </div>
            </div>

            {lbTab==="weekly" && (
              <div style={{background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:"12px",padding:"10px 14px",marginBottom:"1rem",fontSize:"12px",color:"#818cf8"}}>
                📅 Sirf is hafte (Mon–Sun) ke solved problems count ho rahe hain
              </div>
            )}

            {(lbTab==="overall" ? lb : wlb).map((u,i)=>{
              const isMe = (u.username||u.name.toLowerCase())===myKey;
              const medal = i===0?"🥇":i===1?"🥈":i===2?"🥉":null;
              const isTop = i<3;
              const topBg = i===0?"linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.05))":i===1?"linear-gradient(135deg,rgba(148,163,184,0.18),rgba(148,163,184,0.05))":i===2?"linear-gradient(135deg,rgba(205,124,47,0.18),rgba(205,124,47,0.05))":"#1a1a2e";
              const topBorder = i===0?"rgba(245,158,11,0.5)":i===1?"rgba(148,163,184,0.4)":i===2?"rgba(205,124,47,0.4)":isMe?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.07)";
              const pts = lbTab==="overall" ? u.points : u.weeklyPoints;
              const solved = lbTab==="overall" ? u.solvedCount : u.weeklySolved;
              return (
                <div key={u.username||u.name} style={{background:isTop?topBg:isMe?"rgba(99,102,241,0.15)":"#1a1a2e",border:`${isTop?"1.5px":"1px"} solid ${topBorder}`,borderRadius:"14px",padding:"14px 16px",marginBottom:"10px",display:"flex",alignItems:"center",gap:"14px",position:"relative",overflow:"hidden"}}>
                  {isTop && <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:i===0?"linear-gradient(90deg,#f59e0b,transparent)":i===1?"linear-gradient(90deg,#94a3b8,transparent)":"linear-gradient(90deg,#cd7c2f,transparent)"}}/>}
                  <div style={{width:"36px",height:"36px",borderRadius:"50%",background:i===0?"rgba(245,158,11,0.2)":i===1?"rgba(148,163,184,0.2)":i===2?"rgba(205,124,47,0.2)":"rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:isTop?"18px":"14px",fontWeight:800,color:i===0?"#f59e0b":i===1?"#94a3b8":i===2?"#cd7c2f":"#475569",flexShrink:0}}>
                    {medal || (i+1)}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
                      <span style={{color:"#fff",fontWeight:isTop?700:600,fontSize:isTop?"15px":"14px"}}>{u.username||u.name}</span>
                      {u.name&&u.username&&<span style={{fontSize:"10px",color:"#475569"}}>({u.name})</span>}
                      {isMe&&<span style={{fontSize:"10px",background:"rgba(99,102,241,0.3)",color:"#818cf8",padding:"1px 8px",borderRadius:"20px"}}>You</span>}
                    </div>
                    <div style={{fontSize:"11px",color:"#64748b",marginTop:"2px"}}>{rankFor(u.pct)} · {u.streak}🔥</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{color:i===0?"#f59e0b":i===1?"#94a3b8":i===2?"#cd7c2f":"#6366f1",fontWeight:800,fontSize:isTop?"18px":"16px"}}>{pts}pts</div>
                    <div style={{fontSize:"11px",color:"#475569"}}>{solved} solved</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab==="compare" && (
          <div>
            <div style={{color:"#fff",fontSize:"18px",fontWeight:700,marginBottom:"1.25rem"}}>⚔️ Compare</div>
            <select value={compareUser} onChange={e=>setCompareUser(e.target.value)} style={{width:"100%",padding:"10px 14px",background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"#fff",fontSize:"14px",outline:"none",marginBottom:"1.5rem"}}>
              <option value="">Dost select karo...</option>
              {Object.values(users).filter(u=>(u.username||u.name.toLowerCase())!==myKey).map(u=>(
                <option key={u.username||u.name} value={u.username||u.name.toLowerCase()}>{u.username||u.name}{u.username&&u.name?` (${u.name})`:""}</option>
              ))}
            </select>

            {compareUser && (() => {
              const them = users[compareUser];
              if(!them) return null;
              const me = currentUser;
              const mySolved = getSolvedCount(me);
              const theirSolved = getSolvedCount(them);
              const myPts = getPoints(me);
              const theirPts = getPoints(them);
              const myStr = getStreak(me);
              const theirStr = getStreak(them);
              return (
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"10px",marginBottom:"1.5rem",alignItems:"center"}}>
                    <div style={{background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.3)",borderRadius:"14px",padding:"1rem",textAlign:"center"}}>
                      <div style={{color:"#818cf8",fontSize:"12px",fontWeight:600,marginBottom:"4px"}}>You</div>
                      <div style={{color:"#fff",fontSize:"18px",fontWeight:800}}>{me.username||me.name.split(" ")[0]}</div>
                    </div>
                    <div style={{color:"#475569",fontWeight:800,fontSize:"18px",textAlign:"center"}}>VS</div>
                    <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"14px",padding:"1rem",textAlign:"center"}}>
                      <div style={{color:"#64748b",fontSize:"12px",fontWeight:600,marginBottom:"4px"}}>Opponent</div>
                      <div style={{color:"#fff",fontSize:"18px",fontWeight:800}}>{them.username||them.name.split(" ")[0]}</div>
                    </div>
                  </div>

                  {[
                    {label:"Problems Solved",my:mySolved,their:theirSolved},
                    {label:"Points",my:myPts,their:theirPts},
                    {label:"Streak 🔥",my:myStr,their:theirStr},
                  ].map(row=>{
                    const total=(row.my+row.their)||1;
                    const myPct=Math.round(row.my/total*100);
                    const iWin=row.my>row.their;
                    return (
                      <div key={row.label} style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"14px",padding:"14px",marginBottom:"10px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
                          <span style={{color:iWin?"#22c55e":"#e2e8f0",fontSize:"16px",fontWeight:800}}>{row.my}</span>
                          <span style={{color:"#64748b",fontSize:"12px"}}>{row.label}</span>
                          <span style={{color:!iWin&&row.their>row.my?"#22c55e":"#e2e8f0",fontSize:"16px",fontWeight:800}}>{row.their}</span>
                        </div>
                        <div style={{display:"flex",borderRadius:"999px",height:"8px",overflow:"hidden",gap:"2px"}}>
                          <div style={{width:`${myPct}%`,background:"#6366f1",borderRadius:"999px 0 0 999px"}}/>
                          <div style={{width:`${100-myPct}%`,background:"#475569",borderRadius:"0 999px 999px 0"}}/>
                        </div>
                      </div>
                    );
                  })}

                  {/* Topic-wise comparison with green/red */}
                  <div style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"14px",padding:"14px"}}>
                    <div style={{color:"#fff",fontWeight:600,fontSize:"13px",marginBottom:"12px"}}>Topic-wise Comparison</div>
                    {DSA_TOPICS.map(t=>{
                      const myD = getTopicProgress(me, t.id);
                      const thD = getTopicProgress(them, t.id);
                      const iAhead = myD > thD;
                      const theyAhead = thD > myD;
                      const tied = myD === thD;
                      return (
                        <div key={t.id} style={{marginBottom:"10px",background:"rgba(255,255,255,0.02)",borderRadius:"10px",padding:"8px 10px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}}>
                            <span style={{fontSize:"11px",color:"#94a3b8",flex:1}}>{t.name}</span>
                            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                              <span style={{fontSize:"12px",fontWeight:700,color:iAhead?"#22c55e":theyAhead?"#ef4444":"#64748b"}}>{myD}</span>
                              <span style={{fontSize:"10px",color:"#475569"}}>vs</span>
                              <span style={{fontSize:"12px",fontWeight:700,color:theyAhead?"#22c55e":iAhead?"#ef4444":"#64748b"}}>{thD}</span>
                              <span style={{fontSize:"12px"}}>{iAhead?"🟢":theyAhead?"🔴":"⚪"}</span>
                            </div>
                          </div>
                          <div style={{display:"flex",gap:"2px",height:"4px",borderRadius:"999px",overflow:"hidden"}}>
                            <div style={{flex:myD||0.1,background:iAhead?"#22c55e":theyAhead?"#ef4444":"#6366f1",borderRadius:"999px"}}/>
                            <div style={{flex:thD||0.1,background:theyAhead?"#22c55e":iAhead?"#ef4444":"#475569",borderRadius:"999px"}}/>
                          </div>
                        </div>
                      );
                    })}
                    <div style={{display:"flex",gap:"16px",marginTop:"10px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:"10px",height:"10px",background:"#6366f1",borderRadius:"2px"}}/><span style={{fontSize:"11px",color:"#64748b"}}>You</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:"10px",height:"10px",background:"#475569",borderRadius:"2px"}}/><span style={{fontSize:"11px",color:"#64748b"}}>{them.username||them.name.split(" ")[0]}</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:"4px"}}><span style={{fontSize:"12px"}}>🟢</span><span style={{fontSize:"11px",color:"#64748b"}}>Tu aage</span></div>
                      <div style={{display:"flex",alignItems:"center",gap:"4px"}}><span style={{fontSize:"12px"}}>🔴</span><span style={{fontSize:"11px",color:"#64748b"}}>Woh aage</span></div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {activeTab==="admin" && currentUser.isAdmin && (
          <div>
            <div style={{color:"#fff",fontSize:"18px",fontWeight:700,marginBottom:"4px"}}>🔐 Admin Panel</div>
            <div style={{color:"#64748b",fontSize:"12px",marginBottom:"1.25rem"}}>Sabka data yahan hai — responsibly use karo 🙏</div>
            {Object.values(users).map(u => {
              const uKey = u.username || u.name.toLowerCase();
              const isExpanded = adminSelectedUser === uKey;
              const solvedCount = getSolvedCount(u);
              const pts = getPoints(u);
              return (
                <div key={uKey} style={{background:"#1a1a2e",border:`1px solid ${isExpanded?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.07)"}`,borderRadius:"14px",marginBottom:"10px",overflow:"hidden"}}>
                  <div onClick={()=>{setAdminSelectedUser(isExpanded?null:uKey);setAdminEditPin("");setAdminExpandTopic(null);}} style={{padding:"12px 16px",display:"flex",alignItems:"center",gap:"12px",cursor:"pointer"}}>
                    <div style={{width:"36px",height:"36px",borderRadius:"50%",background:u.isAdmin?"rgba(239,68,68,0.2)":"rgba(99,102,241,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",flexShrink:0}}>
                      {u.isAdmin?"🔐":"👤"}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                        <span style={{color:"#fff",fontWeight:600,fontSize:"14px"}}>{u.username||u.name}</span>
                        {u.name&&u.username&&<span style={{fontSize:"10px",color:"#475569"}}>({u.name})</span>}
                        {u.isAdmin&&<span style={{fontSize:"10px",background:"rgba(239,68,68,0.2)",color:"#ef4444",padding:"1px 7px",borderRadius:"20px"}}>Admin</span>}
                        {u.hidden&&<span style={{fontSize:"10px",background:"rgba(255,255,255,0.07)",color:"#64748b",padding:"1px 7px",borderRadius:"20px"}}>Hidden</span>}
                      </div>
                      <div style={{fontSize:"11px",color:"#64748b",marginTop:"2px"}}>{solvedCount} solved · {pts} pts · PIN: {u.pin}</div>
                    </div>
                    <span style={{color:"#475569",fontSize:"14px"}}>{isExpanded?"▲":"▼"}</span>
                  </div>
                  {isExpanded && (
                    <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",padding:"14px 16px",display:"flex",flexDirection:"column",gap:"12px"}}>
                      <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"12px",padding:"12px"}}>
                        <div style={{color:"#94a3b8",fontSize:"12px",fontWeight:600,marginBottom:"8px"}}>🔑 PIN Reset</div>
                        <div style={{display:"flex",gap:"8px"}}>
                          <input value={adminEditPin} onChange={e=>setAdminEditPin(e.target.value.replace(/\D/g,"").slice(0,4))} type="password" placeholder="Naya PIN (4 digits)" maxLength={4}
                            style={{flex:1,padding:"9px 12px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"9px",color:"#fff",fontSize:"13px",outline:"none",textAlign:"center",letterSpacing:"4px"}}/>
                          <button onClick={async()=>{
                            if(adminEditPin.length!==4||!/^\d{4}$/.test(adminEditPin)){showToast("4 digit PIN daalo","error");return;}
                            const updated={...users[uKey],pin:adminEditPin};
                            await saveUsers({...users,[uKey]:updated});
                            setAdminEditPin("");
                            showToast(`${uKey} ka PIN reset ho gaya ✅`);
                          }} style={{padding:"9px 16px",background:"#6366f1",border:"none",borderRadius:"9px",color:"#fff",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>Reset</button>
                        </div>
                      </div>
                      <div style={{display:"flex",gap:"8px"}}>
                        <button onClick={async()=>{
                          const updated={...users[uKey],hidden:!u.hidden};
                          await saveUsers({...users,[uKey]:updated});
                          showToast(`${uKey} ${updated.hidden?"leaderboard se hata diya":"leaderboard mein wapas laya"} ✅`);
                        }} style={{flex:1,padding:"9px",background:u.hidden?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.05)",border:`1px solid ${u.hidden?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.1)"}`,borderRadius:"9px",color:u.hidden?"#22c55e":"#64748b",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>
                          {u.hidden?"👁️ Leaderboard pe dikhao":"🙈 Leaderboard se chhupaao"}
                        </button>
                        {uKey!==myKey && (
                          confirmDeleteUser===uKey ? (
                            <div style={{display:"flex",gap:"6px"}}>
                              <button onClick={async()=>{
                                const newU={...users};
                                delete newU[uKey];
                                await saveUsers(newU);
                                setAdminSelectedUser(null);
                                setConfirmDeleteUser(null);
                                showToast(`${uKey} delete ho gaya 🗑️`);
                              }} style={{padding:"9px 14px",background:"#ef4444",border:"none",borderRadius:"9px",color:"#fff",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>Haan, delete karo</button>
                              <button onClick={()=>setConfirmDeleteUser(null)} style={{padding:"9px 12px",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"9px",color:"#94a3b8",fontSize:"12px",cursor:"pointer"}}>Nahi</button>
                            </div>
                          ) : (
                            <button onClick={()=>setConfirmDeleteUser(uKey)} style={{padding:"9px 14px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"9px",color:"#ef4444",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>🗑️ Delete</button>
                          )
                        )}
                      </div>
                      <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"12px",padding:"12px"}}>
                        <div style={{color:"#94a3b8",fontSize:"12px",fontWeight:600,marginBottom:"8px"}}>📊 Progress (tap topic to toggle)</div>
                        {DSA_TOPICS.map(t=>{
                          const topicDone=getTopicProgress(u,t.id);
                          const isTopExpanded=adminExpandTopic===(uKey+"_"+t.id);
                          return (
                            <div key={t.id} style={{marginBottom:"4px"}}>
                              <div onClick={()=>setAdminExpandTopic(isTopExpanded?null:(uKey+"_"+t.id))} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 8px",borderRadius:"8px",cursor:"pointer",background:isTopExpanded?"rgba(99,102,241,0.1)":"transparent"}}>
                                <span style={{fontSize:"12px",color:"#e2e8f0"}}>{t.name}</span>
                                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                                  <span style={{fontSize:"11px",color:"#64748b"}}>{topicDone}/{t.problems.length}</span>
                                  <span style={{fontSize:"11px",color:"#475569"}}>{isTopExpanded?"▲":"▼"}</span>
                                </div>
                              </div>
                              {isTopExpanded && (
                                <div style={{padding:"6px 0 6px 8px",display:"flex",flexDirection:"column",gap:"2px"}}>
                                  {t.problems.map(p=>{
                                    const done=!!(u.solved?.[p.id]);
                                    return (
                                      <div key={p.id} onClick={async()=>{
                                        const solved={...(users[uKey].solved||{})};
                                        const activity=[...(users[uKey].activity||[])];
                                        if(done){delete solved[p.id];}
                                        else{solved[p.id]=Date.now();activity.push(todayStr());}
                                        const updated={...users[uKey],solved,activity};
                                        await saveUsers({...users,[uKey]:updated});
                                        showToast(done?"Unmarked":"Marked solved ✅");
                                      }} style={{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"7px",cursor:"pointer",background:done?"rgba(99,102,241,0.08)":"transparent"}}>
                                        <div style={{width:"16px",height:"16px",borderRadius:"4px",border:done?"none":"1px solid rgba(255,255,255,0.15)",background:done?"#6366f1":"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",color:"#fff",flexShrink:0}}>{done?"✓":""}</div>
                                        <span style={{fontSize:"11px",color:done?"#64748b":"#94a3b8",textDecoration:done?"line-through":"none",flex:1}}>{p.title}</span>
                                        <span style={{fontSize:"9px",fontWeight:700,padding:"1px 6px",borderRadius:"20px",background:DIFF_BG[p.diff],color:COLORS[p.diff]}}>{p.diff}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab==="more" && (
          <div>
            <div style={{color:"#fff",fontSize:"18px",fontWeight:700,marginBottom:"1.25rem"}}>More</div>
            <div style={{background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",overflow:"hidden",marginBottom:"1rem"}}>
              {[
                {icon:"📊",label:"Striver A2Z Sheet",sub:"Original sheet on TakeUForward",url:"https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"},
                {icon:"▶️",label:"Striver's YouTube",sub:"Video solutions playlist",url:"https://www.youtube.com/@takeUforward"},
              ].map((item,i)=>(
                <a key={item.label} href={item.url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:"12px",padding:"14px 16px",borderBottom:i<1?"1px solid rgba(255,255,255,0.05)":"none",textDecoration:"none"}}>
                  <div style={{fontSize:"20px"}}>{item.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{color:"#fff",fontSize:"13px",fontWeight:600}}>{item.label}</div>
                    <div style={{color:"#64748b",fontSize:"11px"}}>{item.sub}</div>
                  </div>
                  <span style={{color:"#475569"}}>→</span>
                </a>
              ))}
            </div>
            <div style={{background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:"16px",padding:"14px 16px"}}>
              <div style={{color:"#ef4444",fontWeight:600,fontSize:"13px",marginBottom:"4px"}}>Logout</div>
              <div style={{color:"#64748b",fontSize:"12px",marginBottom:"12px"}}>Apna progress save rahega</div>
              <button onClick={()=>{setCurrentUser(null);setPage("home");}} style={{padding:"8px 20px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:"8px",color:"#ef4444",fontSize:"13px",cursor:"pointer",fontWeight:600}}>Logout karo</button>
            </div>
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#1a1a2e",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",zIndex:100}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{flex:1,padding:"12px 4px 10px",background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}>
            <span style={{fontSize:"18px"}}>{t.icon}</span>
            <span style={{fontSize:"10px",fontWeight:600,color:activeTab===t.id?"#6366f1":"#475569"}}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
