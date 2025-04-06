interface TransactionMetadata {
    name?: string;
    type?: string;
    email?: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  }
  
  interface Transaction {
    amount: number;
    metadata?: TransactionMetadata;
    payment_reference?: string;
    status: string;
    type: 'deposit' | 'withdrawal';
    date: string;
  }
  