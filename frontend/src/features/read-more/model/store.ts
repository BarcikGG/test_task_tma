import { createStore, createEvent } from 'effector'

export const readMoreToggled = createEvent()

export const $isExpanded = createStore<boolean>(false).on(readMoreToggled, (expanded) => !expanded)
