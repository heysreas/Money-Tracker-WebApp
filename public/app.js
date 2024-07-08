document.getElementById('transaction-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;

  const response = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, amount, description })
  });

  if (response.ok) {
    const transaction = await response.json();
    addTransactionToDOM(transaction);
  }
});

function addTransactionToDOM(transaction) {
  const transactionsList = document.getElementById('transactions-list');
  const transactionItem = document.createElement('li');
  transactionItem.textContent = `${transaction.type}: $${transaction.amount} - ${transaction.description}`;
  transactionsList.appendChild(transactionItem);
}

async function fetchTransactions() {
  const response = await fetch('/api/transactions');
  const transactions = await response.json();
  transactions.forEach(addTransactionToDOM);
}

fetchTransactions();
