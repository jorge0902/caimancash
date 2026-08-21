const DEFAULT_DEMO = {
  balance: 50000,
  currency: 'RUB',
  label: 'Cuenta Demo',
  rate: 10.3,
  methods: [
    { id: 'm1', type: 'Tarjeta bancaria', number: '•••• 4582', name: 'María Rodríguez' }
  ],
  remittances: [],
  nextId: 1
};

export const getDemo = () => {
  try {
    const raw = localStorage.getItem('caiman_demo');
    return raw ? JSON.parse(raw) : DEFAULT_DEMO;
  } catch (e) {
    return DEFAULT_DEMO;
  }
};

export const saveDemo = (data) => {
  localStorage.setItem('caiman_demo', JSON.stringify(data));
};

export const resetDemo = () => {
  localStorage.setItem('caiman_demo', JSON.stringify(DEFAULT_DEMO));
};

export const createRemittance = (data) => {
  const demo = getDemo();
  const id = demo.nextId;
  const ref = 'CC-' + Math.random().toString(16).slice(2, 8).toUpperCase();
  const remittance = {
    id,
    ref,
    amount: data.amount,
    currency: 'RUB',
    receiveAmount: Math.round(data.amount * demo.rate),
    receiveCurrency: 'CUP',
    rate: demo.rate,
    recipient: data.recipient,
    phone: data.phone,
    method: data.method,
    methodId: data.methodId,
    status: 'created',
    statusLabel: 'Remesa creada',
    createdAt: new Date().toISOString(),
    timeline: [
      { status: 'created', label: 'Remesa creada', description: 'Recibimos correctamente tu solicitud.', date: new Date().toLocaleString('es-ES') }
    ]
  };
  demo.balance -= data.amount;
  demo.remittances.unshift(remittance);
  demo.nextId = id + 1;
  saveDemo(demo);
  return remittance;
};

export const addMethod = (method) => {
  const demo = getDemo();
  demo.methods.push({ ...method, id: 'm' + Date.now() });
  saveDemo(demo);
  return demo.methods;
};
