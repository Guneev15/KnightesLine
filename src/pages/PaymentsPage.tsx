import React from 'react';
import { CreditCard, Download, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { shatranjStore } from '../services/store';

interface PaymentsPageProps {
  onNavigate: (path: string) => void;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({ onNavigate }) => {
  const payments = shatranjStore.getPayments();

  const handleDownloadInvoice = (invoiceNo: string) => {
    const text = `KNIGHTESLINE ACADEMY PVT LTD\nOFFICIAL PAYMENT RECEIPT\n--------------------------------\nInvoice No: ${invoiceNo}\nDate: ${new Date().toLocaleDateString()}\nStatus: PAID / SUCCESSFUL\nPayment Gateway: Razorpay India\nCurrency: INR (₹)\n--------------------------------\nThank you for training with Knightesline Classical Chess Academy!`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceNo}.txt`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-serif-classic">
            Billing & Invoices
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 font-serif-classic tracking-tight mt-1">
            Payment History & Official Receipts
          </h1>
        </div>

        <button
          onClick={() => onNavigate('subscription')}
          className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-slate-200 hover:text-white"
        >
          Manage Subscription →
        </button>
      </div>

      {/* Receipts Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Invoice & Plan</span>
          <div className="flex items-center gap-8">
            <span>Date & Mode</span>
            <span>Amount</span>
            <span>Action</span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/80 text-xs">
          {payments.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs space-y-1">
              <CreditCard className="w-6 h-6 text-slate-500 mx-auto mb-2 opacity-60" />
              <div className="font-semibold text-slate-300">No Payment Receipts Yet</div>
              <div className="text-[11px] text-slate-500">Official GST receipts and membership invoices will appear here once you subscribe.</div>
            </div>
          ) : (
            payments.map((p) => (
            <div key={p.id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>{p.planName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                    {p.invoiceNo}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{p.status} via {p.paymentMethod}</span>
                </div>
              </div>

              <div className="flex items-center gap-8 self-end sm:self-auto">
                <span className="text-slate-400 font-mono">{p.date}</span>
                <span className="font-bold font-mono text-sm text-white">
                  ₹{p.amount.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => handleDownloadInvoice(p.invoiceNo)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>PDF Receipt</span>
                </button>
              </div>
            </div>
          )))}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 text-xs text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>All transactions are secured by Razorpay India with 256-bit bank encryption. GST invoices are downloadable instantly.</span>
      </div>

    </div>
  );
};
