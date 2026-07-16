import { useLanguage } from '../context/LanguageContext';

export const useMockData = () => {
  const { t } = useLanguage();

  const allProducts = [
    // --- Diapers ---
    { id: 1, mainCategory: 'diaper', type: 'tape', category: t('filter_tape'), title: t('dp_1_title'), rating: 5, summary: t('dp_1_sum'), imageColor: '#ffb8c5' },
    { id: 2, mainCategory: 'diaper', type: 'pants', category: t('filter_pants'), title: t('dp_2_title'), rating: 4, summary: t('dp_2_sum'), imageColor: '#a4d3e2' },
    { id: 3, mainCategory: 'diaper', type: 'tape', category: t('filter_tape'), title: t('dp_3_title'), rating: 5, summary: t('dp_3_sum'), imageColor: '#fde4a9' },
    { id: 4, mainCategory: 'diaper', type: 'pants', category: t('filter_pants'), title: t('dp_4_title'), rating: 4, summary: t('dp_4_sum'), imageColor: '#e2e8f0' },
    
    // --- Milk ---
    { id: 5, mainCategory: 'milk', type: 'stage1', category: t('filter_stage1'), title: t('mk_5_title'), rating: 5, summary: t('mk_5_sum'), imageColor: '#fca5a5' },
    { id: 6, mainCategory: 'milk', type: 'stage2', category: t('filter_stage2'), title: t('mk_6_title'), rating: 5, summary: t('mk_6_sum'), imageColor: '#93c5fd' },
    { id: 7, mainCategory: 'milk', type: 'stage1', category: t('filter_stage1'), title: t('mk_7_title'), rating: 4, summary: t('mk_7_sum'), imageColor: '#86efac' },
    { id: 8, mainCategory: 'milk', type: 'stage3', category: t('filter_stage3'), title: t('mk_8_title'), rating: 5, summary: t('mk_8_sum'), imageColor: '#d8b4fe' },
    
    // --- Toys ---
    { id: 9, mainCategory: 'toy', type: 'newborn', category: t('filter_newborn'), title: t('ty_9_title'), rating: 5, summary: t('ty_9_sum'), imageColor: '#fcd34d' },
    { id: 10, mainCategory: 'toy', type: 'motor', category: t('filter_motor'), title: t('ty_10_title'), rating: 4, summary: t('ty_10_sum'), imageColor: '#34d399' },
    { id: 11, mainCategory: 'toy', type: 'puzzle', category: t('filter_puzzle'), title: t('ty_11_title'), rating: 5, summary: t('ty_11_sum'), imageColor: '#60a5fa' },
    { id: 12, mainCategory: 'toy', type: 'puzzle', category: t('filter_puzzle'), title: t('ty_12_title'), rating: 5, summary: t('ty_12_sum'), imageColor: '#f472b6' }
  ];

  const diapersList = allProducts.filter(p => p.mainCategory === 'diaper');
  const milkList = allProducts.filter(p => p.mainCategory === 'milk');
  const toysList = allProducts.filter(p => p.mainCategory === 'toy');

  return { allProducts, diapersList, milkList, toysList };
};
