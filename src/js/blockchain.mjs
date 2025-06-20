// js/blockchain.mjs
const token = localStorage.getItem('token');
if (!token) window.location.href = './index.html';

const api = 'http://localhost:5050';

async function fetchBlocks() {
  const res = await fetch(`${api}/blocks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  displayBlocks(data.data);
}

async function fetchTransactions() {
  const res = await fetch(`${api}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  displayTransactions(data.data);
}

function displayBlocks(blocks) {
  const container = document.getElementById('blocks');
  container.innerHTML = blocks
    .map(
      (block) => `
      <div class="block">
        <p><strong>Hash:</strong> ${block.hash}</p>
        <p><strong>Previous:</strong> ${block.lastHash}</p>
        <p><strong>Data:</strong> ${JSON.stringify(block.data)}</p>
      </div>`
    )
    .join('');
}

function displayTransactions(transactions) {
  const container = document.getElementById('transactions');
  container.innerHTML = transactions
    .map(
      (tx) => `
      <div class="transaction">
        <p>Från: ${tx.input?.address}</p>
        <p>Belopp: ${tx.output?.amount}</p>
        <p>Till: ${Object.keys(tx.output || {}).join(', ')}</p>
      </div>`
    )
    .join('');
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const query = document.getElementById('searchInput').value;
  // valfri sökfunktion
});

fetchBlocks();
fetchTransactions();
