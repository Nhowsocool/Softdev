export interface SalesImportRecord {
  id: string;
  fileName: string;
  importedBy: string;
  importedRole: string;
  importedAt: string;
  totalRows: number;
  totalAmount: number;
}

const STORAGE_KEY = 'salesImportRecords';
const SEEDED_KEY = 'salesImportRecordsSeeded';

const SEED_IMPORT_RECORDS: SalesImportRecord[] = [
  {
    id: 'seed-001',
    fileName: 'sales-jan-2026.xlsx',
    importedBy: 'John Doe',
    importedRole: 'salesman',
    importedAt: '2026-01-05T09:15:00.000Z',
    totalRows: 148,
    totalAmount: 128450.75,
  },
  {
    id: 'seed-002',
    fileName: 'sales-feb-week1.xlsx',
    importedBy: 'Jane Smith',
    importedRole: 'salesman',
    importedAt: '2026-02-03T11:42:00.000Z',
    totalRows: 96,
    totalAmount: 84520.4,
  },
  {
    id: 'seed-003',
    fileName: 'sales-feb-week2.csv',
    importedBy: 'Alex Johnson',
    importedRole: 'salesman',
    importedAt: '2026-02-10T14:08:00.000Z',
    totalRows: 121,
    totalAmount: 109332.9,
  },
  {
    id: 'seed-004',
    fileName: 'sales-feb-week3.xlsx',
    importedBy: 'Sarah Miller',
    importedRole: 'salesman',
    importedAt: '2026-02-17T08:57:00.000Z',
    totalRows: 134,
    totalAmount: 117906.2,
  },
];

export const ensureSalesImportSeedData = () => {
  try {
    const isSeeded = localStorage.getItem(SEEDED_KEY) === 'true';
    const existing = localStorage.getItem(STORAGE_KEY);
    if (isSeeded || existing) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_IMPORT_RECORDS));
    localStorage.setItem(SEEDED_KEY, 'true');
  } catch {
    // no-op
  }
};

export const getSalesImportRecords = (): SalesImportRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SalesImportRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveSalesImportRecord = (record: SalesImportRecord) => {
  const existing = getSalesImportRecords();
  const next = [record, ...existing].slice(0, 200);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};
