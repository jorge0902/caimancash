const STORAGE_KEY = 'caiman_demo_v1';

const DEFAULT_DEMO = {
  balance: 50000,
  currency: 'RUB',
  label: 'Cuenta Demo',
  rate: 10.3,
  methods: [
    { id: 'm1', type: 'Tarjeta bancaria', number: '•••• 4582', name: 'María Rodríguez', phone: '+53 5 123 4567' }
  ],
  remittances: [],
  nextId: 1
};

const getDemo = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_DEMO, ...parsed };
    }
  } catch (e) {
    console.error('Error reading demo store', e);
  }
  return { ...DEFAULT_DEMO };
};

const saveDemo = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving demo store', e);
  }
};

const createRemittance = (data) => {
  const demo = getDemo();
  if (data.amount > demo.balance) {
    throw new Error('Saldo insuficiente');
  }
  const id = `rem_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const ref = 'CC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const now = new Date().toISOString();
  
  const remit = {
    id,
    ref,
    amount: data.amount,
    currency: 'RUB',
    receiveAmount: Math.round(data.amount * demo.rate),
    receiveCurrency: 'CUP',
    rate: demo.rate,
    recipient: data.recipient,
    phone: data.phone,
    method: data.method || demo.methods[0]?.type || 'Tarjeta bancaria',
    methodNumber: data.methodNumber || demo.methods[0]?.number || '',
    status: 'created',
    statusLabel: 'Remesa creada',
    timeline: [
      { status: 'created', label: 'Remesa creada', description: 'Recibimos correctamente tu solicitud.', date: new Date(now).toLocaleString('es-ES') }
    ],
    createdAt: now
  };
  
  demo.balance -= data.amount;
  demo.remittances.push(remit);
  saveDemo(demo);
  
  return remit;
};

const updateRemittanceStatus = (ref, status, label, description) => {
  const demo = getDemo();
  const remit = demo.remittances.find(r => r.ref === ref);
  if (!remit) return null;
  
  remit.status = status;
  remit.statusLabel = label;
  remit.timeline.push({
    status,
    label,
    description,
    date: new Date().toLocaleString('es-ES')
  });
  saveDemo(demo);
  return remit;
};

const addMethod = (method) => {
  const demo = getDemo();
  const newMethod = {
    id: `m_${Date.now()}`,
    type: method.type,
    number: method.number || '',
    name: method.name,
    phone: method.phone || ''
  };
  demo.methods.push(newMethod);
  saveDemo(demo);
  return newMethod;
};

const resetDemo = () => {
  const fresh = JSON.parse(JSON.stringify(DEFAULT_DEMO));
  saveDemo(fresh);
  return fresh;
};

export { getDemo, saveDemo, createRemittance, updateRemittanceStatus, addMethod, resetDemo, DEFAULT_DEMO };
