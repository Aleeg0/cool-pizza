// Общий matcher для всех pending действий
export const isPendingAction = (action: { type: string; }) =>
  action.type.endsWith('/pending');

// Общий matcher для всех rejected действий
export const isRejectedAction = (action: { type: string; }) =>
  action.type.endsWith('/rejected');