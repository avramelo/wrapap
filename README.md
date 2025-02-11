# Wrap App

Simple dapp for wrapping and unwrapping ETH/WETH on Sepolia testnet. Supports both EOA and Safe Wallet transactions.

## Features

- Connect with any Web3 wallet via RainbowKit
- Support for Safe wallets
- Wrap ETH to WETH and unwrap WETH to ETH
- Real-time balance updates
- Transaction notifications

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables by creating `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

- [RainbowKit](https://rainbowkit.com) - Wallet connection UI
- [wagmi](https://wagmi.sh) - React Hooks for Ethereum
- [Next.js](https://nextjs.org/) - React Framework
- [Safe SDK](https://github.com/safe-global/safe-core-sdk) - Safe Wallet Integration
- [Material-UI](https://mui.com) - UI Components

## Testing

Make sure you have:

- Sepolia testnet in your wallet
- Some Sepolia ETH (use a faucet)
- Safe wallet on Sepolia (optional)

## Deploy on Vercel

Deploy using [Vercel Platform](https://vercel.com/new).
Don't forget to add environment variables in your Vercel project settings.
