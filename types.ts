

export type CategoryType = 'sightseeing' | 'transport' | 'flight' | 'food' | 'shopping' | 'accommodation';
export type WeatherType = 'sunny' | 'cloudy' | 'rainy';
export type UtilityTabType = 'currency' | 'packing' | 'translator' | 'emergency' | 'offline' | 'notes'; 
export type ExpenseCategoryType = 'food' | 'ticket' | 'shopping' | 'transport' | 'accommodation' | 'other';

export interface User {
    name: string;
    pass: string;
}

export interface ItineraryItem {
    id: string | number;
    date: string;
    time: string;
    title: string;
    location: string;
    category: CategoryType;
    note: string;
    images?: string[];
    transport?: string;
    duration?: string;
    aiContent?: string;
    rating?: number;
    openTime?: string;
    hasAiGuide?: boolean; // New field to toggle AI feature
}

export interface Expense {
    id: string | number;
    item: string;
    amount: number;
    currency: 'VND' | 'TWD' | 'USD';
    category: ExpenseCategoryType;
    payer: string; // Name of the person who paid
    beneficiaries: string[]; // List of names sharing the bill
    date: string; // ISO string
}

export interface DayInfo {
    date: string;
    week: string;
    day: string;
    weather: WeatherType;
    temp: number;
}

export interface BackupSpot {
    id: string | number;
    title: string;
    category: CategoryType;
    note: string;
    location: string;
    images?: string[];
    aiContent?: string;
    // New fields for food details
    priceLevel?: string; 
    subType?: string; 
    rating?: number;
    openTime?: string;
    hasAiGuide?: boolean; // New field
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface PackingItem {
    id: string | number;
    category: string;
    text: string;
    checked: boolean;
}

export interface Phrase {
    id: number;
    vi: string;
    pronunciation: string;
    zh: string;
}

export interface Note {
    id: string | number;
    date: string;
    content: string;
    timestamp: number;
    userId?: string; // To link to specific user
}

export interface TranslationResult {
    original: string;
    zh: string;
    vi: string;
    en: string;
}

export interface EmergencyContact {
    title: string;
    phone: string;
    address?: string;
    note?: string;
}