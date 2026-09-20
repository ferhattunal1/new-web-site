/**
 * litef Admin Storage & Persistence Katmanı
 * Tüm modüllerin ve vitrinin senkronize, kalıcı çalışmasını sağlar.
 */

import { Product } from '@/types/database';
import { INITIAL_PRODUCTS } from '@/lib/store-data';

export const ADMIN_STORAGE_KEYS = {
  MENUS: 'litef_admin_menus',
  LANDING_PAGES: 'litef_admin_landing_pages',
  LAYOUT: 'litef_admin_layout',
  MODULES: 'litef_admin_modules',
  CATEGORIES: 'litef_admin_categories',
  QUOTES: 'litef_admin_quotes',
  PRICES: 'litef_admin_prices',
  FAQS: 'litef_admin_faqs',
  FILES: 'litef_admin_files',
  USERS: 'litef_admin_users',
  SETTINGS: 'litef_admin_settings',
  PRODUCTS: 'litef_admin_products',
  LAST_SAVED: 'litef_admin_last_saved',
} as const;

export interface SiteSettings {
  siteTitle: string;
  slogan: string;
  bannerText: string;
  couponCode: string;
  freeShippingLimit: number;
  contactEmail: string;
  supportPhone: string;
  maintenanceMode: boolean;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: 'litef | Yeni Nesil Teknoloji & Yaşam',
  slogan: 'Yeni Nesil Teknoloji & Yaşam',
  bannerText: 'litef Lansmanı: LITEF15 kodu ile sepette ekstra %15 indirim & Ücretsiz Hızlı Kargo!',
  couponCode: 'LITEF15',
  freeShippingLimit: 500,
  contactEmail: 'admin@litef.com',
  supportPhone: '0850 300 5833',
  maintenanceMode: false,
};

/**
 * LocalStorage'dan veri yükler (SSR güvenli)
 */
export function loadAdminData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[admin-storage] Error loading key "${key}":`, err);
    return defaultValue;
  }
}

/**
 * LocalStorage'a veri kaydeder ve son kayıt zamanını günceller
 */
export function saveAdminData<T>(key: string, data: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(ADMIN_STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
    return true;
  } catch (err) {
    console.error(`[admin-storage] Error saving key "${key}":`, err);
    return false;
  }
}

/**
 * Son kayıt zamanını getirir
 */
export function getLastSavedTime(): string {
  if (typeof window === 'undefined') return 'Kayıtlı';
  const last = localStorage.getItem(ADMIN_STORAGE_KEYS.LAST_SAVED);
  if (!last) return 'Kayıtlı';
  try {
    const date = new Date(last);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch {
    return 'Kayıtlı';
  }
}

/**
 * Tüm admin panel verilerini JSON formatında dışa aktarır (Yedek Al)
 */
export function exportAllAdminData(): string {
  if (typeof window === 'undefined') return '{}';
  const dump: Record<string, unknown> = {};
  Object.values(ADMIN_STORAGE_KEYS).forEach((key) => {
    const val = localStorage.getItem(key);
    if (val) {
      try {
        dump[key] = JSON.parse(val);
      } catch {
        dump[key] = val;
      }
    }
  });
  return JSON.stringify(dump, null, 2);
}

/**
 * JSON formatındaki yedeği içeri aktarır (Geri Yükle)
 */
export function importAdminData(jsonStr: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const dump = JSON.parse(jsonStr) as Record<string, unknown>;
    Object.entries(dump).forEach(([key, val]) => {
      localStorage.setItem(key, JSON.stringify(val));
    });
    localStorage.setItem(ADMIN_STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
    return true;
  } catch (err) {
    console.error('[admin-storage] Import error:', err);
    return false;
  }
}
