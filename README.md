# Shop3

Shop3 — Node.js project (agent.js, index.js, memory.js, payment.js, publish.js, search.js)

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your secrets:

```bash
cp .env.example .env
```

3. Make sure the following Zerodev payment gateway values are set in `.env`:

```bash
ZERODEV_PROJECT_ID=391415d7-7b73-4531-ba86-94268ecedfef
ZERODEV_RPC_URL=https://rpc.zerodev.app/api/v3/391415d7-7b73-4531-ba86-94268ecedfef/chain/84532
```

This project now uses the ZeroDev SDK `createKernelAccountClient` smart wallet flow on Base Sepolia, so payments are executed through your ZeroDev project RPC endpoint.

4. (Optional) Run the local search middleware:

```bash
npm run start:server
```

5. Run the app:

```bash
node index.js
```

## Observability (Datadog)

Shop3 is instrumented with [Datadog APM](https://www.datadoghq.com/) via `dd-trace`. All agent runs, tool calls, payments, and on-chain confirmations are traced automatically.

### What's tracked

| Metric | Type | Description |
|---|---|---|
| `shop3.agent.run.started` | count | Agent invocation started |
| `shop3.agent.run.completed` | count | Agent completed full flow |
| `shop3.agent.run.duration_ms` | distribution | End-to-end agent run time |
| `shop3.tool.duration_ms` | distribution | Per-tool execution time (tag: `tool`) |
| `shop3.search.results_count` | gauge | Number of search results returned |
| `shop3.payment.tx.submitted` | count | On-chain tx submitted (tags: `token`, `chain`) |
| `shop3.payment.tx.confirmed` | count | On-chain tx confirmed |
| `shop3.payment.tx.error` | count | Payment failed (tag: `reason`) |
| `shop3.payment.amount_usd` | gauge | USD amount paid per transaction |
| `shop3.payment.daily_spend_usd` | gauge | Running daily spend total |
| `shop3.payment.confirmation_ms` | distribution | Time to on-chain confirmation |

APM traces cover the full `search → pay → log → publish` flow with child spans per tool call.

### Setup

1. Install the Datadog Agent: https://docs.datadoghq.com/agent/
2. Add your API key to `.env`:

```bash
DD_API_KEY=your_api_key_here
DD_AGENT_HOST=localhost   # default
DD_AGENT_PORT=8126        # default
```

3. The agent auto-instruments on startup — no code changes needed.

## Agent Wallet

The agent's smart wallet address on Base Sepolia:

```
0x490776E3c67986f1A2385413e52FAeE1772A729A
```

Fund it with testnet USDC to enable autonomous payments.

## Contributing

Please read [CONTRIBUTING](.github/CONTRIBUTING.md) before opening issues or PRs.

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Collaborators

- @Cooldeepcode
- @wd7zfpysvs-ui
- @yogeshramchandani7
