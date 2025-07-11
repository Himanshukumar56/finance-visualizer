import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

const TransactionForm = ({ onTransactionAdded }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      description,
      amount,
      date,
    };

    axios.post('/api/transactions/add', newTransaction)
      .then(res => {
        console.log(res.data);
        onTransactionAdded();
      });

    setDescription('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee, Lunch, etc."
            required
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in Rupees"
            required
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            required
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <Button type="submit" className="w-full">Add Transaction</Button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default TransactionForm;
