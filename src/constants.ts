import { Jurusan } from './types';

export const DEPARTMENTS: { id: Jurusan; name: string; description: string }[] = [
  { id: 'TKJ', name: 'Teknik Komputer & Jaringan', description: 'Mempelajari instalasi jaringan, server, dan troubleshooting komputer.' },
  { id: 'DKV', name: 'Desain Komunikasi Visual', description: 'Fokus pada desain grafis, ilustrasi, fotografi, dan multimedia.' },
  { id: 'AK', name: 'Akuntansi', description: 'Mempelajari siklus akuntansi, perpajakan, dan pengelolaan keuangan.' },
  { id: 'BC', name: 'Broadcasting', description: 'Mempelajari produksi TV, radio, dan konten digital.' },
  { id: 'MPLB', name: 'Manajemen Perkantoran & Layanan Bisnis', description: 'Fokus pada administrasi perkantoran dan manajemen bisnis.' },
  { id: 'BD', name: 'Bisnis Digital', description: 'Mempelajari pemasaran online, e-commerce, dan kewirausahaan digital.' }
];

export const OFFICE_LOCATION = "Tangerang Selatan";
export const KKM_SCORE = 50;
