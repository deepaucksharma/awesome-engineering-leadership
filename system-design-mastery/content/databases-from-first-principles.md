# Databases: From Magnetic Disks to B-Trees

## The Physical Reality

Let's start with a simple question: **Why are databases slow?**

To understand this, we need to go down to the hardware level.

### The Spinning Disk Problem

A traditional hard drive is literally a spinning metal disk with a magnetic head that moves to read data. Here's what happens when you read data:

1. **Seek Time**: The head physically moves to the right track (~10ms)
2. **Rotational Latency**: Wait for the disk to spin to the right position (~4ms for 7200 RPM)
3. **Transfer Time**: Actually read the data (~0.1ms for 4KB)

**Total: ~14ms to read 4KB of random data**

> 💡 **Key Insight**: Random access is 140x slower than sequential! This is why database design is obsessed with minimizing random reads.

## From Files to Databases

### Attempt 1: Just Use a File

Let's say we have a simple CSV file with user data:
```
id,name,email
1,Alice,alice@example.com
2,Bob,bob@example.com
...
1000000,Zara,zara@example.com
```

To find user with id=500000:
- Read each line until we find it
- Average case: Read 500,000 lines
- At 100 bytes/line = 50MB of reading
- Time: ~3.5 seconds on HDD

**This doesn't scale.**

### Attempt 2: Binary Search with Sorted File

If we keep the file sorted by ID:
- Binary search needs log₂(1,000,000) ≈ 20 reads
- 20 random reads × 14ms = 280ms

**Better, but still slow for a simple lookup.**

### Attempt 3: Index Everything in Memory

Load all IDs into a hash table in RAM:
- Lookup time: ~100 nanoseconds
- But needs 1M × 8 bytes = 8MB of RAM just for IDs
- For 1B users = 8GB of RAM

**Fast, but expensive and volatile.**

## Enter the B-Tree

B-Trees solve this elegantly by:
1. Keeping data sorted for efficient search
2. Minimizing disk reads through high branching factor
3. Keeping frequently accessed nodes in memory

### How B-Trees Minimize Disk I/O

Traditional binary tree with 1M nodes:
- Height ≈ 20
- Each node = 1 disk read
- Total: 20 disk reads

B-Tree with branching factor 100:
- Height ≈ 3
- Each node contains 100 keys
- Total: 3 disk reads

**That's 85% fewer disk operations!**

## Real Numbers from Production Systems

Here's actual data from a production PostgreSQL database:

```
Table: users (10M rows)
Index: btree on user_id

Operation               | Without Index | With B-Tree Index
------------------------|---------------|------------------
Find by ID              | 7,234 ms      | 0.2 ms
Insert new row          | 0.5 ms        | 2.1 ms
Delete by ID            | 7,234 ms      | 0.8 ms
Range query (1K rows)   | 7,234 ms      | 12 ms
```

## The Trade-offs

Nothing is free in system design:

### Space
- B-Tree index adds ~20-30% storage overhead
- Each index is essentially a sorted copy of your data

### Write Performance
- Every insert must update the index
- Can trigger node splits (expensive operation)
- That's why writes become 4x slower

### Memory
- B-Tree nodes must fit in memory pages (typically 4KB or 8KB)
- Database keeps "hot" nodes in buffer pool

## Practical Implications

1. **Why PRIMARY KEY matters**: It determines physical data order
2. **Why too many indexes hurt**: Each write updates ALL indexes  
3. **Why ORDER BY is fast with indexes**: Data is already sorted
4. **Why LIKE '%search%' is slow**: Can't use index, must scan everything

## Interactive Exercise

Try our [B-Tree Visualizer](/playground/btree) to:
- Insert/delete values and watch tree rebalance
- See exactly which nodes are accessed for each operation
- Understand why B-Trees stay balanced
- Experiment with different branching factors

## Key Takeaways

1. **Physics drives design**: 14ms disk seek time shapes everything
2. **B-Trees trade space for speed**: 30% more storage for 1000x faster reads
3. **Nothing is magic**: Every optimization has a cost
4. **Measure, don't guess**: Real numbers beat intuition

Next lesson: [Write-Ahead Logs: Why Databases Don't Lose Your Data →](/fundamentals/storage/wal)
