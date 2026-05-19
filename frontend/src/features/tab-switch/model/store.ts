import { createStore, createEvent } from 'effector'

export type TabId = 'holders' | 'transfers' | 'top'

export const tabChanged = createEvent<TabId>()

export const $activeTab = createStore<TabId>('holders').on(tabChanged, (_, tab) => tab)
