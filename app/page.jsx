'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, RefreshCw, Search, TrendingUp, Globe2 } from 'lucide-react';

export default function Home() {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [target, setTarget] = useState('NGN');
  const [converted, setConverted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchRates = async (baseCurrency) => {
    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        setLastUpdated(new Date(data.time_last_update_utc).toLocaleTimeString());
      }
    } catch (err) {
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(base);
  }, [base]);

  useEffect(() => {
    if (rates[target]) {
      setConverted((amount * rates[target]).toFixed(2));
    }
  }, [amount, target, rates]);

  const handleSwap = () => {
    setBase(target);
    setTarget(base);
  };

  const currencyList = Object.keys(rates);
  const filteredCurrencies = currencyList.filter((code) =>
    code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30">
            <Globe2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Young Rate
            </h1>
            <p className="text-xs text-slate-400">Kasuwancin Agogon Kudaden Duniya (Live Exchange)</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Market Data
          </span>
          {lastUpdated && <span>Updated: {lastUpdated}</span>}
        </div>
      </header>

      {/* Main Converter Card */}
      <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 md:p-8 shadow-xl mb-12">
        <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Currency Converter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
          {/* Amount Input */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-400 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition font-mono text-lg"
              min="0"
            />
          </div>

          {/* From Currency */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-400 mb-2">From</label>
            <select
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition font-semibold"
            >
              {currencyList.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-4 md:pt-0">
            <button
              onClick={handleSwap}
              className="p-3 bg-slate-800 hover:bg-indigo-600 rounded-full text-slate-300 hover:text-white transition duration-200 shadow-md"
              title="Swap Currencies"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* To Currency */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-400 mb-2">To</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition font-semibold"
            >
              {currencyList.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Output */}
        <div className="mt-8 p-6 bg-indigo-950/30 rounded-xl border border-indigo-900/40 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-indigo-300/80 mb-1">Converted Value</p>
            <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {amount} {base} = <span className="text-indigo-400">{converted} {target}</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
            1 {base} = {rates[target]} {target}
          </div>
        </div>
      </div>

      {/* Live Exchange Rate Table */}
      <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Live Exchange Rates (Base: {base})</h3>
            <p className="text-xs text-slate-400">Dubi duk kudaden duniya idan aka kwatanta da {base}</p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Nemi currency (e.g. NGN, EUR)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto pr-2">
            {filteredCurrencies.map((code) => (
              <div
                key={code}
                className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 hover:border-indigo-500/50 transition flex justify-between items-center"
              >
                <span className="font-bold text-sm text-indigo-300">{code}</span>
                <span className="font-mono text-xs text-slate-300">
                  {rates[code]?.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-600">
        &copy; {new Date().getFullYear()} Young Rate.
      </footer>
    </div>
  );
}
