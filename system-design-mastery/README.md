# System Design Mastery - Interactive Learning Platform

## 🚀 Overview

A revolutionary system design course that teaches from first principles through interactive simulations, not slides. No jargon, no magic, just understanding.

## 🎯 Key Features

### Interactive Learning
- **Live System Simulations**: See requests flow through systems in real-time
- **Latency Calculator**: Build intuition for real-world performance
- **Drag-and-Drop Playground**: Design systems visually
- **First Principles Approach**: Start with physics, build up to distributed systems

### Unique Innovations
- **No Slides**: Everything is interactive and explorable
- **Learn by Breaking**: Intentionally cause failures to understand resilience
- **Real Numbers**: Actual benchmarks and measurements, not estimates
- **Cost Awareness**: See real AWS/GCP costs for your designs

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **3D Graphics**: Three.js for network visualizations
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Code Execution**: Monaco Editor + WebAssembly

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sysDesignContent.git
cd sysDesignContent

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── fundamentals/      # Core concept modules
│   ├── playground/        # Interactive design canvas
│   └── case-studies/      # Real system breakdowns
├── components/            
│   ├── lessons/          # Interactive lesson components
│   ├── playground/       # Design canvas components
│   └── visualizers/      # Algorithm visualizers
└── simulations/          # System simulations
```

## 📚 Course Content

### Module 0: The Physics of Computing
- Speed of light limitations
- Why latency matters
- Hardware constraints

### Module 1: Building Blocks
- Storage: From bits to databases
- Networking: From packets to protocols  
- Compute: From threads to containers

### Module 2: Distributed Fundamentals
- Consensus algorithms (visual Paxos/Raft)
- Time and ordering in distributed systems
- Replication strategies

### Module 3: Real Systems Deconstructed
- WhatsApp: Scaling to 1 billion users
- UPI: 10 billion transactions/month
- Hotstar: 25M concurrent viewers

## 🚀 Deployment

The site is automatically deployed to GitHub Pages when you push to the `main` branch.

### Manual Deployment

1. Build the static export:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the need for better system design education
- Built for engineers who want to truly understand, not memorize
- Special thanks to the open source community

---

**Remember**: The best way to learn system design is by building and breaking things. Start with the playground and experiment freely!
